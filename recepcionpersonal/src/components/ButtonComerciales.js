import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/App.scss";
import iconMujer from "./../icons/iconMujer.svg";
import iconHombre from "./../icons/iconHombre.svg";

const ButtonComerciales = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/personalImasd");
    };

    return (
        <button onClick={handleClick} className="btn">
            <div className="container-elements_buttons">
                <p>COMERCIALES</p>
                <div className="container-elements_img">
                    <img src={iconMujer} className="iconsForm" />
                    <img src={iconHombre} className="iconsForm" />
                </div>
            </div>
        </button>
    );
};

export default ButtonComerciales;
