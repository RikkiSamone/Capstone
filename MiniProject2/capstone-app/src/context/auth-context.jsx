import React, { createContext, useState, useEffect } from 'react';

// Create Context
export const AuthContext = createContext();

// Provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is logged in on initial render
  useEffect(() => {
    // Check localStorage (or any other method you use to persist authentication)
    const user = localStorage.getItem('user');
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  // Log in
  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('user', 'loggedIn'); // Store something in localStorage to track authentication
  };

  // Log out
  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('user'); // Remove user from localStorage
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};