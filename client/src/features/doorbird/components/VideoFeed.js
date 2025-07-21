import React, { useState } from "react";
import { useDoorBird } from "../hooks/useDoorBird";
import "./../../../styles/App.scss";

const VideoFeed = () => {
    const obj_ImageUrl = useDoorBird();
    const [imageLoadError, setImageLoadError] = useState(false);
    const liveImageURL = obj_ImageUrl.liveImageURL;
    const hookError = obj_ImageUrl.hookError;

    // Mostramos el placeholder si no hay URL o si la imagen falló al cargar.
    const showPlaceholder = !liveImageURL || imageLoadError;

    const handleImageError = () => {
        setImageLoadError(true);
    }

    return (
        <div className="doorbird-video-container">
            {showPlaceholder ? (
                <div className="video-placeholder">
                    <p>
                        {imageLoadError
                            ? "No se puede conectar con el vídeo."
                            : "Configurando la conexión... Hola RAFA!"}
                    </p>
                </div>
            ) : (
                <img
                    src={liveImageURL}
                    alt="Live feed from DoorBird"
                    className="doorbird-video-feed"
                    onError={handleImageError} 
                    referrerPolicy="no-referrer"
                />
            )}
            {hookError && <p className="error-message">{hookError}</p>}
        </div>
    );
};

export default VideoFeed;
