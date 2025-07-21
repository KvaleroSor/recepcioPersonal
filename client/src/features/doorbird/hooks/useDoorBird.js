import { useState, useCallback } from "react";
// Importamos las funciones que hablan con nuestro servidor
import {
    openDoor,
    turnLightOn,
    getLiveImageURL,
} from "../services/doorBirdApi";

/**
 * Hook para manejar las acciones del usuario con el DoorBird (abrir puerta, etc.)
 * y el estado de carga/error asociado.
 */
export const useDoorBird = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lastBellEvent, setLastBellEvent] = useState(null);

    // Obtenemos la URL del vídeo directamente. No necesita estado.
    const liveImageUrl = getLiveImageURL(); 

    // Una función genérica para manejar cualquier llamada a la API.
    const handleApiCall = useCallback(async (apiFunction) => {
        setIsLoading(true);
        setError(null);
        try {
            const success = await apiFunction();
            setIsLoading(false);
            return success;
        } catch (err) {
            setError(err.message || "Ocurrió un error desconocido.");
            setIsLoading(false);
            return false;
        }
    }, []);

    // Creamos funciones específicas para cada acción.
    const handleOpenDoor = useCallback((releayNumber) => {
        return handleApiCall(() => openDoor(releayNumber));
    }, [handleApiCall]);

    const handleTurnLightOn = useCallback(() => {
        return handleApiCall(turnLightOn);
    }, [handleApiCall]);

    return {
        isLoading,
        error,
        liveImageURL: liveImageUrl,
        openDoor: handleOpenDoor,
        turnLightOn: handleTurnLightOn,
    };
};
