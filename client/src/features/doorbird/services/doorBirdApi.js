const IP = process.env.REACT_APP_DOORBIRD_IP;
const USER = process.env.REACT_APP_DOORBIRD_USER;
const PASSWORD = process.env.REACT_APP_DOORBIRD_PASSWORD;
const API_SERVER_URL = `http://localhost:3001/api`;

/**
 * ============================ FUNCIONES DE LA API ================================
 *
 *
 * Devuelve la URL para obtener la imagen en vivo del DoorBird 📹🚀
 *
 * NOTA: Esta función sigue apuntando directamente al DoorBird por eficiencia.
 * La seguridad de las credenciales se mantiene porque solo se exponen en la red local.
 */

export const getLiveImageURL = () => {
    if (!IP || !USER || !PASSWORD) {
        console.log(
            `Problemas con las variables de entorno definidas en el cliente ❌`
        );
        return null;
    }

    const API_BASE_URL = `http://${IP}/bha-api`;
    return `${API_BASE_URL}/video.cgi?user=${encodeURIComponent(
        USER
    )}&password=${encodeURIComponent(PASSWORD)}`;
};

/**
 * Envía la petición a NUESTRO SERVIDOR para activar el relé y abrir la puerta 🚪
 */

export const openDoor = async () => {
    try {
        const response = await fetch(`${API_SERVER_URL}/open-door`, {
            method: "POST",
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.message ||
                    `Error al abrir la puerta: ${response.statusText}`
            );
        }
        const result = await response.json();
        console.log("Respuesta del servidor (openDoor):", result.message);
        return result.success;
    } catch (error) {
        console.error(
            "Fallo al contactar el servidor para abrir la puerta:",
            error
        );
        throw error;
    }
};

/**
 * Envía la petición a NUESTRO SERVIDOR para encender la luz.
 */
export const turnLightOn = async () => {
    try {
        const response = await fetch(`${API_SERVER_URL}/light-on`, {
            method: "POST",
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                errorData.message ||
                    `Error al encender la luz: ${response.statusText}`
            );
        }
        const result = await response.json();
        console.log("Respuesta del servidor (turnLightOn):", result.message);
        return result.success;
    } catch (error) {
        console.error(
            "Fallo al contactar el servidor para encender la luz:",
            error
        );
        throw error;
    }
};
