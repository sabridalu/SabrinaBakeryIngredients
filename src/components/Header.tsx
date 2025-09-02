import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="header-link">
        <img
          src="/asset/logo.jpeg"
          alt="Logo"
          className="header-logo"
        />
        <div className="header-text">
          <h1 className="header-title">Sabrina's Bakery Ingredients</h1>
          <h2 className="header-sub-title">Il profumo di casa in ogni morso</h2>
        </div>
      </Link>
    </header>
  );
}
