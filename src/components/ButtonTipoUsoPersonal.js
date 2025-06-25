import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/App.scss";

const ButtonTipoUsoPersonal = ({setPersonal}) => {
    const navigate = useNavigate();

    const handleClick = () => {
        setPersonal(true);
        setTimeout(() => {
            navigate("/");
        }, 1000);
    };

    return (
        <button onClick={handleClick} className="btn">
            <div className="container-elements_buttons">
                <p>PERSONAL</p>
                {/* <div className="container-elements_img">
                   
                </div> */}
            </div>
        </button>
    );
};

export default ButtonTipoUsoPersonal;
