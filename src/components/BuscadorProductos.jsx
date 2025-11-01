import { useEffect, useRef, useState } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";
import "./buscador.css";

export default function BuscadorProductos({ onBuscar, placeholder = "Buscar productos..." }) {
    const [q, setQ] = useState("");
    const inputRef = useRef(null);

    const submit = (e) => {
        e.preventDefault();
        const val = q.trim();
        if (!val) return; 
        onBuscar(val);
    };

    const limpiar = () => {
        setQ("");
        onBuscar("");
        inputRef.current?.focus();
    };
    useEffect(() => {
        const onKey = (e) => {
        if (e.key === "/") {
            e.preventDefault();
            inputRef.current?.focus();
        } else if (e.key === "Escape") {
            if (document.activeElement === inputRef.current && q) limpiar();
        }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [q]);

    return (
        <form className="buscador" onSubmit={submit} role="search" aria-label="buscar productos">
        <FaSearch className="buscador-icono" aria-hidden="true" />
        <input
            ref={inputRef}
            className="buscador-input"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={placeholder}
            aria-label="Buscar productos"
            inputMode="search"
            autoComplete="off"
        />
        {q && (
            <button
            type="button"
            className="buscador-clear"
            onClick={limpiar}
            aria-label="Limpiar búsqueda"
            title="Limpiar"
            >
            <FaTimes aria-hidden="true" />
            </button>
        )}
        <button type="submit" className="buscador-btn">Buscar</button>
        </form>
    );
}
