import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

const clamp = (qty, stock) => {
    const n = Math.max(1, Number(qty || 1));
    if (typeof stock === "number" && stock > 0) {
        return Math.min(n, stock);
    }
    return n;
};

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
            const stock = typeof copy[i].stock === "number" ? copy[i].stock : product.stock;
            const nextQty = clamp(copy[i].qty + qty, stock);
            copy[i] = { ...copy[i], ...product, stock, qty: nextQty };
            return copy;
        }
        const stock = product.stock;
        return [...prev, { ...product, stock, qty: clamp(qty, stock) }];
        });
    };

    const increase = (id, step = 1) => {
        setItems(prev => prev.map(p => {
        if (p.id !== id) return p;
        return { ...p, qty: clamp(p.qty + step, p.stock) };
        }));
    };

    const decrease = (id, step = 1) => {
        setItems(prev => prev.map(p => {
        if (p.id !== id) return p;
        return { ...p, qty: clamp(p.qty - step, p.stock) };
        }).filter(p => p.qty > 0));
    };

    const setQty = (id, qty) => {
        setItems(prev => prev.map(p => {
        if (p.id !== id) return p;
        return { ...p, qty: clamp(qty, p.stock) };
        }).filter(p => p.qty > 0));
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
