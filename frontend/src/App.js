import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import CleaningServicesPage from "./pages/CleaningServicesPage";
import AboutPage from "./pages/AboutPage";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";
import Footer from "./components/Footer";
import UserProfilePage from "./pages/userProfilePage";
import AppointmentHistoryPage from "./pages/appointmentHistory";
import EmployeesPage from "./components/EmployeesPage";
import "./App.css";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <div className="main-container">
        <AuthProvider>
          <Navbar />
          <div className="content">
            <Routes>
              <Route path="/profile" element={<UserProfilePage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/cleaning-services" element={<CleaningServicesPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/appointment-history" element={<AppointmentHistoryPage />} />
              <Route path="/employees" element={<EmployeesPage />} />
            </Routes>
          </div>
          <Footer />
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
