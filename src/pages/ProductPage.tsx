import { useParams, Link } from "react-router-dom";
import { Product } from "../data/products";
import "../style.css";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabaseClient";


export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from("product")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Errore Supabase:", error.message);
      } else {
        setProduct(data as Product);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  if (!product) {
    return <p className="text-center text-text-muted">Prodotto non trovato.</p>;
  }

  return (
    <div className="product-detail-card">
      <h1 className="product-detail-title">{product.name}</h1>

      {/* immagine corretta */}
      <div className="product-detail-img">
        <img src={product.img} alt={product.name} />
      </div>

      <div className="product-detail-info">
        <p><strong>Ingredienti:</strong></p>
        <ul className="product-list">
          {product.ingredients?.split(",").map((item, i) => (
            <li key={i}>{item.trim()}</li>
          ))}
        </ul>

        <p><strong>Allergeni:</strong></p>
        <ul className="product-list">
          {product.allergen?.split(",").map((item, i) => (
            <li key={i}>{item.trim()}</li>
          ))}
        </ul>

        <p><strong>Descrizione breve:</strong></p>
        <p>{product.desc}</p>

        <p><strong>Descrizione lunga:</strong></p>
        <p>{product.longdescription}</p>

        <p><strong>Conservazione:</strong></p>
        <p>{product.conservation}</p>

        <p><strong>Note:</strong></p>
        <p>{product.note}</p>

        <p className="product-detail-price">
          <strong>Prezzo:</strong> {product.price} €
        </p>
      </div>

      <Link to="/" className="btn-back">← Torna ai prodotti</Link>
    </div>
  );
}
