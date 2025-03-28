import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
          <a href="/terms">Terms & Conditions</a>
        </div>
        <p className="footer-copy">&copy; {new Date().getFullYear()} Fresh Start. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
