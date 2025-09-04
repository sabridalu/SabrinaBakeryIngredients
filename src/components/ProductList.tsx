import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import SearchBar from "./SearchBar";
import ProductCard from "./ProductCard";
import type { Product } from "../data/products"; // puoi sostituire con un'interfaccia locale
import "../style.css";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");

  // Recupera i prodotti dal db
  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase.from("product").select("*");
      if (error) {
        console.error("Errore Supabase:", error.message);
      } else {
        setProducts(data as Product[]);
      }
    }
    fetchProducts();
  }, []);

  // Filtra i prodotti
  const filtered = products.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.allergen?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="p-6">
      <div className="product-list-header">
        <h1 className="font-candy text-main text-3xl">I nostri prodotti</h1>
        <SearchBar query={query} setQuery={setQuery} />
      </div>

      <div className="product-grid">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
