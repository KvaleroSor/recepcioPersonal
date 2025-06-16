import "./styles/App.scss";
import ButtonPaqueteria from "./components/ButtonPaqueteria";
import ButtonComerciales from "./components/ButtonComerciales";
import Paqueteria from "./components/Paqueteria";
import Comerciales from "./components/Comerciales";
import { Route, Routes } from "react-router-dom";

function App() {
    const Home = () => {
        return (
            <div className="container-box">
                <ButtonPaqueteria />
                <ButtonComerciales />
            </div>
        );
    };

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/paqueteria" element={<Paqueteria />} />
                <Route path="/personalImasd" element={<Comerciales />} />
            </Routes>
        </div>
    );
}

export default App;
