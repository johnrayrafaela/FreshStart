import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../styles/form.css";

const RegisterPage = () => {
  const { register, error } = useContext(AuthContext);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [inputError, setInputError] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!firstname || !lastname || !phoneNumber || !email || !password || !confirmPassword) {
      setInputError(true);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    setInputError(false);
    setPasswordMismatch(false);

    const success = await register(firstname, lastname, phoneNumber, email, password);

    if (success) {
      setSuccessMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000); // Redirect after 2 seconds
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      {error && <p className="error-text">{error}</p>}
      {successMessage && <p className="success-text">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name:"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          style={{ borderColor: inputError && !firstname? "red" : "" }}
          required
        />
        <input
          type="text"
          placeholder="Last Name:"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          style={{ borderColor: inputError && !lastname ? "red" : "" }}
          required
        />
        <input
          type="text"
          placeholder="Phone Number:"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={{ borderColor: inputError && !phoneNumber ? "red" : "" }}
          required
        />
        <input
          type="email"
          placeholder="Email:"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ borderColor: inputError && !email ? "red" : "" }}
          required
        />
        <input
          type="password"
          placeholder="Password:"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ borderColor: inputError && !password ? "red" : "" }}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password:"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ borderColor: passwordMismatch ? "red" : "" }}
          required
        />
        {passwordMismatch && <p className="error-text">Passwords do not match</p>}
        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
