import React, { useState } from "react";
import { useDoorBird } from "../hooks/useDoorBird";
import "./../../../styles/App.scss";
// import { getLiveImageURL } from '../services/doorBirdApi';

const VideoFeed = () => {
    // const { liveImageURL, error: hookError } = useDoorBird();
    const obj_ImageUrl = useDoorBird();
    const [imageLoadError, setImageLoadError] = useState(false);
    const liveImageURL = obj_ImageUrl.liveImageURL;
    const hookError = obj_ImageUrl.hookError;

    // Mostramos el placeholder si no hay URL o si la imagen falló al cargar.
    const showPlaceholder = !liveImageURL || imageLoadError;
    // console.log(`URL --> ${liveImageURL}`);
    console.log(liveImageURL);
    console.log(imageLoadError);

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
                    referrerPolicy="no-referrer"
                />
            )}
            {hookError && <p className="error-message">{hookError}</p>}
        </div>
    );
};

export default VideoFeed;
