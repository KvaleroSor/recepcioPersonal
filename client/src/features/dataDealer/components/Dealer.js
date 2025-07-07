import React from "react";

const Dealer = ({ dealer }) => {
    const { nombre, fecha, tipoUsoEmpresa, tipoUsoPersonal } = dealer;

    return (
        <tr>
            {/* <td>{id}</td> */}
            <td>{nombre}</td>                        
            <td className="container-fecha">
                {fecha ? fecha.toDate().toLocaleDateString("es-ES") : "N/A"}
            </td>
            <td>{tipoUsoEmpresa ? "x" : "-"}</td>
            <td>{tipoUsoPersonal ? "x" : "-"}</td>
        </tr>
    );
};

export default Dealer;
