import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { getProducts, getProductsByCategory } from "../data/api.js";
import "./itemlistcontainer.css";

export default function ItemListContainer({ greeting }) {
    const { categoryId } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        const fetcher = categoryId ? getProductsByCategory(categoryId) : getProducts();
        fetcher
        .then((data) => setItems(data || []))
        .finally(() => setLoading(false));
    }, [categoryId]);

    return (
        <main className="item-container">
        <h1>{greeting}</h1>
        {categoryId && <p className="category-label">Categoría: <strong>{categoryId}</strong></p>}

        {loading ? (
            <p className="loading-text">Cargando productos...</p>
        ) : items.length === 0 ? (
            <p className="no-products">No hay productos para mostrar.</p>
        ) : (
            <div className="product-grid">
            {items.map((item) => (
                <article className="product-card" key={item.id}>
                <img src={item.img} alt={item.title} className="product-img" />
                <div className="product-info">
                    <h3>{item.title}</h3>
                    <p className="product-price">${item.price.toLocaleString("es-AR")}</p>
                    <Link to={`/item/${item.id}`} className="product-btn">
                    Ver detalle
                    </Link>
                </div>
                </article>
            ))}
            </div>
        )}
        </main>
    );
}
