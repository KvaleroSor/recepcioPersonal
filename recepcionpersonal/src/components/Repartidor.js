import React from "react";
import setDataBBDDRepartidores from "../db/setDataBBDDRepartidores";
import { useNavigate } from "react-router-dom";

const Repartidor = ({ repartidor }) => {
    const navigate = useNavigate();
    const { id, nombre, src } = repartidor;

    const handleClick = (e) => {
        const imgClicked = e.target;
        imgClicked.classList.add("selected");

        setTimeout(() => {
            imgClicked.classList.remove("selected");
            navigate("/")
        }, 3000);

        setDataBBDDRepartidores({ nombre });
    };

    return (
        <>
            <ul>
                <li>
                    <img id={id} src={src} alt={nombre} onClick={handleClick} />
                    {/* { isOpenPopup && <Popup repartidor={repartidor} /> }*/}
                </li>
            </ul>
        </>
    );
};

export default Repartidor;
