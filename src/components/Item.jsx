import { Link } from "react-router-dom";

export default function Item({ item }) {
    const title = item.title || "Producto de Regalería Tati";
    const price = Number(item.price ?? 0).toLocaleString("es-AR");
    const imgSrc = item.img || "/placeholder.png";

    return (
        <article className="product-card">
        <img
            src={imgSrc}
            alt={title}
            className="product-img"
            loading="lazy"
            decoding="async"
            width="320"
            height="320"
        />
        <div className="product-info">
            <h3>{title}</h3>
            <p className="product-price">${price}</p>
            <Link
            to={`/item/${item.id}`}
            className="product-btn"
            aria-label={`Ver detalle de ${title}`}
            >
            Ver detalle
            </Link>
        </div>
        </article>
    );
}
