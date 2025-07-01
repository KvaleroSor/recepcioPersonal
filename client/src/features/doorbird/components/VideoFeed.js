import React, { useState } from "react";
import { useDoorBird } from "../hooks/useDoorBird";
import "./../../../styles/App.scss";

const VideoFeed = () => {
    const { liveImageURL, error: hookError } = useDoorBird();
    const [imageLoadError, setImageLoadError] = useState(false);

    // Mostramos el placeholder si no hay URL o si la imagen falló al cargar.
    const showPlaceholder = !liveImageURL || imageLoadError;

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
                    onError={() => setImageLoadError(true)} 
                />
            )}
            {hookError && <p className="error-message">{hookError}</p>}
        </div>
    );
};

export default VideoFeed;
