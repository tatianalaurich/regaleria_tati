import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar.jsx";
import ItemListContainer from "./components/itemlistcontainer.jsx";
import ItemDetailContainer from "./components/itemdetailcontainer.jsx";
import NotFound from "./components/notfound.jsx";
import Footer from "./components/Footer.jsx";
import Beneficios from "./components/Beneficios.jsx";
import CartPage from "./components/CartPage.jsx";
import CheckoutPage from "./components/CheckoutPage.jsx";
import "./App.css";
import Seed from "./dev/Seed.jsx";

export default function App() {
  return (
    <>
      <NavBar />
      <main>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Beneficios />
              <ItemListContainer greeting="¡Bienvenidos al catálogo de Regalería Tati!" />
            </>
          }
        />
        <Route
          path="/category/:categoryId"
          element={<ItemListContainer greeting="Catálogo por categoría" />}
        />
        <Route path="/item/:productId" element={<ItemDetailContainer />} />
        <Route path="/carrito" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/seed" element={<Seed />} />
      </Routes>
      </main>
      <Footer />
    </>
  );
}





