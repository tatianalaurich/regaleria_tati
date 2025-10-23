import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import "./cart.css";

export default function CartPage() {
    const { items, increase, decrease, setQty, removeItem, clear, total } = useCart();
    const fmt = (n) => n.toLocaleString("es-AR");
    if (items.length === 0) {
        return (
        <main className="cart">
            <h1 className="cart-title">tu carrito</h1>
            <p className="cart-empty">Tu carrito está vacío.</p>
            <Link to="/" className="cart-cta">Ir al catálogo</Link>
        </main>
        );
    }
    return (
        <main className="cart">
        <h1 className="cart-title">tu carrito</h1>
        <div className="cart-list">
            {items.map((p) => (
            <article key={p.id} className="cart-item">
                <img src={p.img} alt={p.title} className="cart-thumb" />
                <div className="cart-info">
                <h3 className="cart-name">{p.title}</h3>
                <div className="cart-price">$ {fmt(p.price)}</div>
                <div className="cart-qty">
                    <button onClick={() => decrease(p.id)} aria-label="Restar">−</button>
                    <input
                    type="number"
                    min="1"
                    value={p.qty}
                    onChange={(e) => setQty(p.id, Math.max(1, Number(e.target.value || 1)))}
                    />
                    <button onClick={() => increase(p.id)} aria-label="Sumar">+</button>
                </div>
                <div className="cart-subtotal">
                    Subtotal: <strong>$ {fmt(p.price * p.qty)}</strong>
                </div>
                <button className="cart-remove" onClick={() => removeItem(p.id)}>
                    Quitar
                </button>
                </div>
            </article>
            ))}
        </div>
        <div className="cart-summary">
            <div className="cart-total">
            Total: <strong>$ {fmt(total)}</strong>
            </div>
            <div className="cart-actions">
                <button className="cart-clear" onClick={clear}>Vaciar carrito</button>
                <Link to="/checkout" className="cart-pay" style={{ textDecoration: "none", display: "inline-block" }}>
                    Finalizar compra
                </Link>
            </div>
        </div>
        </main>
    );
}
