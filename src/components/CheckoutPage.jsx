import { useMemo, useState } from "react";
import { Link } from "react-router-dom"; 
import { useCart } from "../context/CartContext.jsx";
import "./checkout.css";

export default function CheckoutPage() {
    const { items, total, clear } = useCart();
    const fmt = (n) => n.toLocaleString("es-AR");
    const [form, setForm] = useState({
        nombre: "",
        email: "",
        celular: "",
        pago: "efectivo",
        entrega: "retiro",
        direccion: "",
        notas: "",
    });
    const onChange = (e) => {
        const { name, value } = e.target;
        setForm((f) => ({ ...f, [name]: value }));
    };
    const isEnvio = form.entrega === "envio";
    const resumen = useMemo(() => {
        if (!items?.length) return "Sin productos.";
        return items
        .map((p, i) => `${i + 1}. ${p.title} x${p.qty} - $${fmt(p.price * p.qty)}`)
        .join("\n");
    }, [items]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.nombre || !form.celular || !form.email) {
        alert("Completá nombre, celular y email.");
        return;
        }
        if (isEnvio && !form.direccion) {
        alert("Ingresá la dirección para el envío.");
        return;
        }
        if (!items.length) {
        alert("Tu carrito está vacío.");
        return;
        }
        const tienda = "tatianalaurich@hotmail.com";
        const asunto = encodeURIComponent(`Pedido - ${form.nombre}`);
        const cuerpo = encodeURIComponent(
    `Hola, dejo mi pedido:
    Datos:
    - Nombre completo: ${form.nombre}
    - Email: ${form.email}
    - Celular: ${form.celular}
    - Forma de pago: ${form.pago}
    - Entrega: ${form.entrega}${isEnvio ? ` (Dirección: ${form.direccion})` : " (Retiro en tienda)"}
    - Notas: ${form.notas || "-"}
    Productos:
    ${resumen}
    Total: $${fmt(total)}
    ¡Gracias!`
        );

        window.location.href = `mailto:${tienda}?subject=${asunto}&body=${cuerpo}`;
    setTimeout(clear, 500);
    };
    return (
        <main className="checkout">
        <h1 className="checkout-title">finalizar compra</h1>
            <div className="checkout-nav">
                <Link to="/carrito" className="checkout-back">← volver al carrito</Link>
            </div>
        {!items.length ? (
            <p className="checkout-empty">Tu carrito está vacío.</p>
        ) : (
            <>
            <section className="checkout-summary">
                <h2>tu pedido</h2>
                <pre className="checkout-resumen">{resumen}</pre>
                <div className="checkout-total">Total: <strong>$ {fmt(total)}</strong></div>
            </section>
            <form className="checkout-form" onSubmit={handleSubmit}>
                <h2>tus datos</h2>
                <label>
                Nombre completo *
                <input name="nombre" value={form.nombre} onChange={onChange} required />
                </label>
                <label>
                Email *
                <input type="email" name="email" value={form.email} onChange={onChange} required />
                </label>
                <label>
                Celular *
                <input name="celular" value={form.celular} onChange={onChange} required />
                </label>
                <label>
                Forma de pago
                <select name="pago" value={form.pago} onChange={onChange}>
                    <option value="efectivo">efectivo</option>
                    <option value="transferencia">transferencia</option>
                    <option value="tarjeta 3 cuotas (con interés)">tarjeta 3 cuotas (con interés)</option>
                    <option value="a coordinar luego">a coordinar luego</option>
                </select>
                </label>
                <fieldset className="entrega">
                <legend>entrega</legend>
                <label className="radio">
                    <input
                    type="radio"
                    name="entrega"
                    value="retiro"
                    checked={form.entrega === "retiro"}
                    onChange={onChange}
                    />
                    retiro en tienda
                </label>
                <label className="radio">
                    <input
                    type="radio"
                    name="entrega"
                    value="envio"
                    checked={form.entrega === "envio"}
                    onChange={onChange}
                    />
                    envío a domicilio
                </label>
                </fieldset>
                {isEnvio && (
                <label>
                    Dirección (calle, número, ciudad)
                    <input name="direccion" value={form.direccion} onChange={onChange} />
                </label>
                )}
                <label>
                Notas (opcional)
                <textarea name="notas" value={form.notas} onChange={onChange} rows="3" />
                </label>
                <button type="submit" className="checkout-send">Enviar pedido por email</button>
                <p className="small">* No se procesa el pago. Solo recibimos tu pedido por correo y te confirmamos por WhatsApp/email.</p>
            </form>
            </>
        )}
        </main>
    );
}
