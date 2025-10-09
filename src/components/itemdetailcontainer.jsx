import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductById } from "../data/api.js";
import "./itemdetailcontainer.css";

function ItemDetailContainer() {
    const { productId } = useParams();
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);

useEffect(() => {
    setLoading(true);
    getProductById(productId).then(data => {
        setItem(data || null);
    }).finally(() => setLoading(false));
    }, [productId]);

    if (loading) return <main className="detail"><p>Cargando producto...</p></main>;
    if (!item) return <main className="detail"><p>No se encontró el producto.</p><Link to="/">Volver</Link></main>;

return (
    <main className="detail">
        <div className="img-wrap">
            <img src={item.img} alt={item.title} />
        </div>
        <div className="info">
            <Link className="back" to="/">← Volver</Link>
            <h1>{item.title}</h1>
            <p className="desc">{item.desc}</p>
            <button className="btn-primary">Agregar al carrito</button>
            <p className="price">${item.price.toLocaleString("es-AR")}</p>
        </div>
    </main>
    );
}
export default ItemDetailContainer;