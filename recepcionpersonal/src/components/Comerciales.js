import React, { useState, useId } from "react";
import PopupFromLibrary from "reactjs-popup";
import Popup from "./Popup";
import getDataFromDbJson from "../functions/getDataFromDbJson";
import { idState } from "../obj/idState";
import iconPersona from "./../icons/iconPersona.svg";
import iconEmpresa from "./../icons/iconEmpresa.svg";
import iconRegistrar from "./../icons/iconRegistrar.svg";
import iconTrabajador from "./../icons/iconTrabajador.svg";
import setDataBBDDComercial from "../db/setDataBBDDComercial";
import { useNavigate } from "react-router-dom";

const Comerciales = () => {
    const navigate = useNavigate();

    const getInitialState = () => {
        const date = new Date();
        return {           
            nombre: "",
            empresa: "",
            personaImasd: "",
            fecha: date.toLocaleTimeString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
            }),
        };
    };

    const [values, setValues] = useState(getInitialState());
    const [showPopup, setShowPopup] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        // Aquí puedes usar values para enviar la información
        if (!values.nombre || !values.empresa || !values.personaImasd) {
            alert("Por favor, rellena todos los campos");
            return;
        }
    
        setSubmittedData(values);
        setShowPopup(true);
        // const comercialsSizeArray = await getDataFromDbJson();
        // idState.idComercial = comercialsSizeArray.length;
        // await udatingDataComercialJsonFile(values);
        setDataBBDDComercial(values);
    };

    function handleChange(evt) {
        const { target } = evt;
        const { name, value } = target;
        const newValues = {
            ...values,
            [name]: value,
        };

        setValues(newValues);
    }

    const handleClosePopup = () => {
        setShowPopup(false);
        setValues(getInitialState());
        setSubmittedData(null);
        navigate("/");
    };

    return (
        <div className="container-form_comerciales">
            <form onSubmit={handleSubmit}>
                <label htmlFor="nombre">
                    <img src={iconPersona} className="iconsForm" />
                    <p>NOMBRE</p>
                </label>
                <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    placeholder="El vostre nom"
                    value={values.nombre}
                    onChange={handleChange}
                />
                <label htmlFor="empresa">
                    <img src={iconEmpresa} className="iconsForm" />
                    <p>EMPRESA</p>
                </label>
                <input
                    id="empresa"
                    name="empresa"
                    type="text"
                    placeholder="Nom de l´empresa"
                    value={values.empresa}
                    onChange={handleChange}
                />
                <label htmlFor="personaImasd">
                    <img src={iconTrabajador} className="iconsForm" />
                    <p>PERSONA IMASD A LA QUE BUSCA</p>
                </label>
                <input
                    id="personaImasd"
                    placeholder="Nom i apellido"
                    name="personaImasd"
                    type="text"
                    value={values.personaImasd}
                    onChange={handleChange}
                />
                <button type="submit" className="button-registro">
                    <img
                        src={iconRegistrar}
                        className="iconsForm"
                    />
                    <p>REGISTRAR</p>{" "}
                </button>
            </form>

            <PopupFromLibrary
                open={showPopup}
                onClose={handleClosePopup}
                modal
                nested
            >
                {(close) => (
                    <Popup
                        data={submittedData}
                        tipo="comercial"
                        onCloseRequest={close}
                    />
                )}
            </PopupFromLibrary>
        </div>
    );
};

export default Comerciales;
