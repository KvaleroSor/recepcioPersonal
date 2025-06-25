import React from "react";

const Repartidor = ({ repartidor, handleSelectedClick, isSelectedRepartidorId }) => {
    const { id, nombre, src } = repartidor;

    const handleClick = () => {
        handleSelectedClick(repartidor);
    };

    const classRepartidor = `img_repartidores ${isSelectedRepartidorId ? "selected" : ""}`;

    return (
        <>
            <ul>
                <li>
                    <img
                        id={id}
                        src={src}
                        className={classRepartidor}
                        alt={nombre}
                        onClick={handleClick}
                    />                   
                </li>
            </ul>
        </>
    );
};

export default Repartidor;
