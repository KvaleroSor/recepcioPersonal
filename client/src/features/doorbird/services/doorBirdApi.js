const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const API_SERVER_URL = `${API_BASE_URL}/api`;

/**
 * ============================ FUNCIONES DE LA API ================================
 *
 * Devuelve la URL para obtener la imagen en vivo del DoorBird 📹🚀
 *
 * NOTA: Esta función sigue apuntando directamente al DoorBird por eficiencia.
 * La seguridad de las credenciales se mantiene porque solo se exponen en la red local.
 */

export const getLiveImageURL = () => {
    // ✅ SOLUCIÓN DEFINITIVA: Apuntamos a nuestro propio servidor, que actúa como proxy.
    // Esto soluciona el error 401 y es mucho más seguro.
    return `${API_BASE_URL}/api/video`;
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
