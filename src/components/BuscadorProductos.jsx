import { useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import "./buscador.css";

export default function BuscadorProductos({ onBuscar, placeholder = "Buscar productos..." }) {
    const [q, setQ] = useState("");

    const submit = (e) => {
        e.preventDefault();
        onBuscar(q.trim());
    };

    const limpiar = () => {
        setQ("");
        onBuscar("");
    };

    return (
        <form className="buscador" onSubmit={submit} role="search" aria-label="buscar productos">
        <FaSearch className="buscador-icono" aria-hidden="true" />
        <input
            className="buscador-input"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={placeholder}
            aria-label="Buscar"
        />
        {q && (
            <button type="button" className="buscador-clear" onClick={limpiar} aria-label="Limpiar búsqueda">
            <FaTimes />
            </button>
        )}
        <button type="submit" className="buscador-btn">Buscar</button>
        </form>
    );
}
