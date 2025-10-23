import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [items, setItems] = useState(() => {
        try { return JSON.parse(localStorage.getItem("cart-items")) || []; }
        catch { return []; }
    });

    useEffect(() => {
        localStorage.setItem("cart-items", JSON.stringify(items));
    }, [items]);

    const addItem = (product, qty = 1) => {
        setItems(prev => {
        const i = prev.findIndex(p => p.id === product.id);
        if (i >= 0) {
            const copy = [...prev];
            copy[i] = { ...copy[i], qty: copy[i].qty + qty };
            return copy;
        }
        return [...prev, { ...product, qty }];
        });
    };

    const increase = (id, step = 1) => {
        setItems(prev => prev.map(p => p.id === id ? { ...p, qty: p.qty + step } : p));
    };

    const decrease = (id, step = 1) => {
        setItems(prev => prev.flatMap(p => {
        if (p.id !== id) return [p];
        const next = p.qty - step;
        return next > 0 ? [{ ...p, qty: next }] : [];
        }));
    };

    const setQty = (id, qty) => {
        setItems(prev => prev.flatMap(p => (p.id === id ? (qty > 0 ? [{ ...p, qty }] : []) : [p])));
    };

    const removeItem = (id) => setItems(prev => prev.filter(p => p.id !== id));
    const clear = () => setItems([]);

    const count = useMemo(() => items.reduce((a, p) => a + p.qty, 0), [items]);
    const total = useMemo(() => items.reduce((a, p) => a + p.qty * p.price, 0), [items]);

    const value = useMemo(
        () => ({ items, addItem, increase, decrease, setQty, removeItem, clear, count, total }),
        [items, count, total]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart debe usarse dentro de <CartProvider>");
    return ctx;
}
