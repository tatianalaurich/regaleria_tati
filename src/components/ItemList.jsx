import Item from "./Item.jsx";

export default function ItemList({ items }) {
    return (
        <div className="product-grid">
        {items.map((it) => (
            <Item key={it.id} item={it} />
        ))}
        </div>
    );
}
