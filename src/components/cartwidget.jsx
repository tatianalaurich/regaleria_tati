function CartWidget() {
    const count = 0;
    return (
        <button
            aria-label="Carrito"
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: ".5rem",
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: ".4rem .7rem",
                cursor: "pointer",
            }}
        >
        🛒 <span style={{ fontWeight: 700 }}>{count}</span>
    </button>
    );
}
export default CartWidget;