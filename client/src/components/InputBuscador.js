import React, { useState } from "react";
import { ReactComponent as IconEnter } from "./../icons/iconEnter2.svg";
import { ReactComponent as IconClose } from "./../icons/iconClose.svg";
import { getDataBBDDComercialsByName } from "./../db/getDataBBDDComercialsByName";

const InputBuscador = ({ setIsDataByName, setIsButtonClicked }) => {
    /**
     * ANOTACIONES 📝
     *
     * 1 - Implementar el stringsimilarity para la busqueda del nombre de la empresa
     *     repartidora que queremos buscar.
     *
     */
    const [inputValue, setInputValue] = useState("");

    const handleClick = () => {        
        dataByName();
        setIsButtonClicked(true);

        if(inputValue === ""){
            handleClickButtonClose();
        }
    };

    const handleClickButtonClose = () => {
        setIsButtonClicked(false);
        setInputValue("");
    };

    const dataByName = async () => {
        const dataByName = await getDataBBDDComercialsByName(
            inputValue.toLowerCase()
        );

        setIsDataByName(dataByName);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        console.log(e.target.value);
    };

    return (
        <div className="container_input-buscador">
            <input
                id="input-buscador_dealers"
                className="input-buscador"
                type="text"
                placeholder="BUSCAR"
                value={inputValue}
                onChange={handleInputChange}
                autoComplete="off"
                autocapitalize="off"
                spellcheck="false"
                onKeyUp={(e) => {
                    if(e.key === "Enter") {
                        handleClick();
                    };
                }}
            />
            <button onClick={handleClick}>
                <IconEnter className="iconEnterInput" />
            </button>
            <button onClick={handleClickButtonClose}>
                <IconClose className="iconCloseInput" />
            </button>
        </div>
    );
};

export default InputBuscador;
