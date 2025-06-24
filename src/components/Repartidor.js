import React from "react";

const Repartidor = ({ repartidor, handleRepartidorClick, isSelectedRepartidorId }) => {
    const { id, nombre, src } = repartidor;

    const handleClick = () => {
        handleRepartidorClick(repartidor);
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
                    {/* { isOpenPopup && <Popup repartidor={repartidor} /> }*/}
                </li>
            </ul>
        </>
    );
};

export default Repartidor;
