/**
 * =====================================================================================
 *  Guía para conectar con el doorbird real (en la empresa)
 * =====================================================================================
 *
 * Para que este servidor deje de simular las respuestas y se conecte al DoorBird físico,
 * sigue estos pasos:
 *
 * 1. Abre el archivo `.env` que se encuentra en la raíz de la carpeta `server`.
 *
 * 2. Modifica la variable `MODE_ENV`:
 *    - Cambia `MODE_ENV=development` por `MODE_ENV=production`.
 *
 * 3. Asegúrate de que las credenciales del DoorBird son correctas:
 *    - `IP`: La dirección IP del dispositivo DoorBird en la red de la empresa.
 *    - `USER`: El nombre de usuario para acceder al DoorBird.
 *    - `PASSWORD`: La contraseña del usuario.
 *
 * 4. Guarda los cambios en el archivo `.env`.
 *
 * 5. Reinicia el servidor (detén el proceso actual con `Ctrl+C` y vuelve a ejecutar `node index.js`).
 *
 * ¡Y listo! El servidor intentará conectarse al DoorBird real. 🚀
 * =====================================================================================
 */

/**
 * 1️⃣
 *
 * Cargar variables de entorno 📋
 */
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

console.log("--- DEBUGGING DOORBIRD MODULE ---");
console.log(require("doorbird"));
console.log("---------------------------------");

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
const dgram = require("dgram");

/**
 * 3️⃣
 *
 * Configuración inicial 🎬
 */
const app = express();
const PORT = process.env.PORT;
const IS_MOCK_MODE = process.env.MODE_ENV !== "production";

/**
 * Middlewares
 */

app.use(cors());
app.use(express.json());

/**
 * 4️⃣
 *
 * Conexión con DoorBird 🐣
 */
// Ya no usamos la librería 'doorbird', la comunicación será manual.

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
 * Inicialización del servidor 🚀
 */

server.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);

    // MODO SIMULACIÓN
    if (IS_MOCK_MODE) {
        // MODO SIMULACIÓN: Iniciar el envío de eventos falsos
        console.log("Activando simulador de timbre cada 15 segundos...");
        setInterval(() => {
            broadcast({ type: "doorbell" });
        }, 15000);
    } else {
        // MODO PRODUCCIÓN: Conectar y escuchar eventos reales
        console.log("Verificando conexión con DoorBird...");

        axios.get(getApiUrl("info.cgi"), { headers: getAuth() })
            .then(response => {
                const firmware = response.data?.BHA?.VERSION?.[0]?.FIRMWARE || "desconocido";
                console.log(`✅ Conexión con DoorBird exitosa (Firmware: ${firmware}).`);

                // Ahora, iniciamos el escuchador de eventos UDP
                const udpServer = dgram.createSocket('udp4');
                const DOORBIRD_UDP_PORT = 6524;

                udpServer.on('error', (err) => {
                    console.error(`Error en el escuchador UDP: ${err.stack}`);
                    udpServer.close();
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

                udpServer.on('listening', () => {
                    const address = udpServer.address();
                    console.log(`✅ Escuchador de eventos UDP listo en el puerto ${address.port}.`);
                });

                udpServer.bind(DOORBIRD_UDP_PORT);

            })
            .catch(err => {
                console.error("❌ FALLO LA CONEXIÓN INICIAL CON DOORBIRD.");
                if (err.response) {
                    console.error(`El DoorBird respondió con un error: ${err.response.status} ${err.response.statusText}`);
                } else {
                    console.error("No se pudo conectar. Revisa la IP, la red y las credenciales en .env. Error:", err.message);
                }
            });
    }
});
