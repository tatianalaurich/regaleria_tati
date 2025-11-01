import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <main style={{ minHeight: "60vh", padding: "2rem 1rem", textAlign: "center" }}>
        <h1>404</h1>
        <p>Página no encontrada</p>
        <Link to="/" style={{ color: "#d63384", fontWeight: 700 }}>Volver al inicio</Link>
        </main>
    );
}
