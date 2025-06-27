import React from 'react';
import "./../styles/App.scss";

const ButtonCerrarPopup = ({onCloseRequest}) => {
    return ( 
        <button onClick={onCloseRequest}>CERRAR</button>
     );
}
 
export default ButtonCerrarPopup;