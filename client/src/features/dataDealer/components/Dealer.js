import React from "react";
import "./../../../styles/App.scss";

const Dealer = ({ dealer }) => {
    const { nombre, fecha, tipoUsoEmpresa, tipoUsoPersonal } = dealer;

    const upperingFirstCase = () => {
        if (!nombre) return "";
        return nombre.charAt(0).toUpperCase() + nombre.slice(1);
    };

    const nombreUpperedCase = upperingFirstCase();

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
        </tr>
    );
};

export default Dealer;
