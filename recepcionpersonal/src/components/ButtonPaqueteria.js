import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/App.scss";
import iconCamion from "./../icons/iconCamion.svg";
import iconRepartidor from "./../icons/iconRepartidor.svg";

const ButtonPaqueteria = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/paqueteria");
    };

    return (
        <button onClick={handleClick} className="btn">
            <div className="container-elements_buttons">
                <p>REPARTIDORES</p>
                <div className="container-elements_img">
                    <img src={iconCamion} className="iconsForm" />
                    <img src={iconRepartidor} className="iconsForm" />
                </div>
            </div>
        </button>
    );
};

export default ButtonPaqueteria;
