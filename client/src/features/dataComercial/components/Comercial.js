import React from "react";
import "./../../../styles/App.scss";
import { ReactComponent as IconClose } from "./../../../icons/iconClose.svg";
import deleteDataBBDDComercials from '../../../db/deleteDataBBDDComercials';

const Comercial = ({ comercial, setIsButtonDeleteClicked }) => {
    const { nombre, empresa, fecha, personaImasd } = comercial;

    const upperingFirstCase = () => {
        if (!nombre) return "";
        return nombre.charAt(0).toUpperCase() + nombre.slice(1);
    };

    const nombreUpperedCase = upperingFirstCase();

    const handleClickDeleteButton = async () => {
        await deleteDataBBDDComercials(comercial.id);
        console.log(comercial);
        console.log(comercial.id);
        setIsButtonDeleteClicked(true);
    }

    return (
        <>
            <tr>
                {/* <td>{id}</td> */}
                <td>{nombreUpperedCase}</td>
                <td className="container-empresa">{empresa}</td>
                {/* Se convierte el objeto Timestamp a un string de fecha legible */}
                <td className="container-fecha">
                    {fecha
                        ? `${fecha
                              .toDate()
                              .toLocaleDateString("es-ES")} | ${fecha
                              .toDate()
                              .toLocaleTimeString()}`
                        : "No Registrada!"}
                </td>
                <td className="container-personalImasd">{personaImasd}</td>
                <button
                    onClick={handleClickDeleteButton}
                 ><IconClose className="iconCloseInput" /></button>
            </tr>           
        </>
    );
};

export default Comercial;
