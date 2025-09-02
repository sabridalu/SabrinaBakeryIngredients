import { useState } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ProductCard from "./components/ProductCard";
import ProductModal from "./components/ProductModal";
import products, { Product } from "./data/products";
import { Route, Routes } from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductPage from "./pages/ProductPage";
import Footer from "./components/Footer";

function App() {
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.allergen.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-primary text-text-main font-candy">
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
     <Footer />

    </div>
  );

}

export default App;
