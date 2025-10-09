import { PRODUCTS } from "./products";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export async function getProducts() {
    await delay(600);
    return PRODUCTS;
}

export async function getProductsByCategory(categoryId) {
    await delay(600);
    return PRODUCTS.filter((p) => p.category === categoryId);
}

export async function getProductById(id) {
    await delay(600);
    return PRODUCTS.find((p) => p.id === id);
}
