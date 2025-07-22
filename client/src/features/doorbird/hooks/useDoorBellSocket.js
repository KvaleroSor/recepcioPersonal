import { useState, useEffect } from "react";


const WEBSOCKET__URL = "ws://localhost:3001";

export const useDoorBellSocket = () => {
    const [isRinging, setIsRinging] = useState(false);

    useEffect(() => {
        const ws = new WebSocket(WEBSOCKET__URL);

        ws.onopen = () => {
            console.log(`Conectado al servidor de notificaciones ✅`);
        };

        ws.onmessage = (event) => {            
            try {
                const message = JSON.parse(event.data);

                if (message.type === "doorbell") {
                    console.log("Notifiación del timbre recibida! 🚀🎆");
                    setIsRinging(true);
                }
            } catch (error) {
                console.log(
                    `ERROR - En el procesado del mensaje ❌ | ERROR - ${error}`
                );
            }
        };
        
        ws.onerror = (error) => {
            console.log(`ERROR - En el websocket | ERROR - ${error}`);
        };

        ws.onclose = () => {
            console.log("Desconectado del servidor de notificaciones ❌");        };

        return () => {
            ws.close();
        };
    }, []);

    return { isRinging, setIsRinging };
};
