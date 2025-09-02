import { Link } from "react-router-dom";
import type { Product } from "../data/products";
import "../style.css";

export default function ProductCard({ product }: { product: Product }) {
  return (
<Link to={`/product/${product.id}`} className="product-card block no-underline">
      <img
        src={product.img}
        alt={product.name}
        className="product-card-img"
      />
      <div className="product-card-body">
        <h3 className="product-card-title">
          {product.name}
          <span className="text-accent">➝</span>
        </h3>
        <p className="product-card-desc">{product.desc}</p>
      </div>
    </Link>
  );
}
