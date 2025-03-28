import { useNavigate } from "react-router-dom";
import "../styles/LandingPage.css";
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1>Welcome to Fresh Start A Cleaning Services</h1>
      <p>Book professional cleaning services at your convenience.</p>
      <button className="get-started-btn" onClick={() => navigate("/login")}>
        Get Started
      </button>
    </div>
  );
};

export default LandingPage;
