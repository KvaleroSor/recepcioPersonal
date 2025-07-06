import React, { useState, useEffect } from "react";
import Comercial from "./Comercial";
import { getDataBBDDComerciales } from "../../../db/getDataBBDDComerciales";
import "./../../../styles/App.scss";

const ComercialData = () => {
    const [isData, setIsData] = useState([]);
    const [isDataSetted, setIsDataSetted] = useState(false);

    const handleData = async () => {
        try {
            const data = await getDataBBDDComerciales();
            setIsData(data || []);
            setIsDataSetted(true);
            console.log(data);
        } catch (error) {
            console.log(error);
            setIsDataSetted(false);
        }
        
    };

    useEffect(() => {
        handleData();
    }, []);

    return (
        <div className="container-box">
            {isDataSetted ? (
                <table>
                    <thead>
                        <tr>
                            {/* <th>ID</th> */}
                            <th>Nombre del Comercial</th>
                            <th>Nombre de la Empresa</th>
                            <th>Fecha</th>
                            <th>Persona de Imasd que busca</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isData.length > 0 ? (
                            <>
                                {isData.map((element) => (
                                    <Comercial
                                        key={element.id}
                                        comercial={element}
                                    />
                                ))}
                            </>
                        ) : (
                            <tr>
                                <td>ERROR - NO HA DATOS!</td>
                            </tr>
                        )}
                        {/* Código que recorra la data e imprima por cada por cada comercial que encontremos
                    en la BBDD una fila con las respectivas columnas, imprimiendo la información del 
                    comercial. 
                    
                    <tr>
                        <td>Información del comercial</td>
                        <td>Información del comercial</td>
                        <td>Información del comercial</td>
                        <td>Información del comercial</td>
                    </tr>
                */}
                    </tbody>
                </table>
            ) : (
                <div>
                    <h1>ERROR - NO HAY DATA QUE MOSTRAR!</h1>
                </div>
            )}
        </div>
    );
};

export default ComercialData;
