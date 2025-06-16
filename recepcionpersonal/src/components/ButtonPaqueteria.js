import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/App.scss";

const ButtonPaqueteria = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/paqueteria");
    };

    return <button onClick={handleClick} className="btn">PAQUETERÍA 🚚📦</button>;
};

export default ButtonPaqueteria;
