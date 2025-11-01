import { useState } from "react";

export default function ItemCount({ stock = 10, initial = 1, onAdd }) {
    const [qty, setQty] = useState(() => {
        const start = Number(initial) || 1;
        return Math.max(1, Math.min(stock, start));
    });

    const clamp = (n) => Math.max(1, Math.min(stock, n));

    const dec = () => setQty((q) => clamp(q - 1));
    const inc = () => setQty((q) => clamp(q + 1));

    const onChange = (e) => {
        const v = Number(e.target.value);
        setQty(clamp(Number.isFinite(v) ? v : 1));
    };

    const blockWeirdKeys = (e) => {
        if (["e", "E", "+", "-", "."].includes(e.key)) e.preventDefault();
    };

    const handleAdd = () => {
        if (stock <= 0) return; 
        onAdd(qty);
    };

    const minReached = qty <= 1;
    const maxReached = qty >= stock;

    return (
        <div style={{ display: "grid", gap: ".6rem", justifyItems: "center" }}>
        <div className="cart-qty" style={{ alignItems: "center" }}>
            <button
            type="button"
            onClick={dec}
            aria-label="Restar"
            disabled={minReached}
            title={minReached ? "La cantidad mínima es 1" : "Restar 1"}
            >
            −
            </button>

            <input
            type="number"
            min="1"
            max={stock}
            step="1"
            value={qty}
            onChange={onChange}
            onKeyDown={blockWeirdKeys}
            inputMode="numeric"
            style={{ width: 72, textAlign: "center" }}
            />

            <button
            type="button"
            onClick={inc}
            aria-label="Sumar"
            disabled={maxReached}
            title={maxReached ? "Alcanzaste el stock disponible" : "Sumar 1"}
            >
            +
            </button>
        </div>

        <button
            className="btn-primary"
            onClick={handleAdd}
            disabled={stock <= 0}
        >
            {stock > 0 ? "Agregar al carrito" : "Sin stock"}
        </button>

        <small style={{ color: "#666" }} aria-live="polite">
            {stock > 0
            ? maxReached
                ? "Alcanzaste el stock disponible"
                : `Stock disponible: ${stock}`
            : "Producto sin stock"}
        </small>
        </div>
    );
}
