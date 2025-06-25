import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/App.scss";
import { ReactComponent as IconTrabajador1 } from "./../icons/iconEmpresa2.svg";
import { ReactComponent as IconTrabajador2 } from "./../icons/iconWorker.svg";

const ButtonTipoUsoEmpresa = ({ setEmpresa }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        setEmpresa(true);

        setTimeout(() => {
            navigate("/");
        }, 500);
    };

    return (
        <button onClick={handleClick} className="btn">
            <div className="container-elements_buttons">
                <p>IMASD</p>
                <div className="container-elements_img">
                    <IconTrabajador1 className="iconsForm iconsForm_buttons" />
                    <IconTrabajador2 className="iconsForm iconsForm_buttons" />
                </div>
            </div>
        </button>
    );
};

export default ButtonTipoUsoEmpresa;
