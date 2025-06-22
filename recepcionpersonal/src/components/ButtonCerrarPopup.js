import React from 'react';
import { useNavigate } from "react-router-dom";
import "./../styles/App.scss";

const ButtonCerrarPopup = ({onCloseRequest}) => {
    return ( 
        <button onClick={onCloseRequest}>CERRAR</button>
     );
}
 
export default ButtonCerrarPopup;