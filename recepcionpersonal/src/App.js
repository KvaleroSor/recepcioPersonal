import "./styles/App.scss";
import ButtonPaqueteria from "./components/ButtonPaqueteria";
import ButtonPersonalImasd from "./components/ButtonPersonalImasd";
import Paqueteria from "./components/paqueteria";
import PersonalImasd from "./components/personalImasd";
import { Route, Routes } from "react-router-dom";

function App() {
    const Home = () => {
        return (
            <div className="container-box">
                <ButtonPaqueteria />
                <ButtonPersonalImasd />
            </div>
        );
    };

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/paqueteria" element={<Paqueteria />} />
                <Route path="/personalImasd" element={<PersonalImasd />} />
            </Routes>
        </div>
    );
}

export default App;
