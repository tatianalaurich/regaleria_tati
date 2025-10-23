import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function CartWidget() {
    const { count } = useCart();
    return (
        <Link to="/carrito" aria-label="Carrito" style={{ textDecoration: "none" }}>
        <button
            aria-hidden
            style={{
            display: "inline-flex",
            alignItems: "center",
            gap: ".5rem",
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: ".4rem .7rem",
            cursor: "pointer",
            fontSize: "18px",
            }}
        >
            🛒 <span style={{ fontWeight: 600 }}>{count}</span>
        </button>
        </Link>
    );
}
export default CartWidget;
