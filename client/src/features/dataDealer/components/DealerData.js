import React, { useState, useEffect } from "react";
import { getDataBBDDRepartidores } from "../../../db/getDataBBDDRepartidores";
import Dealer from "./Dealer";

const DealerData = () => {
    const [isData, setIsData] = useState([]);
    const [isDataSetted, setIsDataSetted] = useState(false);

    const handleData = async () => {
        try {
            const data = await getDataBBDDRepartidores();
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
                            <th>Empresa Reparto</th>                            
                            <th>Fecha</th>
                            <th>Uso Imasd</th>
                            <th>Uso Personal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isData.length > 0 ? (
                            <>
                                {isData.map((element) => (
                                    <Dealer
                                        key={element.id}
                                        dealer={element}
                                    />
                                ))}
                            </>
                        ) : (
                            <tr>
                                <td>CARGANDO ...!</td>
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

export default DealerData;
