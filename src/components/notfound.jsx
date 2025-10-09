import { Link } from "react-router-dom";

function NotFound() {
    return (
        <main style={{ padding: "2rem", textAlign: "center" }}>
        <h1>404</h1>
        <p>Página no encontrada</p>
        <Link to="/" style={{ textDecoration: "none", color: "#d63384" }}>
            Volver al inicio
        </Link>
    </main>
    );
}
export default NotFound;