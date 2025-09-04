import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import SearchBar from "./SearchBar";
import ProductCard from "./ProductCard";
import type { Product } from "../data/products";
import "../style.css";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all"); // 👈 categoria selezionata

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("product")
        .select("*")
        .neq("category", "memories") // ❌ esclude i box
        .order("name", { ascending: true });

      if (error) {
        console.error("Errore Supabase:", error.message);
      } else {
        setProducts(data as Product[]);
      }
    }
    fetchProducts();
  }, []);

  // Filtraggio prodotti
  const filtered = products.filter((p) => {
    const q = query.toLowerCase();

    // 🔎 filtro ricerca
    const matchesQuery =
      p.name.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.allergen?.toLowerCase().includes(q);

    // 🏷 filtro categoria
    const matchesCategory =
      category === "all" || p.category?.toLowerCase() === category;

    return matchesQuery && matchesCategory;
  });

  return (
    <div className="p-6">
      {/* Titolo + searchbar */}
      <div className="product-list-header">
        <h1 className="font-candy text-main text-3xl">I nostri prodotti</h1>
        <SearchBar query={query} setQuery={setQuery} />
      </div>

      {/* Pulsanti categoria */}
      <div className="category-buttons">
        {["all", "mini", "veggy", "cookies", "classics"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`category-btn ${
              category === cat ? "active" : ""
            }`}
          >
            {cat === "all" ? "Tutti" : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Grid prodotti */}
      <div className="product-grid">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
