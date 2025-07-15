import React, { useState, useEffect } from "react";
import Comercial from "./Comercial";
import { getDataBBDDComerciales } from "../../../db/getDataBBDDComerciales";
import "./../../../styles/App.scss";
import { ReactComponent as IconoArrowLeft } from "./../../../icons/iconArrowLeft.svg";
import { ReactComponent as IconoArrowRight } from "./../../../icons/iconArrowRight.svg";
import ButtonCloseData from "../../../components/ButtonCloseData";
import InputBuscador from "../../../components/InputBuscador";
import { CLOSING } from "ws";

const ComercialData = () => {
    /**
     * ANOTACIÓN 📝
     * 
     * Implementar la paginación como la hemos implementado en 
     * el archivo de "DealearData".
     */
    const [isData, setIsData] = useState([]);
    const [numPage, setNumPage] = useState(1);
    const [isDataByName, setIsDataByName] = useState([]);
    const [isDataByCompany, setIsDataByCompany] = useState([]);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [isDataSetted, setIsDataSetted] = useState(false);
    const [isInputValue, setIsInputValue] = useState("");
    const numElemPage = 5;

    /**
 *  ANOTACIÓN 📝
 *
 * 1️⃣ - Modificar para que se pueda desde la misma pantalla de consulta de datos volver a mostrar todos los datos ❌
 * 2️⃣ - Incorporar "StringSimilarity" para una busqueda más intuitiva ❌
 *
 */



    /******************************************************************
     *                           PAGINACIÓN                           *
     ******************************************************************/

    let currentDealers;
    let currentDealersByName;
    let currentDealersByCompany;
    let totalPages;
    const lastDealerShow = numPage * numElemPage;
    const firstDealerShow = lastDealerShow - numElemPage;

    if (!isButtonClicked) {
        currentDealers = isData.slice(firstDealerShow, lastDealerShow);
        totalPages = Math.ceil(isData.length / numElemPage);
    } else {
        if (isDataByName) {
            currentDealersByName = isDataByName.slice(
                firstDealerShow,
                lastDealerShow
            );
            totalPages = Math.ceil(isDataByName.length / numElemPage);
        } else {
            currentDealersByCompany = isDataByCompany.slice(
                firstDealerShow,
                lastDealerShow
            );
            totalPages = Math.ceil(isDataByCompany.length / numElemPage);
        }
    }

    /******************************************************************
     *                           PAGINACIÓN                           *
     ******************************************************************/

    /******************************************************************
     *                           GESTIÓN DATOS BBDD                   *
     ******************************************************************/

    const handleData = async () => {
        const data = await getDataBBDDComerciales();

        try {
            if (!isButtonClicked) {
                setIsData(data || []);
                setIsDataSetted(true);
            } else {

                /**
                 * Revisar la lógica de esta parte, no funciona correctamente ❌
                 */
                const dataByName = data.filter(
                    (element) =>
                        element.nombre.toLowerCase().includes(isInputValue.toLowerCase())
                );

                const dataByCompany = data.filter(
                    (element) =>
                        element.empresa.toLowerCase().includes(isInputValue.toLowerCase())
                );

                console.log("Input value", isInputValue);
                console.log("dataByName", dataByName);
                console.log("dataByCompany", dataByCompany);

                if (dataByName.length > 0) {
                    setIsDataByName(dataByName || []);
                } else if (dataByCompany.length > 0) {
                    setIsDataByCompany(dataByCompany || []);
                } else {
                    alert("No se ha encontrado lo que buscas...!");
                }
            }
        } catch (error) {
            console.log(error);
            setIsDataSetted(false);
        }
    };

    /*****************************************************************
     *                      GESTIÓN DATOS BBDD                       *
     *****************************************************************/

    // const cleanValueHooks = () => {
    //     setIsData([]);
    //     setIsDataByName([]);
    //     setIsDataByCompany([]);
    //     setIsButtonClicked(false);
    //     setIsDataSetted(false);
    //     setIsInputValue("");
    // }

    /******************************************************************
     *                      MOSTRANDO LOS DATOS                       *
     ******************************************************************/

    const showData = () => {
        if (!isButtonClicked) {
            const templateAllDealers = (
                <tbody>
                    {currentDealers.length > 0 ? (
                        <>
                            {currentDealers.map((element) => (
                                <Comercial key={element.id} comercial={element} />
                            ))}
                        </>
                    ) : (
                        <tr>
                            <td>CARGANDO ...!</td>
                        </tr>
                    )}
                </tbody>
            );
            return templateAllDealers;
        } else {
            if (isDataByName) {
                const templateValueByName = (
                    <tbody>
                        {currentDealersByName.length > 0 ? (
                            <>
                                {currentDealersByName.map((element) => (
                                    <Comercial key={element.id} comercial={element} />
                                ))}
                            </>
                        ) : (
                            <tr>
                                <td>CARGANDO ...!</td>
                            </tr>
                        )}
                    </tbody>
                );
                return templateValueByName;
            } else {
                const templateValueByCompany = (
                    <tbody>
                        {currentDealersByCompany.length > 0 ? (
                            <>
                                {currentDealersByCompany.map((element) => (
                                    <Comercial key={element.id} comercial={element} />
                                ))}
                            </>
                        ) : (
                            <tr>
                                <td>CARGANDO ...!</td>
                            </tr>
                        )}
                    </tbody>
                );
                return templateValueByCompany;
            }
        }
    };



    /******************************************************************
     *                      MOSTRANDO LOS DATOS                       *
     ******************************************************************/

    useEffect(() => {
        handleData();
    }, [isButtonClicked]);

    return (
        <div className="container-box">
            <InputBuscador
                setIsButtonClicked={setIsButtonClicked}
                setIsInputValue={setIsInputValue}
                customClass="custom-width"
                className="input_comercialData"
            />

            {isDataSetted || isDataByName ? (
                <table className="width-table_comercials">
                    <thead>
                        <tr>
                            {/* <th>ID</th> */}
                            <th>Nombre del Comercial</th>
                            <th>Nombre de la Empresa</th>
                            <th className="dealer-td-th">Fecha</th>
                            <th className="dealer-td-th">Persona de Imasd que busca</th>
                        </tr>
                    </thead>
                    {showData()}
                    {/* {cleanValueHooks()} */}
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
            <ButtonCloseData customClassName="btn-width_setteable--comercialData" />
        </div>
    );
};

export default ComercialData;
