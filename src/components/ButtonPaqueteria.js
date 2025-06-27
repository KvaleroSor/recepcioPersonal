import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/App.scss";
import { ReactComponent as IconCamion } from "./../icons/iconCamion.svg";
import { ReactComponent as IconRepartidor } from "./../icons/iconRepartidor.svg";

const ButtonPaqueteria = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        setTimeout(() => {
            navigate("/paqueteria");
        }, 500);
    };

    return (
        <button onClick={handleClick} className="btn">
            <div className="container-elements_buttons">
                <p>REPARTIDORES</p>
                <div className="container-elements_img">
                    <IconCamion className="iconsForm iconsForm_buttons" />
                    <IconRepartidor className="iconsForm iconsForm_buttons" />
                </div>
            </div>
        </button>
    );
};

export default ButtonPaqueteria;
