import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import "./tailwind.css";
import "./reset.css";
import App from "./App";
import 'semantic-ui-css/semantic.min.css';

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <React.StrictMode>
        <BrowserRouter> {/* Wrap App with BrowserRouter */}
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
