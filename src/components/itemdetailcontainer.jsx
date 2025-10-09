import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../data/api.js";
import "./itemdetailcontainer.css";

export default function ItemDetailContainer() {
    const { productId } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        getProductById(productId)
        .then((data) => setItem(data || null))
        .finally(() => setLoading(false));
    }, [productId]);

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
            <button className="btn-primary">Agregar al carrito</button>
            </div>
        </div>
        </main>
    );
}
