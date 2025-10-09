import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar.jsx";
import ItemListContainer from "./components/itemlistcontainer.jsx";
import ItemDetailContainer from "./components/itemdetailcontainer.jsx";
import NotFound from "./components/notfound.jsx";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={<ItemListContainer greeting="¡Bienvenid@ al catálogo de Regalería Tati!" />}
        />
        <Route
          path="/category/:categoryId"
          element={<ItemListContainer greeting="Catálogo por categoría" />}
        />
        <Route
          path="/item/:productId"
          element={<ItemDetailContainer />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
export default App;




