// AboutPage.js
import "../styles/about.css";
import { useState } from 'react';

const AboutPage = () => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  return (
    <div className={`about-container ${darkMode ? 'dark-mode' : ''}`}>
      <button className="toggle-mode-btn" onClick={toggleDarkMode}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
      
      <div className="about-section">
        <h1>About Us</h1>
        <div className="about-content">
          <p>
            At Fresh Start Cleaning Service, we believe that a clean space is the foundation of a clear mind and a fresh beginning. Founded with a mission to provide reliable, affordable, and top-quality cleaning solutions, we are committed to helping homes and businesses shine—literally and figuratively.
          </p>
          <p>
            With a team of trained and trustworthy cleaning professionals, we offer a wide range of services tailored to fit your lifestyle or business needs. Whether it's a one-time deep clean, regular maintenance, or a special event cleanup, we approach every task with attention to detail and a passion for perfection.
          </p>
          <p>
            What sets us apart is our dedication to customer satisfaction, eco-friendly practices, and a personal touch in everything we do. Your space isn't just another job to us—it's your sanctuary, your workplace, your fresh start.
          </p>
          <p>
            Let us help you reclaim your time and enjoy a spotless space. Because every great day begins with a Fresh Start.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;