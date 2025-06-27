import "./styles/App.scss";
import ButtonPaqueteria from "./components/ButtonPaqueteria";
import ButtonComerciales from "./components/ButtonComerciales";
import Paqueteria from "./components/Paqueteria";
import Comerciales from "./components/Comerciales";
import { Route, Routes } from "react-router-dom";
import DoorBirdView from "./features/doorbird/components/DoorBirdView";
import VideoFeed from "./features/doorbird/components/VideoFeed";
// import logoImasd from './logo/logoImasd.jpeg';

function App() {
    /**
     * Modificacions
     *
     * 1- Afegir sistema de backend firebase ✅
     * 1- Modificar les consultes ✅
     *
     * @returns
     */
    const Home = () => {
        return (
            <>
                <div className="container-box">
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
