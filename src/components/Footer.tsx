export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Links */}
        <div className="footer-links">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/cookie-policy">Informativa Cookie</a>
        </div>

        {/* Center copyright */}
        <span className="footer-center">© 2025 Sabrina's Bakery</span>

        {/* Social icons */}
        <div className="footer-social">
          <a href="https://instagram.com/" target="_blank" rel="noreferrer">
            <img src="../asset/icons/instagram.svg" alt="Instagram" />
          </a>
          <a href="https://facebook.com/" target="_blank" rel="noreferrer">
            <img src="../asset/icons/facebook.svg" alt="Facebook" />
          </a>
          <a href="https://pinterest.com/" target="_blank" rel="noreferrer">
            <img src="../asset/icons/pinterest.svg" alt="Pinterest" />
          </a>
          <a href="https://tiktok.com/" target="_blank" rel="noreferrer">
            <img src="../asset/icons/tt.svg" alt="TikTok" />
          </a>
        </div>
      </div>
    </footer>
  );
}
