import React from "react";

const ButtonGroup = () => {
    const [isButtonComercialClicked, setIsButtonComercialClicked] = useState(null);
    const [isButtonEmpresaClicked, setIsButtonEmpresaClicked] = useState(null);
    let contadorComercial = 0;
    let contadorEmpresa = 0;

    const handleClickComercial = () => {
        // contadorComercial = 1;

        if(contadorComercial === 1){
            document.addEventListener((e) => {
                const buttonComercial = e.target;

                buttonComercial.classList.add("button_background-add");
            })
        }
    };

    const handleClickEmpresa = () => {
        contadorEmpresa = 1;

        if(contadorEmpresa === 1){
            
        }
    }
    
    return (
        <div className="container-buttonGroup">  
            <button id="buttonComercial" className="button-styles_buttonGroup button-margin_left--setup">Comerciales</button>
            <button id="buttonEmpresa" className="button-styles_buttonGroup">Empresa</button>
        </div>
    );
};

export default ButtonGroup;
