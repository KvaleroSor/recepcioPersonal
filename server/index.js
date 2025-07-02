// ===================================================================================
// IMPORTACIONES Y CONFIGURACIÓN INICIAL
// ===================================================================================

/**
 * 1️⃣
 *
 * Cargamos las variables de entorno desde el archivo .env
 */
require("dotenv").config();

/**
 * 2️⃣
 *
 * Importamos las dependencias ↕️
 */
const http = require("http");
const { WebSocketServer } = require("ws");
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const dgram = require('dgram'); // Para escuchar eventos UDP

/**
 * 3️⃣
 *
 * Creamos la aplicación Express y configuramos los middlewares
 */
const app = express();
app.use(cors()); // Habilitamos CORS para todas las rutas
app.use(express.json()); // Para parsear bodies de peticiones como JSON

/**
 * 4️⃣
 *
 * Definimos constantes y variables globales
 */
const PORT = process.env.PORT || 3001;
const IS_MOCK_MODE = process.env.NODE_ENV === "development"; // Modo simulación

// Imprimimos las variables de entorno para depuración
console.log("MODO DE EJECUCIÓN:", IS_MOCK_MODE ? "Simulación (Development)" : "Producción");
console.log("=================================");
console.log("VARIABLES DE ENTORNO");
console.log("=================================");
console.log(`IP --> ${process.env.DOORBIRD_IP}`);
console.log(`USER --> ${process.env.DOORBIRD_USER}`);
console.log(`PASSWORD --> ${process.env.DOORBIRD_PASSWORD}`);
console.log("=================================");

/**
 * 5️⃣
 *
 * Rutas de la API ⚙️
 */

// --- FUNCIÓN HELPER PARA LA AUTENTICACIÓN ---
const getAuth = () => {
    const user = process.env.DOORBIRD_USER;
    const password = process.env.DOORBIRD_PASSWORD;
    const authString = Buffer.from(`${user}:${password}`).toString("base64");
    return { Authorization: `Basic ${authString}` };
};

// --- FUNCIÓN HELPER PARA LAS URLS DE LA API ---
const getApiUrl = (endpoint) => {
    const ip = process.env.DOORBIRD_IP;
    return `http://${ip}/bha-api/${endpoint}`;
};

// Ruta de prueba para verificar que el servidor está vivo
app.get("/", (req, res) => {
    res.send("✅ El servidor para DoorBird está funcionando correctamente.");
});

// Ruta para abrir la puerta
app.post("/api/open-door", async (req, res) => {
    if (IS_MOCK_MODE) {
        console.log("Simulando apertura de puerta.");
        return res.json({ success: true, message: "Puerta abierta (simulado)." });
    }
    try {
        await axios.get(getApiUrl("open-door.cgi?r=1"), { headers: getAuth() });
        res.json({ success: true, message: "Petición para abrir la puerta enviada." });
    } catch (error) {
        console.error("Error al abrir la puerta:", error.message);
        res.status(500).json({ success: false, message: "Error del servidor al abrir puerta." });
    }
});

// Ruta para encender la luz
app.post("/api/light-on", async (req, res) => {
    if (IS_MOCK_MODE) {
        console.log("Simulando encendido de luz.");
        return res.json({ success: true, message: "Luz encendida (simulado)." });
    }
    try {
        await axios.get(getApiUrl("light-on.cgi"), { headers: getAuth() });
        res.json({ success: true, message: "Petición para encender la luz enviada." });
    } catch (error) {
        console.error("Error al encender la luz:", error.message);
        res.status(500).json({ success: false, message: "Error del servidor al encender la luz." });
    }
});

// ===================================================================================
// RUTA PARA HACER PROXY DEL VÍDEO Y EVITAR PROBLEMAS DE CORS/AUTH
// ===================================================================================
app.get('/api/video', async (req, res) => {
    // ✅ URL limpia, sin credenciales. La autenticación va en los headers.
    const videoUrl = `http://${process.env.DOORBIRD_IP}/bha-api/video.cgi`;

    try {
        console.log(`[Proxy de Vídeo] Pidiendo vídeo desde: ${videoUrl}`);

        // Hacemos la petición al DoorBird usando el header de autenticación
        const response = await axios({
            method: 'get',
            url: videoUrl,
            responseType: 'stream',
            headers: getAuth() // Autenticación profesional
        });

        // Pasamos las cabeceras originales (importante para el content-type de la imagen)
        res.setHeader('Content-Type', response.headers['content-type']);

        // Hacemos "pipe" del stream de vídeo del DoorBird directamente a la respuesta del cliente.
        // Esto es muy eficiente y no carga el vídeo en la memoria del servidor.
        response.data.pipe(res);

    } catch (error) {
        console.error('[Proxy de Vídeo] Error al obtener el stream del DoorBird:', error.message);
        if (error.response) {
            console.error('Respuesta de DoorBird:', error.response.status, error.response.statusText);
            res.status(error.response.status).send(error.response.statusText);
        } else {
            res.status(500).json({ success: false, message: 'No se pudo conectar con el stream de vídeo del DoorBird.' });
        }
    }
});

/**
 * 6️⃣
 *
 * Crear el servidor HTTP y websocket
 */

const server = http.createServer(app);
const wss = new WebSocketServer({ server });

/**
 * 7️⃣
 *
 * Configurar notificaciones en tiempo real (WebSockets)
 */

const broadcast = (data) => {
    const message = JSON.stringify(data);
    console.log("Transmitiendo a los clientes:", message);
    wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
            client.send(message);
        }
    });
};

wss.on("connection", (ws) => {
    console.log("Cliente WebSocket conectado ✅");
    ws.on("close", () => {
        console.log("Cliente WebSocket desconectado ❌");
    });
});

/**
 * 8️⃣
 *
 * Escuchar eventos del DoorBird (Timbre)
 */

if (IS_MOCK_MODE) {
    // En modo simulación, enviamos un evento de timbre cada 20 segundos
    console.log("Modo simulación: Se enviará un evento de timbre cada 20 segundos.");
    setInterval(() => {
        console.log("Simulando evento de timbre...");
        broadcast({ type: "doorbell" });
    }, 20000);
} else {
    // En modo producción, escuchamos los eventos UDP reales del DoorBird
    const udpServer = dgram.createSocket('udp4');

    udpServer.on('error', (err) => {
        console.error(`Error en el servidor UDP:\n${err.stack}`);
        udpServer.close();
    });

    udpServer.on('listening', () => {
        const address = udpServer.address();
        console.log(`Servidor UDP escuchando en ${address.address}:${address.port} 📡`);
    });

    udpServer.on('message', (msg) => {
        // El DoorBird envía el nombre del evento que se ha activado
        const eventName = msg.toString('utf8');
        console.log(`Evento UDP recibido: ${eventName}`);

        // El evento real contiene el nombre de usuario. ¡Usémoslo para detectar!
        const doorbirdUser = process.env.DOORBIRD_USER;
        if (eventName.includes(doorbirdUser)) {
            console.log('¡Timbre detectado! Notificando a los clientes...');
            broadcast({ type: 'doorbell' });
        }
    });

    // El DoorBird envía eventos al puerto 6524 por defecto
    udpServer.bind(6524);
}

/**
 * 9️⃣
 *
 * Iniciar el servidor
 */
server.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
