import React from "react";
import { useNavigate } from "react-router-dom";
import "./../styles/App.scss";

const ButtonPersonalImasd = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/personalImasd");
    };

    return <button onClick={handleClick} className="btn">COMERCIALS 👩🏽‍💼👨🏽‍💼</button>;
};

export default ButtonPersonalImasd;
