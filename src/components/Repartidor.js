import React from "react";

const Repartidor = ({ repartidor, handleRepartidorClick, isSelectedRepartidorId }) => {
    const { id, nombre, src } = repartidor;

    const handleClick = () => {
        handleRepartidorClick(repartidor);
    };

    const classRepartidor = `img_repartidores ${isSelectedRepartidorId ? "selected" : ""}`;
    const handleClick = (e) => {
        const imgClicked = e.target;

        imgClicked.classList.add("selected");
        // if (e.target) {
        //     e.target = null;
        // }

        // if (e.target === null) return navigate("/");

        // imagenesPaqueteria.forEach((repartidor) => {
        //     if(repartidor.id === imgClicked.id && contador === 0){
        //     }
        // })

        setTimeout(() => {
            imgClicked.classList.remove("selected");
            navigate("/");
        }, 3000);

        setDataBBDDRepartidores({ nombre });
    };

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
