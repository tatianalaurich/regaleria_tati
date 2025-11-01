# Regalería Tati — Entrega 3 Final

## Stack
- React + React Router
- Context API (carrito)
- Firebase Firestore (productos y órdenes)
- Vite

## Funcionalidades
- Listado dinámico desde Firestore (colección `Products`)
- Detalle de producto con `ItemCount` y validación de stock
- Carrito con cantidades, subtotales y total
- Checkout: registra orden en Firestore (colección `orders`) y muestra ID
- Buscador por nombre/descripción
- Ruteo: home, categorías, item, carrito, checkout, 404

## Estructura
- `src/components/ItemListContainer.jsx` (contenedor)
- `src/components/ItemList.jsx` y `src/components/Item.jsx` (presentación)
- `src/components/ItemDetailContainer.jsx`
- `src/context/CartContext.jsx`
- `src/data/api.js` (Firestore CRUD)
- `src/firebase.js` (config)

## Cómo correr
```bash
npm install
npm run dev


## Checklist final

- Firebase productos (OK, colección `Products`)
- Listado y detalle (OK)
- Separación contenedor/presentación (añadido `ItemList` + `Item`)
- ItemCount con validaciones (OK en detalle)
- Router por secciones (OK)
- Context cart (OK)
- Cart con cantidades/subtotales/total (OK)
- CartWidget con contador (OK)
- Orden en Firestore en Checkout
- Renderizado condicional (OK)
- README.md*