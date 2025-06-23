import React from "react";
import imagenesPaqueteria from "../obj/imagenesPaqueteria";
import Repartidor from "./Repartidor";

const Paqueteria = () => {
    return (
        <>
            {/* <h1>Hola desde paqueteria! 📦</h1> */}
            <div className="container-paqueteria">
                <div className="container-box_repartidor">
                    {imagenesPaqueteria.map((repartidor) => (
                        <Repartidor
                            key={repartidor.id}
                            repartidor={repartidor}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default Paqueteria;
