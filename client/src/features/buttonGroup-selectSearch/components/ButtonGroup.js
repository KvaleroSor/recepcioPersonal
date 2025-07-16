import React, { useState } from "react";

const ButtonGroup = () => {
    const [isButtonComercialClicked, setIsButtonComercialClicked] = useState(true);
    const [isButtonEmpresaClicked, setIsButtonEmpresaClicked] = useState(true);    

    const handleClick = (buttonType) => {                     
        /**
         * Gestionar el estado y color del botón desde el handleClick 
         * modificando directamente la clase.
         * 
         * NO UTILIZAR ADDEVENTLISTENER ❌
         */
    };

    return (
        <div className="container-buttonGroup">
            <button 
                id="buttonComercial" 
                className="button-styles_buttonGroup button-margin_left--setup"
                onClick={handleClick}>Comerciales</button>
            <button 
                id="buttonEmpresa" 
                className="button-styles_buttonGroup" 
                onClick={handleClick}>Empresa</button>
        </div>
    );
};

export default ButtonGroup;
