import React from "react";
import setDataBBDDRepartidores from "../db/setDataBBDDRepartidores";
import { useNavigate } from "react-router-dom";
// import imagenesPaqueteria from "../obj/imagenesPaqueteria";

const Repartidor = ({ repartidor }) => {
    const navigate = useNavigate();
    const { id, nombre, src } = repartidor;

    const handleClick = (e) => {
        const imgClicked = e.target;

        if (e.target) {
            imgClicked.classList.add("selected");
            e.target = null;
        }

        if (e.target === null) return navigate("/");

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
                        className="img_repartidores"
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
