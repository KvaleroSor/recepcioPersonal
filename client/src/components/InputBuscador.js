import React, { useState } from "react";
import { ReactComponent as IconEnter } from "./../icons/iconEnter2.svg";
import { ReactComponent as IconClose } from "./../icons/iconClose.svg";

const InputBuscador = ({ setIsButtonClicked, setIsInputValue, customClass = '' }) => {
    const [inputValue, setInputValue] = useState("");

    const handleClick = () => {        
        setIsButtonClicked(true);
        setIsInputValue(inputValue);

        if (inputValue === "") {
            handleClickButtonClose();
        }
    };

    const handleClickButtonClose = () => {
        setIsButtonClicked(false);
        setInputValue("");
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        
        console.log(e.target.value);
    };

    return (
        <div className={`container_input-buscador ${customClass}`}>
            <input
                id="input-buscador_dealers"
                className="input-buscador"
                type="text"
                placeholder="BUSCAR"
                value={inputValue}
                onChange={handleInputChange}
                autoComplete="off"
                autoCapitalize="off"
                spellCheck="false"
                onKeyUp={(e) => {
                    if (e.key === "Enter") {
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
