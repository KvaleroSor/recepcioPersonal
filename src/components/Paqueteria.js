import React, { useState } from "react";
import imagenesPaqueteria from "../obj/imagenesPaqueteria";
import Repartidor from "./Repartidor";
import setDataBBDDRepartidores from "../db/setDataBBDDRepartidores";
import { useNavigate } from "react-router-dom";

const Paqueteria = () => {
    const [isSelectedRepartidorId, setSelectedRepartidorId] = useState(null);
    const navigate = useNavigate();

    const handleSelectedClick = (repartidor) => {
        const idRepartidor = repartidor.id;
        const nombreRepartidor = repartidor.nombre;

        if (isSelectedRepartidorId === null) {
            setSelectedRepartidorId(idRepartidor);
            setDataBBDDRepartidores({ nombreRepartidor });
        }

        setTimeout(() => {
            setSelectedRepartidorId(null);
            navigate("/");
        }, 1000);
    };

    return (
        <>
            <div className="container-paqueteria">
                <div className="container-box_repartidor">
                    {imagenesPaqueteria.map((repartidor) => (
                        <Repartidor
                            key={repartidor.id}
                            repartidor={repartidor}
                            handleRepartidorClick={handleSelectedClick}
                            isSelectedRepartidorId={
                                isSelectedRepartidorId === repartidor.id
                            }
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Paqueteria;
