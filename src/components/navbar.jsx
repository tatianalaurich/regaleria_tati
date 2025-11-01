import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import CartWidget from "./cartwidget.jsx";
import "./navbar.css";
import "./cartwidget.css"; 

const CATEGORIAS = [
    { slug: "mates", label: "Mates" },
    { slug: "portaespiral", label: "Portaespiral" },
    { slug: "portalentes", label: "Portalentes" },
    { slug: "chaulatasx2", label: "Chaulatas x2" },
    { slug: "chaulata", label: "Chaulata" },
];

function NavBar() {
    const location = useLocation();
    const isCategorias = location.pathname.startsWith("/category/");
    const [hidden, setHidden] = useState(false);
    const lastYRef = useRef(0);
    const [open, setOpen] = useState(false);
    const [prodOpen, setProdOpen] = useState(false);
    useEffect(() => {
        const onScroll = () => {
        const y = window.scrollY;
        setHidden(y > 10 && y > lastYRef.current);
        lastYRef.current = y;
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    useEffect(() => {
        setOpen(false);
        setProdOpen(false);
    }, [location.pathname]);
    const closeAll = () => {
        setOpen(false);
        setProdOpen(false);
    };
    return (
        <header className={`navbar ${hidden ? "navbar--hidden" : ""}`}>
        <Link to="/" className="navbar-logo" onClick={closeAll}>
            <img src="/logotati.png" alt="Regalería Tati" />
        </Link>
        <button
            className="menu-toggle"
            aria-label="Abrir menú"
            aria-expanded={open}
            aria-controls="primary-nav"
            onClick={() => setOpen(o => !o)}
        >
            ☰
        </button>
        <nav id="primary-nav" className={`navbar-links ${open ? "open" : ""}`}>
            <NavLink to="/" end onClick={closeAll}>Inicio</NavLink>
            <div
            className={`nav-item dropdown ${prodOpen ? "open" : ""}`}
            onMouseEnter={() => setProdOpen(true)}
            onMouseLeave={() => setProdOpen(false)}
            >
            <button
                className={`dropdown-trigger ${isCategorias ? "active" : ""}`}
                aria-haspopup="true"
                aria-expanded={prodOpen}
                onClick={() => setProdOpen(v => !v)}
                onKeyDown={(e) => { if (e.key === "Escape") setProdOpen(false); }}
            >
                Productos ▾
            </button>
            <div className="dropdown-menu" role="menu">
                {CATEGORIAS.map(c => (
                <NavLink
                    key={c.slug}
                    to={`/category/${c.slug}`}
                    role="menuitem"
                    onClick={closeAll}
                >
                    {c.label}
                </NavLink>
                ))}
            </div>
            </div>
            <NavLink to="/carrito" onClick={closeAll}>Carrito</NavLink>
        </nav>
        <CartWidget />
        </header>
    );
}

export default NavBar;