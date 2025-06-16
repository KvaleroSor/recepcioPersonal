import React from "react";
import updatingDataPlayerJsonFile from "../functions/updatingDataPlayerJsonFile";
// import { useState } from "react";
// import Popup from "./Popup";

const Repartidor = ({ repartidor }) => {
    // const [isOpenPopup, setOpenPopup] = useState(false);
    const { id, nombre, src } = repartidor;

    const handleClick = (e) => {
        updatingDataPlayerJsonFile(repartidor);

        const imgClicked = e.target;
        imgClicked.classList.add("selected");
        // setOpenPopup(true);

        setTimeout(() => {
            imgClicked.classList.remove("selected");
            // setOpenPopup(false);
        }, 3000);
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
