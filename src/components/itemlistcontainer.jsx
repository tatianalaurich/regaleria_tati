import { useEffect, useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { getProducts, getProductsByCategory } from "../data/api.js";
import BuscadorProductos from "./BuscadorProductos.jsx";
import "./itemlistcontainer.css";

function ItemListContainer({ greeting }) {
    const { categoryId } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [q, setQ] = useState(""); // 🔎 

    useEffect(() => {
        setLoading(true);
        const fetcher = categoryId ? getProductsByCategory(categoryId) : getProducts();
        fetcher
        .then((data) => setItems(data || []))
        .finally(() => setLoading(false));
    }, [categoryId]);

    const filtrados = useMemo(() => {
        const norm = (s) => (s || "").toString().toLowerCase();
        const query = norm(q);
        if (!query) return items;
        return items.filter((p) => norm(p.title).includes(query) || norm(p.desc).includes(query));
    }, [items, q]);

    return (
        <main className="item-container">
        <h1 className="greeting">{greeting}</h1>
        {categoryId && (
            <p className="category-label">
            Categoría: <strong>{categoryId}</strong>
            </p>
        )}

        <BuscadorProductos onBuscar={setQ} placeholder="Buscar por nombre o descripción..." />

        {loading ? (
            <p className="loading-text">Cargando productos...</p>
        ) : filtrados.length === 0 ? (
            <p className="no-products">
            {q ? <>No encontramos productos para “{q}”.</> : <>No hay productos para mostrar.</>}
            </p>
        ) : (
            <div className="product-grid">
            {filtrados.map((item) => (
                <article className="product-card" key={item.id}>
                <img src={item.img} alt={item.title} className="product-img" />
                <div className="product-info">
                    <h3>{item.title}</h3>
                    <p className="product-price">
                    ${item.price.toLocaleString("es-AR")}
                    </p>
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
export default ItemListContainer;