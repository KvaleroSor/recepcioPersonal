import { useState, useEffect } from "react";


const WEBSOCKET__URL = "ws://localhost:3001";

export const useDoorBellSocket = (url = WEBSOCKET__URL) => {
    const [isRinging, setIsRinging] = useState(false);
    const ws = useRef(null);

    useEffect(() => {
        ws.current = new WebSocket(url);

        ws.current.onopen = () => {
            console.log(`Conectado al servidor de notificaciones ✅`);
        };

        ws.current.onmessage = (event) => {            
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
        
        ws.current.onerror = (error) => {
            console.log(`ERROR - En el websocket | ERROR - ${error}`);
        };

        ws.current.onclose = () => {
            console.log("Desconectado del servidor de notificaciones ❌");        };

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, [url]);

    return { isRinging, setIsRinging };
};
