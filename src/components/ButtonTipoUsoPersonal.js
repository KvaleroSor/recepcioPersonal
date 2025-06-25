import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/App.scss";
import { ReactComponent as IconPersona1} from './../icons/iconPersona2.svg';
import { ReactComponent as IconPersona2} from './../icons/iconPersona3.svg';

const ButtonTipoUsoPersonal = ({setPersonal}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        setPersonal(true);
        setTimeout(() => {
            navigate("/");
        }, 500);
    };

    return (
        <button onClick={handleClick} className="btn">
            <div className="container-elements_buttons">
                <p>PERSONAL</p>
                <div className="container-elements_img">
                   <IconPersona1 className="iconsForm iconsForm_buttons" />
                   <IconPersona2 className="iconsForm iconsForm_buttons" />
                </div>
            </div>  
        </button>
    );
};

export default ButtonTipoUsoPersonal;
