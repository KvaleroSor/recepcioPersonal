import React from "react";
// import { ReactComponent as IconHombre } from "./../../../icons/iconHombre.svg";
import { useNavigate } from "react-router";
import "./../../../styles/App.scss";

const ButtonComercialData = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/dataComerciales");
    };

    return (
        <button className="btn button-data button-data_border--ajust" onClick={handleClick}>
            <p>Registro Comerciales</p>
            {/* <IconHombre className="iconsForm iconsForm_buttons icon_button--comercialData" /> */}
        </button>
    );
};

export default ButtonComercialData;
