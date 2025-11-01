import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { getProducts, getProductsByCategory } from "../data/api.js";
import BuscadorProductos from "./BuscadorProductos.jsx";
import ItemList from "./ItemList.jsx";
import "./itemlistcontainer.css";

const LABELS = {
    mates: "Mates",
    portaespiral: "Portaespiral",
    portalentes: "Portalentes",
    chaulatasx2: "Chaulatas x2",
    chaulata: "Chaulata",
};

export default function ItemListContainer({ greeting }) {
    const { categoryId } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [q, setQ] = useState("");

    useEffect(() => {
        setLoading(true);
        const fetcher = categoryId ? getProductsByCategory(categoryId) : getProducts();
        fetcher.then((data) => setItems(data || [])).finally(() => setLoading(false));
    }, [categoryId]);

    const filtrados = useMemo(() => {
        const norm = (s) => (s ?? "").toString().toLowerCase();
        const query = norm(q.trim());
        if (!query) return items;
        return items.filter(
        (p) => norm(p.title).includes(query) || norm(p.desc).includes(query)
        );
    }, [items, q]);

    return (
        <main className="item-container">
        <h1 className="greeting">{greeting}</h1>

        {categoryId && (
            <p className="category-label">
            Categoría: <strong>{LABELS[categoryId] ?? categoryId}</strong>
            </p>
        )}

        <BuscadorProductos
            onBuscar={setQ}
            placeholder="Buscar por nombre o descripción..."
        />

        {loading ? (
        <p className="loading-text" role="status" aria-live="polite">Cargando productos...</p>
        ) : filtrados.length === 0 ? (
        <p className="no-products">
            {q ? <>No encontramos productos para “{q}”.</> : <>No hay productos para mostrar.</>}
        </p>
        ) : (
        <ItemList items={filtrados} />
        )}
        </main>
    );
}
