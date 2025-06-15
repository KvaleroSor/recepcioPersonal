import React from "react";
import updatingDataPlayerJsonFile from "../functions/updatingDataPlayerJsonFile";

const Repartidor = ({ repartidor }) => {
    const { id, nombre, src } = repartidor; 

    const handleClick = () => {
        updatingDataPlayerJsonFile(repartidor);
    }

    return (
        <>
            <ul>
                <li>
                    <img src={src} alt={nombre} onClick={handleClick} />
                </li>
            </ul>
        </>
    );
};

export default Repartidor;
