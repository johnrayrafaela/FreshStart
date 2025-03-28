import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "../styles/form.css";
const LoginPage = () => {
  const { login, error } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputError, setInputError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setInputError(true);
      return;
    }
    setInputError(false);
    login(email, password);
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      {error && <p className="error-text">{error}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account yet? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
