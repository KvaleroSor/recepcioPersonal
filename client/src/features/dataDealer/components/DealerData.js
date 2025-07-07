import React, { useState, useEffect } from "react";
import { getDataBBDDRepartidores } from "../../../db/getDataBBDDRepartidores";
import Dealer from "./Dealer";
import { ReactComponent as IconoArrowLeft} from "./../../../icons/iconArrowLeft.svg";
import { ReactComponent as IconoArrowRight} from "./../../../icons/iconArrowRight.svg";
import "./../../../styles/App.scss";

const DealerData = () => {
    const [isData, setIsData] = useState([]);
    const [isDataSetted, setIsDataSetted] = useState(false);
    const [numPage, setNumPage] = useState(1);
    const numElemPage = 5;

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

    const lastDealerShow = numPage * numElemPage;
    const firstDealerShow = lastDealerShow - numElemPage;
    const currentDealers = isData.slice(firstDealerShow, lastDealerShow);
    const totalPages = Math.ceil(isData.length / numElemPage);

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
                        {currentDealers.length > 0 ? (
                            <>
                                {currentDealers.map((element) => (
                                    <Dealer key={element.id} dealer={element} />
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
            <div className="controles-pagination">
                <button
                    className="button-pagination"
                    onClick={() => {
                        setNumPage(numPage - 1);
                    }}
                    disabled={numPage <= 1}
                >
                    <IconoArrowLeft className="icons-buttons--pagination" />
                </button>
                <span className="text-pagination">
                    Página {numPage} de {totalPages}
                </span>
                <button
                    className="button-pagination"
                    onClick={() => {
                        setNumPage(numPage + 1);
                    }}
                    disabled={numPage >= totalPages}
                >
                    <IconoArrowRight className="icons-buttons--pagination" />
                </button>
            </div>
        </div>
    );
};

export default DealerData;
