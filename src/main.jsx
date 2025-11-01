import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx";
import './index.css';
import App from "./App.jsx";


createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <BrowserRouter>
            <CartProvider>
                <App /> 
            </CartProvider>
        </BrowserRouter>
    </React.StrictMode>
);
