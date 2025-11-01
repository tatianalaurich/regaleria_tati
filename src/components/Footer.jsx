import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import "./Footer.css";

function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="footer">
        <div className="footer-content">
            <section className="footer-section" aria-labelledby="titulo-contacto">
            <h3 id="titulo-contacto">Contacto</h3>
            <address className="footer-address">
                <a href="tel:3416232315" className="footer-link">
                📞 3416232315
                </a>
                <a
                href="https://www.google.com/maps/place/Regaleria+Tati/@-32.9813944,-60.6328918,18z/data=!4m14!1m7!3m6!1s0x95b7ab4222f3eca7:0x2769c09827c645a7!2sRegaleria+Tati!8m2!3d-32.9812985!4d-60.6328528!16s%2Fg%2F11vy6w3t62!3m5!1s0x95b7ab4222f3eca7:0x2769c09827c645a7!8m2!3d-32.9812985!4d-60.6328528!16s%2Fg%2F11vy6w3t62?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-link"
                >
                📍 Bv. Seguí 120, Rosario, Santa Fe
                </a>
            </address>
            </section>

            <section className="footer-section" aria-labelledby="titulo-redes">
            <h3 id="titulo-redes">Redes sociales</h3>
            <div className="footer-socials">
                <a
                href="https://www.instagram.com/regaleriatati/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link instagram"
                aria-label="Abrir Instagram de Regalería Tati"
                title="Instagram"
                >
                <FaInstagram />
                <span>Instagram</span>
                </a>

                <a
                href="https://wa.me/3416232315"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link whatsapp"
                aria-label="Enviar WhatsApp a Regalería Tati"
                title="WhatsApp"
                >
                <FaWhatsapp />
                <span>WhatsApp</span>
                </a>
            </div>
            </section>
        </div>

        <div className="footer-bottom">
            © {year} Regalería Tati — Todos los derechos reservados
        </div>
        </footer>
    );
}

export default Footer;

