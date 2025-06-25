import React, { useState } from "react";
import PopupFromLibrary from "reactjs-popup";
import Popup from "./Popup";
import { ReactComponent as IconPersona } from "./../icons/iconPersona.svg";
import { ReactComponent as IconEmpresa } from "./../icons/iconEmpresa.svg";
import { ReactComponent as IconRegistrar } from "./../icons/iconRegistrar.svg";
import { ReactComponent as IconTrabajador } from "./../icons/iconTrabajador.svg";
import setDataBBDDComercial from "../db/setDataBBDDComercial";
import { useNavigate } from "react-router-dom";
import { getDataBBDDPersonalImasd } from "../db/getDataBBDDPersonalImasd";
import stringSimilarity from "string-similarity";
// import { HugeiconsIcon } from '@hugeicons/react';
// import { AddTeamIcon } from '@hugeicons-pro/core-stroke-rounded';

const Comerciales = () => {
    const navigate = useNavigate();

    const getInitialState = () => ({
        nombre: "",
        empresa: "",
        personaImasd: "",
    });

    const [values, setValues] = useState(getInitialState());
    const [showPopup, setShowPopup] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);

    const handleSubmit = async (evt) => {
        evt.preventDefault();

        if (!values.nombre || !values.empresa || !values.personaImasd) {
            alert("Por favor, rellena todos los campos");
            return;
        }

        try {
            const personalImasdBBDD = await getDataBBDDPersonalImasd();
            if (!personalImasdBBDD || personalImasdBBDD.length === 0) {
                alert("Error al cargar los datos del personal de I+D.");
                return;
            }

            const nombresEnLista = personalImasdBBDD.map((p) =>
                p && p.nombre ? p.nombre.toLowerCase().trim() : ""
            );
            const matches = stringSimilarity.findBestMatch(
                values.personaImasd.toLowerCase().trim(),
                nombresEnLista
            );
            const personaImasdEncontrada =
                personalImasdBBDD[matches.bestMatchIndex];

            if (!personaImasdEncontrada || matches.bestMatch.rating < 0.2) {
                alert(
                    "No se ha encontrado a la persona especificada. Por favor, revisa el nombre."
                );
                return;
            }

            const dataParaPopup = {
                ...values,
                personaImasdData: personaImasdEncontrada,
            };

            await setDataBBDDComercial(values);
            setSubmittedData(dataParaPopup);
            setShowPopup(true);
        } catch (error) {
            console.error("Error en el proceso de registro:", error);
            alert(
                "Ha ocurrido un error inesperado. Por favor, inténtalo de nuevo."
            );
        }
    };

    const handleChange = (evt) => {
        const { name, value } = evt.target;
        setValues({ ...values, [name]: value });
    };

    const handleClosePopup = () => {
        setShowPopup(false);
        setValues(getInitialState());
        navigate("/");
    };

    return (
        <div className="container-form_comerciales">
            <form onSubmit={handleSubmit}>
                <label htmlFor="nombre">
                    {/* <img src={iconPersona} className="iconsForm" /> */}
                    <IconPersona className="iconsForm" />
                    {/* <HugeiconsIcon icon={AddTeamIcon} /> */}
                    <p>NOMBRE</p>
                </label>
                <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    autoComplete="off"
                    placeholder="Tu nombre"
                    value={values.nombre}
                    onChange={handleChange}
                />

                <label htmlFor="empresa">
                    <IconEmpresa className="iconsForm" />
                    <p>EMPRESA</p>
                </label>
                <input
                    id="empresa"
                    name="empresa"
                    type="text"
                    autoComplete="off"
                    placeholder="Nombre de la empresa"
                    value={values.empresa}
                    onChange={handleChange}
                />

                <label htmlFor="personaImasd">
                    <IconTrabajador className="iconsForm" />
                    <p>PERSONA IMASD A LA QUE BUSCA</p>
                </label>
                <input
                    id="personaImasd"
                    name="personaImasd"
                    type="text"
                    autoComplete="off"
                    placeholder="Nombre y apellido"
                    value={values.personaImasd}
                    onChange={handleChange}
                />

                <button type="submit" className="button-registro">
                    <IconRegistrar className="iconsForm" />
                    <p>REGISTRAR</p>
                </button>
            </form>

            <PopupFromLibrary
                open={showPopup}
                modal
                nested
                closeOnDocumentClick={false}
                onClose={handleClosePopup}
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
