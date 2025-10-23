import { FaCreditCard, FaBicycle, FaGift } from "react-icons/fa";
import "./beneficios.css";

function Beneficios() {
    return (
        <section className="beneficios" aria-label="beneficios">
        <div className="beneficios-interno">
            <div className="beneficio">
            <FaCreditCard className="icono-beneficio" />
            <h3 className="titulo-beneficio">Cuotas</h3>
            <p className="texto-beneficio">hasta 3 con tarjeta de crédito</p>
            </div>

            <div className="beneficio">
            <FaBicycle className="icono-beneficio" />
            <h3 className="titulo-beneficio">Hacemos envíos</h3>
            <p className="texto-beneficio">comprá sin salir de tu casa</p>
            </div>

            <div className="beneficio">
            <FaGift className="icono-beneficio" />
            <h3 className="titulo-beneficio">Regalos</h3>
            <p className="texto-beneficio">incluimos envoltorio y moño para el regalo</p>
            </div>
        </div>
        </section>
    );
}
export default Beneficios;