import { useState } from "react";
import products from "../data/products";
import SearchBar from "./SearchBar";
import ProductCard from "./ProductCard";
import type { Product } from "../data/products";
import "../style.css";

export default function ProductList() {
  const [query, setQuery] = useState("");

  const filtered = products.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.allergen.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6">
      {/* Header titolo + barra ricerca */}
      <div className="product-list-header">
        <h1 className="font-candy text-main text-3xl">
          I nostri prodotti
        </h1>
        <SearchBar query={query} setQuery={setQuery} />
      </div>

      {/* Grid prodotti */}
      <div className="product-grid">
        {filtered.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
