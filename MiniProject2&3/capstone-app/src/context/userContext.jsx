import { createContext, useState, useEffect } from 'react';


export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token); // Convert token to boolean


   // Save token to localStorage when it changes
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
    }
  }, [token]);

// Login function
  const login = (user, token) => {
    setUser(user); // Set user data after successful login
    setToken(token); // Set token received from login
    setIsAuthenticated(true); // Update authentication status
    localStorage.setItem("token", token); // Store token in localStorage
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, setUser, token, setToken, isAuthenticated, setIsAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;