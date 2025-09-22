import CartWidget from "./cartwidget";

function NavBar() {
    return (
        <header
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                padding: "1rem 1.5rem",
                borderBottom: "1px solid #eee",
                position: "sticky",
                top: 0,
                background: "#f9cfcfff",
            }}
        >
        <a href="#" style={{ display: "flex", alignItems: "center", gap: ".75rem", textDecoration: "none", color: "inherit" }}>
            <img src="./logotati.png" alt="Logo tienda Regaleria Tati" style={{ height: 100, width: "auto" }} />
            <strong>Regalería Tati</strong>
        </a>

        <nav style={{ display: "flex", gap: "1rem" }}>
            <a href="#" style={{ textDecoration: "none", color: "#333" }}>Home</a>
            <a href="#" style={{ textDecoration: "none", color: "#333" }}>Catálogo</a>
            <a href="#" style={{ textDecoration: "none", color: "#333" }}>Contacto</a>
        </nav>

    <CartWidget />
    </header>
    );
}
export default NavBar;