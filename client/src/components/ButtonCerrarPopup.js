import React from 'react';
import "./../styles/App.scss";

const ButtonCerrarPopup = ({onCloseRequest}) => {
    return ( 
        <button onClick={onCloseRequest}
        className='button-cerrar_popup'>CERRAR</button>
     );
}
 
export default ButtonCerrarPopup;