import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function CartWidget() {
    const { count } = useCart();

    return (
        <Link
        to="/carrito"
        className="cartw"
        aria-label={`Carrito${count ? `, ${count} producto${count > 1 ? "s" : ""}` : ""}`}
        >
        <span className="cartw-icon" aria-hidden="true">🛒</span>
        <span className="cartw-count" aria-hidden="true">{count}</span>
        </Link>
    );
    }
export default CartWidget;

