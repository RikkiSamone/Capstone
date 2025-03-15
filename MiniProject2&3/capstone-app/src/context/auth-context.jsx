import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

// Create Context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      axios
        .get("http://localhost:5001/api/users/me", {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          if (response.data) {
            setUser(response.data);
            setIsAuthenticated(true);
            setToken(storedToken);
          } else {
            logout();
          }
        })
        .catch(() => logout());
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:5001/api/users/login", {
        email,
        password,
      });

      const { token, user } = response.data;
      localStorage.setItem("token", token);
      setUser(user);
      setToken(token);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message);
      throw error; // Rethrow error so frontend can display a message
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext
export const useAuth = () => useContext(AuthContext);