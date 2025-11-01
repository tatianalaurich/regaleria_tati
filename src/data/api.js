import { db } from "../firebase";
import {
    collection, getDocs, getDoc, doc, query, where,
    addDoc, serverTimestamp,
} from "firebase/firestore";

const COL = "Products";

export async function getProducts() {
    const snap = await getDocs(collection(db, COL));
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getProductsByCategory(categoryId) {
    const q = query(collection(db, COL), where("category", "==", categoryId));
    const snap = await getDocs(q);
    return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getProductById(id) {
    const ref = doc(db, COL, id);
    const snap = await getDoc(ref);
    return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export async function createOrder({ buyer, items, total }) {
    const ref = await addDoc(collection(db, "orders"), {
        buyer, items, total, createdAt: serverTimestamp(),
    });
    return ref.id;
}
