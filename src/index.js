import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/App.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
// import { SpeedInsights } from "@vercel/speed-insights/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
            <Analytics />
            {/* <SpeedInsights /> */}
        </BrowserRouter>
    </React.StrictMode>
);
