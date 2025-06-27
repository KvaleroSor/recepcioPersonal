import React, { useEffect } from "react";
import { useDoorBird } from "../hooks/useDoorBird";
import { useDoorBellSocket as useDoorBellSocket } from "../hooks/useDoorBellSocket"; // El hook para notificaciones
import { ReactComponent as IconCampana } from "./../../../icons/iconCampana.svg";
import { ReactComponent as IconPuerta } from "./../../../icons/iconPuerta.svg";
import "./../../../styles/App.scss"; // Un archivo de estilos que crearemos ahora

const DoorBirdView = () => {
    // 1. Hook para las ACCIONES (abrir, luz, vídeo)
    const { isLoading, error, liveImageUrl, openDoor, turnLightOn } =
        useDoorBird();

    // 2. Hook para las REACCIONES (escuchar el timbre)
    const { isRinging, setIsRinging } = useDoorBellSocket();

    // 3. Efecto para que el botón deje de parpadear solo
    useEffect(() => {
        if (isRinging) {
            // Si el timbre suena, esperamos 8 segundos y lo apagamos.
            const timer = setTimeout(() => {
                setIsRinging(false);
            }, 8000); // El efecto durará 8 segundos

            // Importante: limpiar el temporizador si el componente se desmonta
            return () => clearTimeout(timer);
        }
    }, [isRinging, setIsRinging]);

    return (
        <div className="doorbird-controls">
            <button
                className={`btn  ${isRinging ? "is-ringing" : ""}`}
                onClick={openDoor}
                disabled={isLoading}
            >
                <div className="container-elements_buttons">
                    <p className="text container-elements_buttons">
                        {isLoading ? "ABRIENDO..." : "ABRIR PUERTA"}
                    </p>
                    <div className="container-elements_img">
                        <IconCampana className="iconsForm iconsForm_buttons" />
                        <IconPuerta className="iconsForm iconsForm_buttons" />
                    </div>
                </div>
            </button>
        </div>
    );
};

export default DoorBirdView;
