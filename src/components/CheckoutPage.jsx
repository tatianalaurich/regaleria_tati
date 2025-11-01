import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { createOrder } from "../data/api.js";
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

    const [sending, setSending] = useState(false);
    const [orderId, setOrderId] = useState("");
    const [error, setError] = useState("");

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setOrderId("");

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

        try {
        setSending(true);

        const buyer = {
            nombre: form.nombre,
            email: form.email,
            celular: form.celular,
            pago: form.pago,
            entrega: form.entrega,
            direccion: isEnvio ? form.direccion : "",
            notas: form.notas || "",
        };

        const lineItems = items.map((p) => ({
            id: p.id,
            title: p.title,
            price: p.price,
            qty: p.qty,
        }));

        const id = await createOrder({ buyer, items: lineItems, total });
        setOrderId(id);

        const tienda = "tatianalaurich@hotmail.com";
        const asunto = encodeURIComponent(`Pedido - ${form.nombre} (Orden ${id})`);
        const cuerpo = encodeURIComponent(
    `Hola, dejo mi pedido:
    Datos:
    - Nombre completo: ${form.nombre}
    - Email: ${form.email}
    - Celular: ${form.celular}
    - Forma de pago: ${form.pago}
    - Entrega: ${form.entrega}${isEnvio ? ` (Dirección: ${form.direccion})` : " (Retiro en tienda o encuentro)"}
    - Notas: ${form.notas || "-"}

    Productos:
    ${resumen}

    Total: $${fmt(total)}
    ID de orden (interno): ${id}
    ¡Gracias!`
        );
        window.location.href = `mailto:${tienda}?subject=${asunto}&body=${cuerpo}`;

        setTimeout(clear, 500);
        } catch (err) {
        console.error(err);
        setError("No se pudo generar la orden. Intentá nuevamente en unos minutos.");
        } finally {
        setSending(false);
        }
    };

    return (
        <main className="checkout" aria-busy={sending}>
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

                {orderId && (
                <p style={{ marginTop: ".5rem" }}>
                    ✅ <strong>Orden generada:</strong> <code>{orderId}</code>
                </p>
                )}
                {error && (
                <p style={{ color: "#c00", marginTop: ".5rem" }}>{error}</p>
                )}
            </section>

            <form className="checkout-form" onSubmit={handleSubmit}>
                <h2>tus datos</h2>

                <label>
                Nombre completo *
                <input
                    name="nombre"
                    value={form.nombre}
                    onChange={onChange}
                    required
                    placeholder="Ej: María Pérez"
                    autoComplete="name"
                    disabled={sending}
                />
                </label>

                <label>
                Email *
                <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    required
                    placeholder="tu@email.com"
                    autoComplete="email"
                    disabled={sending}
                />
                </label>

                <label>
                Celular *
                <input
                    type="tel"
                    name="celular"
                    value={form.celular}
                    onChange={onChange}
                    required
                    placeholder="Ej: 341 123 4567"
                    autoComplete="tel"
                    disabled={sending}
                />
                </label>

                <label>
                Forma de pago
                <select name="pago" value={form.pago} onChange={onChange} disabled={sending}>
                    <option value="efectivo">Efectivo</option>
                    <option value="transferencia">Transferencia</option>
                    <option value="tarjeta 3 cuotas (con interés)">Tarjeta 3 cuotas (con interés)</option>
                    <option value="a coordinar luego">A coordinar luego</option>
                </select>
                </label>

                <fieldset className="entrega" disabled={sending}>
                <legend>entrega</legend>
                <div className="entrega-opciones">
                    <label className="radio">
                    <input
                        type="radio"
                        name="entrega"
                        value="retiro"
                        checked={form.entrega === "retiro"}
                        onChange={onChange}
                    />
                    Retiro en tienda
                    </label>

                    <label className="radio">
                    <input
                        type="radio"
                        name="entrega"
                        value="envio"
                        checked={form.entrega === "envio"}
                        onChange={onChange}
                    />
                    Envío a domicilio
                    </label>

                    <label className="radio">
                    <input
                        type="radio"
                        name="entrega"
                        value="encuentro"
                        checked={form.entrega === "encuentro"}
                        onChange={onChange}
                    />
                    Punto de encuentro
                    </label>
                </div>
                </fieldset>

                {isEnvio && (
                <label>
                    Dirección (calle, número, intersección de calles)
                    <input
                    name="direccion"
                    value={form.direccion}
                    onChange={onChange}
                    required={isEnvio}
                    placeholder="Ej: San Martín 1234, entre X e Y"
                    disabled={sending}
                    />
                </label>
                )}

                <label style={{ gridColumn: "1 / -1" }}>
                Notas (opcional)
                <textarea
                    name="notas"
                    rows="3"
                    placeholder="Ej: Es un regalo, agregar tarjetita con el nombre..."
                    value={form.notas}
                    onChange={onChange}
                    disabled={sending}
                />
                </label>

                <button type="submit" className="checkout-send" disabled={sending}>
                {sending ? "Registrando pedido..." : "Registrar y enviar pedido"}
                </button>
                <p className="small">
                * Guardamos tu orden en nuestro sistema y te contactamos por WhatsApp/Email.
                </p>
            </form>
            </>
        )}
        </main>
    );
}
