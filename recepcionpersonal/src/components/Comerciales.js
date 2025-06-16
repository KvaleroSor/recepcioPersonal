import React, { useState } from "react";
import PopupFromLibrary from "reactjs-popup"; 
import Popup from "./Popup"; 

const Comerciales = () => {
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

    const [ values, setValues ] = useState(getInitialState());
    const [showPopup, setShowPopup] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);

    function handleSubmit(evt) {
        evt.preventDefault();

        // Aquí puedes usar values para enviar la información
        if (!values.nombre || !values.empresa || !values.personaImasd) {
            alert("Por favor, rellena todos los campos");
            return;
        }

        setSubmittedData(values);
        setShowPopup(true);
    }

    function handleChange(evt) {
        const { target } = evt;
        const { name, value } = target;
        const newValues = {
            ...values,
            [name]: value,
        };

        setValues(newValues);
    }

    function handleClosePopup() {
        setShowPopup(false);
        setValues(getInitialState()); 
        setSubmittedData(null); 
    }

    return (
        <div className="container-form_comerciales">
            <form onSubmit={handleSubmit}>
                <label htmlFor="nombre">NOMBRE</label>
                <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    value={values.nombre}
                    onChange={handleChange}
                />
                <label htmlFor="empresa">EMPRESA</label>
                <input
                    id="empresa"
                    name="empresa"
                    type="text"
                    value={values.empresa}
                    onChange={handleChange}
                />
                <label htmlFor="personaImasd">
                    PERSONA IMASD A LA QUE BUSCA
                </label>
                <input
                    id="personaImasd"
                    name="personaImasd"
                    type="text"
                    value={values.personaImasd}
                    onChange={handleChange}
                />
                <button type="submit">Registrar</button>
            </form>
            
            <PopupFromLibrary 
                open={showPopup} 
                onClose={handleClosePopup} 
                modal 
                nested
            >
                {close => ( 
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
