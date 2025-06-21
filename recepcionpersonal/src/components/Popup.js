import React from "react";
import checkNombrePersonaImasd from "../functions/checkNombrePersonaImasd";
import ButtonCerrarPopup from "./ButtonCerrarPopup";

// Si tus estilos SCSS no se importan globalmente (ej. en App.js o index.js),
// podrías necesitar importarlos aquí directamente, aunque usualmente no es necesario
// si el bundler los maneja globalmente.
// import '../styles/_popup.scss';

const Popup = ({ data, tipo, onCloseRequest }) => {
    let title = "Información"; // Título por defecto
    let contentRender = null;

    if (!data) {
        contentRender = <p>No hay datos para mostrar.</p>;
    } else if (tipo === "comercial") {
        // title = data.nombre ? `Comercial: ${data.nombre}` : "Registro de Comercial";

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
                        {data.personaImasd || "N/A"}
                    </span>
                </p>
                <p className="popup__text-popup">
                    Llamar al número:{" "}
                    <span className="popup__span-text">
                        {checkNombrePersonaImasd(data.personaImasd) || "N/A"}
                    </span>
                </p>
                {/* {data.fecha && <p><small>Fecha de registro: {data.fecha}</small></p>} */}
            </>
        );
    } else if (tipo === "repartidor") {
        title = data.nombre
            ? `Repartidor: ${data.nombre}`
            : "Datos del Repartidor";
        contentRender = (
            <>
                <p>
                    <strong>Nombre:</strong> {data.nombre || "N/A"}
                </p>
                {data.src && (
                    <img
                        src={data.src}
                        alt={`Foto de ${data.nombre || "repartidor"}`}
                        style={{
                            maxWidth: "100%",
                            height: "auto",
                            borderRadius: "8px",
                            marginTop: "1rem",
                            marginBottom: "1rem",
                        }}
                    />
                )}
                {data.vehiculo && (
                    <p>
                        <strong>Vehículo:</strong> {data.vehiculo}
                    </p>
                )}
                {data.fecha && (
                    <p>
                        <small>Fecha de registro: {data.fecha}</small>
                    </p>
                )}
            </>
        );
    } else {
        // Fallback para tipos desconocidos o si 'data' no es lo esperado
        title = "Detalles";
        contentRender = <p>Información detallada no disponible.</p>;
    }

    return (
        // Esta es la estructura que usa las clases de tu _popup.scss
        // No incluye el 'popup-overlay', ya que reactjs-popup se encarga de eso.
        <div className="popup">
            {/* El botón de cierre llamará a la función que le pasa reactjs-popup */}
            {/* {onCloseRequest && (
                <button className="popup__close-btn" onClick={onCloseRequest}>
                    &times;
                </button>
            )} */}
            {/* <div className="popup__header">
        <h1>{title}</h1>
      </div> */}
            <div className="popup__content">{contentRender}</div>
            <div className="popup__button_close">
                {onCloseRequest && <ButtonCerrarPopup onCloseRequest/>}
            </div>
        </div>
    );
};

export default Popup;
