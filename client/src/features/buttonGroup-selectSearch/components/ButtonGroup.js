import React, { useState } from "react";

const ButtonGroup = ({setIsButtonTypePushed}) => {
    const [isButtonType, setIsButtonType] = useState(null);

    const handleClick = (buttonType) => {        
        if (isButtonType === "comercial" && buttonType === "empresa") {
            setIsButtonType("empresa");
            setIsButtonTypePushed("empresa");
        } else if (isButtonType === "empresa" && buttonType === "comercial") {
            setIsButtonType("comercial");
            setIsButtonTypePushed("comercial");
        } else if(isButtonType === "comercial" && buttonType === "comercial"){
            setIsButtonType("");
        }else if(isButtonType === "empresa" && buttonType === "empresa"){
            setIsButtonType("");
        }else{
            setIsButtonType(buttonType);
            setIsButtonTypePushed(buttonType);
        }
    };

    return (
        <div className="container-buttonGroup">
            <button
                id="buttonComercial"
                className={`button-styles_buttonGroup ${
                    isButtonType === "comercial" ? "button_background-add" : ""
                } button-margin_left--setup`}
                onClick={() => handleClick("comercial")}
            >
                Comerciales
            </button>
            <button
                id="buttonEmpresa"
                className={`button-styles_buttonGroup ${
                    isButtonType === "empresa" ? "button_background-add" : ""
                }`}
                onClick={() => handleClick("empresa")}
            >
                Empresa
            </button>
        </div>
    );
};

export default ButtonGroup;
