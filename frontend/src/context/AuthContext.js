import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage on app start
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      const res = await axios.post("http://localhost:5000/api/users/login", { email, password });

      if (res?.data?.user) {
        console.log("User data received from API:", res.data.user); // ✅ Debugging
        setUser(res.data.user);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("token", res.data.token);
        navigate("/home");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.");
    }
  };

  const register = async (firstname, lastname, phonenumber, email, password) => {
    try {
      setError(null);
      await axios.post("http://localhost:5000/api/users/register", {
        firstname,
        lastname,
        phonenumber,
        email,
        password,
      });
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
