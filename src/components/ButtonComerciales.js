import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/App.scss";
import { ReactComponent as IconMujer } from "./../icons/iconMujer.svg";
import { ReactComponent as IconHombre } from "./../icons/iconHombre.svg";

const ButtonComerciales = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        setTimeout(() => {
            navigate("/personalImasd");            
        }, 500);
    };

    return (
        <button onClick={handleClick} className="btn">
            <div className="container-elements_buttons">
                <p>COMERCIALES</p>
                <div className="container-elements_img">                    
                    <IconMujer className="iconsForm iconsForm_buttons" />
                    <IconHombre className="iconsForm iconsForm_buttons" />
                </div>
            </div>
        </button>
    );
};

export default ButtonComerciales;
