import React, { useState, useEffect } from "react";
import imagenesPaqueteria from "../obj/imagenesPaqueteria";
import Repartidor from "./Repartidor";
import setDataBBDDRepartidores from "../db/setDataBBDDRepartidores";
import ButtonTipoUsoEmpresa from "./ButtonTipoUsoEmpresa";
import ButtonTipoUsoPersonal from "./ButtonTipoUsoPersonal";

/**
 * MODIFICACIÓN PARA REGISTRAR SI EL PAQUETE ES PARA USO PROPIO O USO DE LA EMPRESA 🚀
 *
 * 1️⃣ - Crear los componentes hijo para llamarlos desde este componente (el padre)
 * 2️⃣ - Estos componentes se renderizaran en el caso que isSelected no sea null i después del setTimeOut.
 */

const Paqueteria = () => {
    const [isSelectedRepartidorId, setSelectedRepartidorId] = useState(null);
    const [isSelectedRepartidorName, setSelectedRepartidorName] =
        useState(null);
    const [isSetTimeOutFinished, setTimeOutFinished] = useState(null);
    const [isEmpresaSetted, setEmpresa] = useState(null);
    const [isPersonalSetted, setPersonal] = useState(null);

    const setInitialsValues = () => {
        setSelectedRepartidorId(null);
        setEmpresa(null);
        setPersonal(null);
    };

    useEffect(() => {
        if ((isEmpresaSetted || isPersonalSetted) && isSelectedRepartidorName) {
            setDataBBDDRepartidores({
                nombre: isSelectedRepartidorName,
                tipoUsoEmpresa: isEmpresaSetted,
                tipoUsoPersonal: isPersonalSetted,
            });
        }
    }, [isEmpresaSetted, isPersonalSetted, isSelectedRepartidorName]);

    const handleSelectedClick = (repartidor) => {
        const idRepartidor = repartidor.id;

        if (isSelectedRepartidorId === null) {
            setSelectedRepartidorId(idRepartidor);
            setSelectedRepartidorName(repartidor.nombre);
        }

        setTimeout(() => {
            setInitialsValues();
            setTimeOutFinished(true);
        }, 1000);
    };

    return (
        <>
            <div className="container-paqueteria">
                <div className="container-box_repartidor">
                    {!isSetTimeOutFinished ? (
                        imagenesPaqueteria.map((repartidor) => (
                            <Repartidor
                                key={repartidor.id}
                                repartidor={repartidor}
                                handleSelectedClick={handleSelectedClick}
                                isSelectedRepartidorId={
                                    isSelectedRepartidorId === repartidor.id
                                }
                            />
                        ))
                    ) : (
                        <>
                            <div className="container-box">
                                <ButtonTipoUsoEmpresa setEmpresa={setEmpresa} />
                                <ButtonTipoUsoPersonal
                                    setPersonal={setPersonal}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Paqueteria;
