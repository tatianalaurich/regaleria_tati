import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProducts, getProductsByCategory } from "../data/api.js";
import "./itemlistcontainer.css";

function ItemListContainer({ greeting }) {
    const { categoryId } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

useEffect(() => {
    setLoading(true);
    const fetcher = categoryId ? getProductsByCategory(categoryId) : getProducts();
    fetcher.then(data => {
        setItems(data);
    }).finally(() => setLoading(false));
}, [categoryId]);

return (
    <main className="item-container">
        <h1>{greeting}</h1>
        {categoryId && <p className="muted">Categoría: <strong>{categoryId}</strong></p>}
        {loading ? (
        <p>Cargando productos...</p>
    ) : items.length === 0 ? (
        <p>No hay productos para mostrar.</p>
    ) : (
        <div className="grid">
            {items.map((item) => (
                <article className="card" key={item.id}>
                    <img src={item.img} alt={item.title} />
                    <div className="card-body">
                        <h3 className="title">{item.title}</h3>
                        <p className="price">
                            ${item.price.toLocaleString("es-AR")}
                        </p>
                        <Link className="btn" to={`/item/${item.id}`}>
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