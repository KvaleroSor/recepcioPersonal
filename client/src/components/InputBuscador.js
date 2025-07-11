import React, { useState } from "react";
import { ReactComponent as IconEnter } from "./../icons/iconEnter.svg";
import { getDataBBDDComercialsByName } from "./../db/getDataBBDDComercialsByName";

const InputBuscador = () => {
    /**
     * ANOTACIONES 📝
     * 
     * 1 - Implementar el stringsimilarity para la busqueda del nombre de la empresa 
     *     repartidora que queremos buscar.
     * 
     */
    const [inputValue, setInputValue] = useState("");

    const handleClick = () => {                          
        setInputValue("");
        dataByName();
    };

    const dataByName = async () => {        
        const dataByName = await getDataBBDDComercialsByName(
            inputValue.toLowerCase()
        );

        console.log(dataByName);
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value);        
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
            />
            <button onClick={handleClick}>
                <IconEnter className="iconEnterInput" />
            </button>
        </div>
    );
};

export default InputBuscador;
