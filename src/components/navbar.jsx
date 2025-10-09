import { Link, NavLink } from "react-router-dom";
import CartWidget from "./cartwidget.jsx";
import "./navbar.css";

function NavBar() {
    return (
        <header className="navbar">
            <Link to="/" className="navbar-logo">
                <img src="/logotati.png" alt="Logo tienda Regalería Tati" />
                <strong>Regalería Tati</strong>
            </Link>
        <nav className="navbar-links">
            <NavLink to="/category/mates">Mates</NavLink>
            <NavLink to="/category/portaespiral">Portaespiral</NavLink>
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/category/portalentes">Portalentes</NavLink>
            <NavLink to="/category/chaulatasx2">Chaulatas x2</NavLink>
            <NavLink to="/category/chaulata">Chaulata</NavLink>
        </nav>
        <CartWidget />
        </header>
    );
}
export default NavBar;
