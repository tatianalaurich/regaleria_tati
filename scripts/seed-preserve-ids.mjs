import { setDoc, doc } from "firebase/firestore";
import { db } from "../src/firebase.js";
import { PRODUCTS } from "../src/data/products.js";

for (const p of PRODUCTS) {
    const { id, ...data } = p;
    await setDoc(doc(db, "Products", id), data);
    console.log("Subido:", id, data.title);
}
console.log("Listo ✅");

