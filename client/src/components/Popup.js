import React from "react";
import ButtonCerrarPopup from "./ButtonCerrarPopup";

const Popup = ({ data, tipo, onCloseRequest }) => {
    // useEffect(() => {
    //     if (tipo === "comercial" && data && data.personaImasd) {
    //         // No se utiliza setFormData en este código, por lo que se ha comentado esta línea
    //         // setFormData({
    //         //     // No se proporciona información sobre qué datos se deben establecer en el formulario
    //         // });
    //     }
    // }, [tipo, data]);
    let title = "ACCIONES A REALIZAR!";
    let contentRender = null;

    if (!data) {
        contentRender = <p>No hay datos para mostrar.</p>;
    } else if (tipo === "comercial") {
        const { personaImasdData } = data;
        console.log(personaImasdData);
        const nombrePersonaImasd = personaImasdData
            ? personaImasdData.nombre
            : "No encontrado";
        const tlfPersonaImasd = personaImasdData
            ? personaImasdData.telefono
            : "No encontrado";
            
        contentRender = (
            <>
                <p className="popup__text-popup">
                    Nombre del comercial:{" "}
                    <span className="popup__span-text">
                        {data.nombre || "N/A"}
                    </span>
                </p>
                <p className="popup__text-popup">
                    Viene de la empresa:{" "}
                    <span className="popup__span-text">
                        {data.empresa || "N/A"}
                    </span>
                </p>
                <p className="popup__text-popup">
                    Está buscando a:{" "}
                    <span className="popup__span-text">
                        {nombrePersonaImasd || "N/A"}
                    </span>
                </p>
                <p className="popup__text-popup">
                    Llamar al número:{" "}
                    <span className="popup__span-text">
                        {tlfPersonaImasd || "N/A"}
                    </span>
                </p>
            </>
        );
    }

    return (
        <div className="popup">
            <div className="popup__header"> 
                <h1 className="popup__header">{title}</h1>
            </div>
            <div className="popup__content">{contentRender}</div>
            <div className="popup__button_close">
                {onCloseRequest && (
                    <ButtonCerrarPopup onCloseRequest={onCloseRequest} />
                )}
            </div>
        </div>
    );
};

export default Popup;
