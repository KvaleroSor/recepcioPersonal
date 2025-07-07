import React from "react";
import { useNavigate } from "react-router";
import "./../../../styles/App.scss";

const ButtonDealerData = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/dataDealer");
    };

    return (
        <button className="btn button-data" onClick={handleClick}>
            <p>Registro Repartidores</p>
        </button>
    );
};

export default ButtonDealerData;
