import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../data/api.js";
import { useCart } from "../context/CartContext.jsx";
import ItemCount from "./ItemCount.jsx";
import "./itemdetailcontainer.css";

export default function ItemDetailContainer() {
    const { productId } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addItem } = useCart();
    const [added, setAdded] = useState(false);
    const toastTimer = useRef(null);

    useEffect(() => {
        setLoading(true);
        getProductById(productId)
        .then((data) => setItem(data || null))
        .finally(() => setLoading(false));

        return () => {
        if (toastTimer.current) clearTimeout(toastTimer.current);
        };
    }, [productId]);

    const handleAdd = (cantidad) => {
        if (!item) return;
        const stock = item.stock ?? 10;

        addItem(
        {
            id: item.id,
            title: item.title,
            price: item.price,
            img: item.img,
            stock,
        },
        cantidad
        );

        setAdded(true);
        if (toastTimer.current) clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setAdded(false), 1800);
    };

    if (loading) {
        return (
        <main className="detail">
            <p className="detail-status">Cargando producto...</p>
        </main>
        );
    }

    if (!item) {
        return (
        <main className="detail">
            <p className="detail-status">No se encontró el producto.</p>
            <Link to="/" className="btn-back">← Volver</Link>
        </main>
        );
    }

    const stock = item.stock ?? 10;

    return (
        <main className="detail">
        <div className="detail-img">
            <img src={item.img} alt={item.title} />
        </div>

        <div className="detail-info">
            <Link to="/" className="btn-back">← Volver</Link>
            <h1 className="detail-title">{item.title}</h1>
            <p className="detail-price">
            ${item.price.toLocaleString("es-AR")}
            </p>
            <p className="detail-desc">{item.desc}</p>

            <div className="detail-actions">
            <ItemCount stock={stock} initial={1} onAdd={handleAdd} />
            </div>
        </div>

        <div className={`toast ${added ? "show" : ""}`} role="status" aria-live="polite">
            ✅ Producto agregado al carrito
        </div>
        </main>
    );
}
