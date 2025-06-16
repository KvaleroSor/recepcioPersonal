import React from "react";

const Popup = (props) => {
    const { repartidor } = props;

    if(!repartidor || !repartidor.nombre || !repartidor.src){
        return null;
    }
    
    const { nombre, src } = repartidor;

    return (
        <div className="container-popup">
            <h4>EMPRESA DE TRANSPORT: {nombre}</h4>
            <img src={src} />
        </div>
    );
};

export default Popup;
