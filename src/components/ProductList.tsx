import { useEffect, useState, useRef, useEffect as useEff } from "react";
import { supabase } from "../lib/supabaseClient";
import SearchBar from "./SearchBar";
import ProductCard from "./ProductCard";
import type { Product } from "../data/products";
import "../style.css";

const FILTERS = [
  { label: "Tutti", value: "tutti" },
  { label: "Mini", value: "mini" },
  { label: "Veggy", value: "veggy" },
  { label: "Classici", value: "classics" },
  { label: "Brownies", value: "brownies" },
  { label: "Cookies", value: "cookies" },
];

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("tutti");
  const [showFilters, setShowFilters] = useState(false);
  const filtersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("product")
        .select("*")
        .neq("category", "memories")
        .order("name", { ascending: true });

      if (error) {
        console.error("Errore Supabase:", error.message);
      } else {
        setProducts(data as Product[]);
      }
    }
    fetchProducts();
  }, []);

  const filtered = products.filter((p) => {
    const q = query.toLowerCase();
    const matchesQuery =
      p.name.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.allergen?.toLowerCase().includes(q);

    const matchesFilter =
      activeFilter === "tutti" || p.category?.toLowerCase() === activeFilter;

    return matchesQuery && matchesFilter;
  });

  // chiuide i filtri se clicchi fuori dal pannello (utile su mobile)
useEffect(() => {
  function handleClickOutside(e: Event) {
    if (filtersRef.current && !filtersRef.current.contains(e.target as Node)) {
      setShowFilters(false);
    }
  }

  document.addEventListener("mousedown", handleClickOutside);
  document.addEventListener("touchstart", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
    document.removeEventListener("touchstart", handleClickOutside);
  };
}, []);


  return (
    <div className="p-6">
      <div className="product-list-header">
        <h1 className="font-candy text-main text-3xl">I nostri prodotti</h1>
        <SearchBar query={query} setQuery={setQuery} />
      </div>

      {/* Bottone filtri mobile */}
      <button
        className="filter-toggle-btn"
        onClick={() => setShowFilters((s) => !s)}
      >
        Filtri
      </button>

      
      <div
        ref={filtersRef}
        className={`category-buttons ${showFilters ? "open" : ""}`}
      >
        {FILTERS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => {
              setActiveFilter(value);
              setShowFilters(false);
            }}
            className={`category-btn ${activeFilter === value ? "active" : ""}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
