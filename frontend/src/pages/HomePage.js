import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import "../styles/home.css";
import CleaningServicesPage from "./CleaningServicesPage";

const HomePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div className="home-container">
        <h2>Welcome, {user ? user.firstname : "Guest"}!</h2>
        <p>Explore our cleaning services and book your appointment today.</p>
      </div>
      <CleaningServicesPage />
    </div>
  );
};

export default HomePage;
