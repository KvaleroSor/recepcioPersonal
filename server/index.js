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
require("dotenv").config();

/**
 * 2️⃣
*
* Importamos las dependencias ↕️
*/
const http = require('http');
const { WebSocketServer } = require('ws');
const express = require("express");
const cors = require("cors");
const DoorBird = require("doorbird");

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
let doorbird;

doorbird = new DoorBird({
    scheme: DoorBird.Scheme.http, // or https
    ip: process.env.IP,
    username: process.env.USER,
    password: process.env.PASSWORD,
});

// if (IS_MOCK_MODE) {
//     console.log("*** MODO SIMULACIÓN ACTIVADO ***");
//     console.log("*** No se intentará conectar al DoorBird real. ***");
//     // Objeto simulado que imita las respuestas del DoorBird
//     doorbird = {
//         getInfo: () => Promise.resolve({ FIRMWARE: "mock-firmware-v1.0" }),
//         openDoor: () => Promise.resolve({ success: true }),
//         turnLightOn: () => Promise.resolve({ success: true }),
//     };
// } else {
//     doorbird = new DoorBird({
//         scheme: DoorBird.Scheme.http, // or https
//         ip: process.env.IP,
//         username: process.env.USER,
//         password: process.env.PASSWORD,
//     });
// }

/**
 * 5️⃣
 *
 * Definir las rutas de la API 📚
 */
app.get("/", (req, res) => {
    res.send("¡El servidor del DoorBird está vivo!");
});

app.post("/api/open-door", async (req, res) => {
    try {
        await doorbird.openDoor();
        console.log("Puerta abierta desde el servidor ✅");
        res.status(200).json({
            success: true,
            message: "Puerta abierta con éxito",
        });
    } catch (error) {
        console.error("Error al abrir la puerta:", error);
        res.status(500).json({
            success: false,
            message: "Error en el servidor al abrir la puerta",
        });
    }
});

/**
 * 5️⃣
 *
 * Definir ruta para la luz 🔦
 */
app.post("/api/light-on", async (req, res) => {
    try {
        await doorbird.turnLightOn();
        console.log("Luz encendida desde el servidor ✅");
        res.status(200).json({
            success: true,
            message: "Luz encendida con éxito",
        });
    } catch (error) {
        console.log(`Error al encender la luz: ` + error);
        res.status(500).json({
            success: false,
            message: "Error en el servidor al abrir la puerta",
        });
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

if (IS_MOCK_MODE) {
    console.log('Activando simulador de timbre cada 15 segundos...');
    setInterval(() => {
        broadcast({ type: 'doorbell' });
    }, 15000); // Cada 15 segundos, simula una llamada
} else {
    // Escuchar el evento real del timbre
    doorbird.watch('doorbell', (event) => {
        if (event.live) { // Solo notificar cuando realmente se pulsa
            console.log('¡Timbre pulsado! Notificando a los clientes...');
            broadcast({ type: 'doorbell', timestamp: event.timestamp });
        }
    });
    console.log('Escuchando eventos de timbre del DoorBird real...');
}

/**
 *
 *
 * Iniciar el servidor 🚀
 */

server.listen(PORT, () => {
    console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    // Verificamos la conexión inicial con el DoorBird
    doorbird
        .getInfo()
        .then((info) => {
            console.log("Conectado a DoorBird:", info.FIRMWARE);
        })
        .catch((err) => {
            console.error(
                "Error al conectar con DoorBird. Revisa las credenciales y la IP en el archivo .env"
            );
        });
});
