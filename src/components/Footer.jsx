import "./Footer.css";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer">
        <div className="footer-content">
            <div className="footer-section">
            <h3>Contacto</h3>
            <p>
                📞 <a href="tel:3416232315">3416232315</a><br />
                📍 <a
                href="https://www.google.com/maps/place/Regaleria+Tati/@-32.9813944,-60.6328918,18z/data=!4m14!1m7!3m6!1s0x95b7ab4222f3eca7:0x2769c09827c645a7!2sRegaleria+Tati!8m2!3d-32.9812985!4d-60.6328528!16s%2Fg%2F11vy6w3t62!3m5!1s0x95b7ab4222f3eca7:0x2769c09827c645a7!8m2!3d-32.9812985!4d-60.6328528!16s%2Fg%2F11vy6w3t62?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
                >
                Bv. Seguí 120, Rosario, Santa Fe
                </a>
            </p>
            </div>

            <div className="footer-section">
            <h3>Redes sociales</h3>
            <p>
                <a
                href="https://www.instagram.com/regaleriatati/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link instagram"
                aria-label="Instagram"
                >
                <FaInstagram size={32} style={{ marginRight: "9px" }} />
                </a>
                <a
                href="https://wa.me/3416232315"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link whatsapp"
                aria-label="WhatsApp"
                >
                <FaWhatsapp size={32} style={{ marginRight: "9px" }} />
                </a>
            </p>
            </div>

            </div>

            <div className="footer-bottom">
                © 2025 Regalería Tati — Todos los derechos reservados
            </div>
            </footer>
    );
}

export default Footer;
