import React from "react";
import "./../../../styles/App.scss";
import { ReactComponent as IconClose } from "./../../../icons/iconClose.svg";
import deleteDataBBDDDearlers from "./../../../db/deleteDataBBDDDealers"

const Dealer = ({ dealer, setIsButtonDeleteClicked }) => {
    const { nombre, fecha, tipoUsoEmpresa, tipoUsoPersonal } = dealer;

    const upperingFirstCase = () => {
        if (!nombre) return "";
        return nombre.charAt(0).toUpperCase() + nombre.slice(1);
    };

    const nombreUpperedCase = upperingFirstCase();

    const handleClickDeleteButton = async () => {
        await deleteDataBBDDDearlers(dealer.id);
        console.log(dealer.id);
        setIsButtonDeleteClicked(true);
    }

    return (
        <tr>
            {/* <td>{id}</td> */}
            <td>{nombreUpperedCase}</td>
            <td className="container-fecha">
                {fecha
                    ? `${fecha.toDate().toLocaleDateString("es-ES")} | ${fecha
                          .toDate()
                          .toLocaleTimeString()}`
                    : "No Registrada!"}
            </td>
            <td className="dealer-td-th">{tipoUsoEmpresa ? "x" : "-"}</td>
            <td className="dealer-td-th">{tipoUsoPersonal ? "x" : "-"}</td>
            <button onClick={() => handleClickDeleteButton()}>
                <IconClose className="iconCloseInput" />
            </button>
        </tr>
    );
};

export default Dealer;
