import React, { useState } from "react";

const InputBuscador = ({setIsDealerSearched}) => {
    

    const handleChange = (e) => {
        const { nombre } = e.target;
        setIsDealerSearched(nombre);    
    }

    return (
        <div className="container_input-buscador">
            <input
                className="input-buscador"
                type="text"
                placeholder="BUSCAR"
                onChange={handleChange}
            />
        </div>
    );
};

export default InputBuscador;