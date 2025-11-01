import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { PRODUCTS } from "../data/products";

export default function Seed() {
    const run = async () => {
        for (const p of PRODUCTS) {
        const { id, ...data } = p;
        await setDoc(doc(db, "Products", id), data);
        console.log("Subido:", id);
        }
        alert("Listo ✅");
    };
    return (
        <main style={{padding: 20}}>
        <h1>Sembrar Products</h1>
        <button onClick={run}>Subir a Firestore</button>
        <p>Quitá este componente después de sembrar.</p>
        </main>
    );
}
