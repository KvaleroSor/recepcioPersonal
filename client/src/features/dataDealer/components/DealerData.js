import React, { useState, useEffect } from "react";
import { getDataBBDDRepartidores } from "../../../db/getDataBBDDRepartidores";
import Dealer from "./Dealer";
import { ReactComponent as IconoArrowLeft } from "./../../../icons/iconArrowLeft.svg";
import { ReactComponent as IconoArrowRight } from "./../../../icons/iconArrowRight.svg";
import ButtonCloseData from "../../../components/ButtonCloseData";
import "./../../../styles/App.scss";
import InputBuscador from "../../../components/InputBuscador";

const DealerData = () => {
    /**
     * ANOTACIONES 📝
     *
     * 1 - Revisar alguna función de la clase String para poner la primera letra en mayúscula.
     */
    const [isData, setIsData] = useState([]);
    const [isDataSetted, setIsDataSetted] = useState(false);
    const [isDataByName, setIsDataByName] = useState([]);
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [isInputValue, setIsInputValue] = useState("");
    const [numPage, setNumPage] = useState(1);
    const numElemPage = 5;

    /******************************************************************
     *                           PAGINACIÓN                           *
     ******************************************************************/

    let currentDealers;
    let currentDealersByName;
    let totalPages;
    const lastDealerShow = numPage * numElemPage;
    const firstDealerShow = lastDealerShow - numElemPage;

    if (!isButtonClicked) {
        currentDealers = isData.slice(firstDealerShow, lastDealerShow);
        totalPages = Math.ceil(isData.length / numElemPage);
    } else {
        currentDealersByName = isDataByName.slice(
            firstDealerShow,
            lastDealerShow
        );
        totalPages = Math.ceil(isDataByName.length / numElemPage);
    }

    /******************************************************************
     *                           PAGINACIÓN                           *
     ******************************************************************/

    /******************************************************************
     *                           GESTIÓN DATOS BBDD                   *
     ******************************************************************/

    const handleData = async () => {
        const data = await getDataBBDDRepartidores();

        try {
            if (!isButtonClicked) {
                setIsData(data || []);
                setIsDataSetted(true);
            } else {
                const dataByName = data.filter(
                    (element) =>
                        element.nombre.toLowerCase().includes(isInputValue.toLowerCase())                        
                );            

                if (dataByName.length > 0) {
                    setIsDataByName(dataByName || []);
                } else {
                    alert("No se ha encontrado ningún repartidor.");
                }
            }
        } catch (error) {
            console.log(error);
            setIsDataSetted(false);
        }
    };

    /******************************************************************
     *                      GESTIÓN DATOS BBDD                        *
     ******************************************************************/

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
                                <Dealer key={element.id} dealer={element} />
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
            const templateValueByName = (
                <tbody>
                    {currentDealersByName.length > 0 ? (
                        <>
                            {currentDealersByName.map((element) => (
                                <Dealer key={element.id} dealer={element} />
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
        }
    };

    /******************************************************************
     *                      MOSTRANDO LOS DATOS                       *
     ******************************************************************/

    useEffect(() => {
        handleData();
        setIsInputValue("");
    }, [isButtonClicked]);

    return (
        <div className="container-box">
            <InputBuscador
                setIsButtonClicked={setIsButtonClicked}
                setIsInputValue={setIsInputValue}
            />
            {isDataSetted || isDataByName ? (
                <table>
                    <thead>
                        <tr>
                            {/* <th>ID</th> */}
                            <th>Empresa Reparto</th>
                            <th className="dealer-td-th">Fecha</th>
                            <th className="dealer-td-th">Uso Imasd</th>
                            <th className="dealer-td-th">Uso Personal</th>
                        </tr>
                    </thead>
                    {showData()}
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
            <ButtonCloseData />
        </div>
    );
};

export default DealerData;
