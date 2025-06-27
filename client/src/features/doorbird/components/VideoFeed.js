import React from "react";
import { useDoorBird } from "../hooks/useDoorBird";

const VideoFeed = () => {
    const { liveImageURL, error } = useDoorBird();

    return (
        <div className="doorbird-viedo-container">
            {liveImageURL ? (
                <img
                    src={liveImageURL}
                    alt="Live feed from DoorBird"
                    className="doorbird-video-feed"
                />
            ) : (
                <div className="video-placeholder">
                    <p>Configurando la conexión de vídeo...</p>
                    <p>Cargando el video...</p>
                </div>
            )}
            {error && <p className="error-message">Error: {error}</p>}
        </div>
    );
};

export default VideoFeed;
