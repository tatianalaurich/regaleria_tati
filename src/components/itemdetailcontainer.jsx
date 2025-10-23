import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../data/api.js";
import { useCart } from "../context/CartContext.jsx";
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
    const handleAdd = () => {
        if (!item) return;
        addItem({ id: item.id, title: item.title, price: item.price, img: item.img }, 1);
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
    return (
        <main className="detail">
        <div className="detail-img">
            <img src={item.img} alt={item.title} />
        </div>
        <div className="detail-info">
            <Link to="/" className="btn-back">← Volver</Link>
            <h1 className="detail-title">{item.title}</h1>
            <p className="detail-price">${item.price.toLocaleString("es-AR")}</p>
            <p className="detail-desc">{item.desc}</p>
            <div className="detail-actions">
                <button className="btn-primary" onClick={handleAdd}>
                Agregar al carrito
                </button>
            </div>
        </div>
            <div className={`toast ${added ? "show" : ""}`} role="status" aria-live="polite">
                ✅ Producto agregado al carrito
            </div>
        </main>
    );
}
