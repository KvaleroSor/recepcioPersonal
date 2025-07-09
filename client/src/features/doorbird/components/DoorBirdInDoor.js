import React, { useEffect } from "react";
import { useDoorBird } from "../hooks/useDoorBird";
import { useDoorBellSocket } from "../hooks/useDoorBellSocket";
import { ReactComponent as IconPuerta } from "./../../../icons/iconPuerta.svg";
import "./../../../styles/App.scss";

const DoorBirdInDoor = () => {
    // 1. Hook para las ACCIONES (abrir, luz, vídeo)
    // const { isLoading, error, liveImageUrl, openDoor, turnLightOn } =
    //     useDoorBird();
    const { isLoading, openDoor } =
        useDoorBird();
    const releayNumber = 2;

    // 2. Hook para las REACCIONES (escuchar el timbre)
    const { isRinging, setIsRinging } = useDoorBellSocket();

    // 3. Efecto para que el botón deje de parpadear solo
    useEffect(() => {
        if (isRinging) {
            // Si el timbre suena, esperamos 8 segundos y lo apagamos.

            /**
             * ANOTACIÓN DE FUNCIONAMIENTO 📝
             * 
             * En caso de querer hacer que el timbre "suene" de forma 
             * ficticia, descomentar el timer, y el return que ejecuta
             * la función de tipo flecha y limpia el timer.
             */

            const timer = setTimeout(() => {
                setIsRinging(false);
            }, 500); // El efecto durará 18 segundos
            // setIsRinging(false);

            // Importante: limpiar el temporizador si el componente se desmonta
            return () => clearTimeout(timer);
        }
    }, [isRinging, setIsRinging]);

    return (
        <button
            className={`btn  ${isRinging ? "is-ringing" : ""}`}
            onClick={() => openDoor(releayNumber)}
            disabled={isLoading}
        >
            {/* <div className="container-elements_buttons doorbell-button"> */}
            <div className="container-elements_buttons">
                <p>ABRIR PUERTA INTERIOR</p>
                <div className="container-elements_img">                    
                    <IconPuerta className="iconsForm iconsForm_buttons" />
                </div>
            </div>
        </button>

    );
};

export default DoorBirdInDoor;
