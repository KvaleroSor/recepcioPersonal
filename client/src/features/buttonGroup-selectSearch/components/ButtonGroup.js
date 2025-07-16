import React, { useState } from "react";

const ButtonGroup = () => {
    // const [isButtonComercialClicked, setIsButtonComercialClicked] = useState(null);
    const [isButtonEmpresaClicked, setIsButtonEmpresaClicked] = useState(null);
    const [isContadorComercial, setIsContadorComercial] = useState(false);
    // const [isContadorEmpresa, setIsContadorEmpresa] = useState(false);

    const handleClickComercial = () => {
        setIsContadorComercial(!isContadorComercial);

        if (isContadorComercial) {
            document.addEventListener("click", (e) => {
                const buttonComercial = e.target;

                buttonComercial.classList.add("button_background-add");
                buttonComercial.removeEventListener("click", handleClickComercial);
            });
        } else {
            document.addEventListener("click", (e) => {
                const buttonComercial = e.target;

                buttonComercial.classList.remove("button_background-add");
                buttonComercial.removeEventListener("click", handleClickComercial);
            });
        }
    };

    const handleClickEmpresa = () => {
        setIsButtonEmpresaClicked(!isButtonEmpresaClicked);

        if (isButtonEmpresaClicked) {
            document.addEventListener("click", (e) => {
                const buttonEmpresa = e.target;

                buttonEmpresa.classList.add("button_background-add");
                buttonEmpresa.removeEventListener("click", handleClickEmpresa);
            });
        } else {
            document.addEventListener("click", (e) => {
                const buttonEmpresa = e.target;

                buttonEmpresa.classList.remove("button_background-add");
                buttonEmpresa.removeEventListener("click", handleClickEmpresa);
            })
        }
    }

    return (
        <div className="container-buttonGroup">
            <button 
                id="buttonComercial" 
                className="button-styles_buttonGroup button-margin_left--setup"
                onClick={handleClickComercial}>Comerciales</button>
            <button 
                id="buttonEmpresa" 
                className="button-styles_buttonGroup" 
                onClick={handleClickEmpresa}>Empresa</button>
        </div>
    );
};

export default ButtonGroup;
