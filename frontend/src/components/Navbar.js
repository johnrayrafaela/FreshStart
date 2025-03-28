import { useContext } from "react";
import { Link, } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../styles/navbar.css";
import Logo from "../assets/images/FreshStart.png";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={Logo} alt="Fresh Start Logo" className="logo-img"/>
        <h2 className="logo-title">Fresh Start</h2>
      </div>

      <div className="nav-links">
        <Link to="/home" className="link">Home</Link>
        <Link to="/cleaning-services" className="link">Services</Link>
        <Link to="/about" className="link">About</Link>

        {user && <Link to="/profile" className="link">View Profile</Link>}
      </div>

      <div className="auth-section">
        {user ? (
          <>
            <span className="username">Hi, {user.firstname}</span>
            <button onClick={logout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="button">Login</Link>
            <Link to="/register" className="button">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
