import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import "../styles/home.css";

import CleaningServicesPage from "./CleaningServicesPage";
import EmployeePage from "../components/EmployeesPage"; // Importing the employee component

const HomePage = () => {
  const { user } = useContext(AuthContext);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      if (newMode) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
      }
      return newMode;
    });
  };

  return (
    <div>
      <button className="toggle-mode-btn" onClick={toggleDarkMode}>
        {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
      </button>
      <div className="homepage-container">
        <h1>Welcome, {user ? user.firstname : "Guest"}!</h1>
        <p>Explore our cleaning services and book your appointment today.</p>
      </div>

        {/* Services + Employees Side by Side */}
            <CleaningServicesPage />

          <div className="employees-section">
            <EmployeePage />
          </div>

      
    </div>
  );
};

export default HomePage;
