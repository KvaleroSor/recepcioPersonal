import React from "react";
import "./../../../styles/App.scss";

const Dealer = ({ dealer }) => {
    const { nombre, fecha, tipoUsoEmpresa, tipoUsoPersonal } = dealer;

    return (
        <tr>
            {/* <td>{id}</td> */}
            <td>{nombre}</td>
            <td className="container-fecha">
                {fecha ? fecha.toDate().toLocaleDateString("es-ES") : "N/A"}
            </td>
            <td className="dealer-td-th">{tipoUsoEmpresa ? "x" : "-"}</td>
            <td className="dealer-td-th">{tipoUsoPersonal ? "x" : "-"}</td>
        </tr>
    );
};

export default Dealer;