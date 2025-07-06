import React from 'react';
import { ReactComponent as IconData } from "./../../../icons/iconData.svg";
import { useNavigate } from "react-router";

const ButtonComercialData = () => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate("/dataComerciales");
    }

    return ( 
        <button className="btn buttons button-comercial_data"
        onClick={handleClick}>
            <IconData className="iconsForm iconsForm_buttons" />
        </button>
     );
}
 
export default ButtonComercialData;