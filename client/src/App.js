import "./styles/App.scss";
import ButtonPaqueteria from "./components/ButtonPaqueteria";
import ButtonComerciales from "./components/ButtonComerciales";
import Paqueteria from "./components/Paqueteria";
import Comerciales from "./components/Comerciales";
import { Route, Routes } from "react-router-dom";
import DoorBirdView from "./features/doorbird/components/DoorBirdView";
import VideoFeed from "./features/doorbird/components/VideoFeed";
// import logoImasd from './logo/logoImasd.jpeg';

// --- COMPONENTE HOME ---
// Se mueve aquí fuera para seguir las buenas prácticas de React y evitar problemas de renderizado.
const Home = () => {
    return (
        <>
            <div className="container-box">
                <div className="container-box_buttons--data">
                    <p>hola</p>
                </div>
                <div className="container-box_video-feed">
                    <VideoFeed />
                </div>
                <div className="container-box_buttons-main">
                    <DoorBirdView />
                    <ButtonPaqueteria />
                    <ButtonComerciales />
                </div>
            </div>
        </>
    );
};

function App() {
    /**
     * Modificacions
     *
     * 1- Afegir sistema de backend firebase
     * 1- Modificar les consultes
     *
     * @returns
     */
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
