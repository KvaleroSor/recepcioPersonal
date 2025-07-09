import React from 'react';
import { useNavigate } from "react-router";
import "./../styles/App.scss";

const ButtonCloseData = ({ customClassName = '' }) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate("/");
    }

    return ( 
        <button
            className={`btn btn-close_data ${customClassName}`}
            onClick={handleClick}
            >
                CERRAR
        </button>
    );
}
 
export default ButtonCloseData;