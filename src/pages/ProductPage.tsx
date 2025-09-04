import { useParams, Link } from "react-router-dom";
import products, { Product } from "../data/products";
import "../style.css";

export default function ProductPage() {   // 👈 rinominato
  const { id } = useParams<{ id: string }>();
  const product = products.find((p: Product) => p.id.toString() === id);

  if (!product) {
    return <p className="text-center text-text-muted">Prodotto non trovato.</p>;
  }

  return (
    <div className="product-detail-card">
      <h1 className="product-detail-title">{product.name}</h1>

      <div className="product-detail-info">
        <p><strong>Ingredienti:</strong></p>
        <ul className="product-list">
          {product.ingredients.split(",").map((item, i) => (
            <li key={i}>{item.trim()}</li>
          ))}
        </ul>

        <p><strong>Allergeni:</strong></p>
        <ul className="product-list">
          {product.allergen.split(",").map((item, i) => (
            <li key={i}>{item.trim()}</li>
          ))}
        </ul>

        <p><strong>Descrizione:</strong></p>
        <p>{product.desc}</p>

        <p><strong>Conservazione:</strong></p>
        <p>{product.conservation}</p>

        <p><strong>Note:</strong></p>
        <p>{product.note}</p>

        <p className="product-detail-price"><strong>Prezzo:</strong> {product.price} €</p>
      </div>

      <Link to="/" className="btn-back">← Torna ai prodotti</Link>
    </div>
  );
}
