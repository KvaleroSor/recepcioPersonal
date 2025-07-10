import React from "react";
import { useDoorBird } from "../hooks/useDoorBird";
import { useDoorBellSocket } from "../hooks/useDoorBellSocket";
import { ReactComponent as IconPuertaExt } from "./../../../icons/iconPuertaExt.svg";
import "./../../../styles/App.scss";

const DoorBirdOutDoor = () => {
    // 1. Hook para las ACCIONES (abrir, luz, vídeo)
    // const { isLoading, error, liveImageUrl, openDoor, turnLightOn } =
    //     useDoorBird();
    const { isLoading, openDoor } =
        useDoorBird();
    const releayNumber = 1;

    // 2. Hook para las REACCIONES (escuchar el timbre)
    const { isRinging, setIsRinging } = useDoorBellSocket();

    return (
        <button
            className={`btn  ${isRinging ? "doorbell-button is-ringing" : ""}`}
            onClick={() => { openDoor(releayNumber); setIsRinging(false); }}
            disabled={isLoading}
        >
            {/* <div className="container-elements_buttons doorbell-button"> */}
            <div className="container-elements_buttons">
                <p>ABRIR PUERTA EXTERIOR</p>
                <div className="container-elements_img">
                    <IconPuertaExt className="iconsForm iconsForm_buttons" />
                </div>
            </div>
        </button>

    );
};

export default DoorBirdOutDoor;
