import React from 'react';
import "./../../../styles/App.scss";

const Comercial = ({ comercial }) => { 
    const { nombre, empresa, fecha, personaImasd } = comercial;    

    return ( 
        <tr>
            {/* <td>{id}</td> */}
            <td>{nombre}</td>
            <td className='container-empresa'>{empresa}</td>
            {/* Se convierte el objeto Timestamp a un string de fecha legible */}
            <td className='container-fecha'>{fecha ? `${fecha.toDate().toLocaleDateString("es-ES")} | ${fecha.toDate().toLocaleTimeString()}`  : "No Registrada!"}</td>
            <td className='container-personalImasd'>{personaImasd}</td>
        </tr>      
     );
}
 
export default Comercial;