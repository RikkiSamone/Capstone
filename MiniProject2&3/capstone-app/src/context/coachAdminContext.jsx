import React, { createContext, useState, useContext, useEffect } from "react";

// Create a Context for coach data
const CoachAdminContext = createContext();

export const useCoachAdmin = () => useContext(CoachAdminContext); // Custom hook for accessing context

export const CoachAdminProvider = ({ children }) => {
  const [coachId, setCoachId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Example of fetching coach info (can be adjusted to your API)
  const loginCoach = async (credentials) => {
    try {
      const response = await fetch("/api/coach/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (data.coachId) {
        setCoachId(data.coachId);
        setIsLoggedIn(true);
      } else {
        throw new Error("Login failed.");
      }
    } catch (error) {
      alert("Error logging in: " + error.message);
    }
  };

  const logoutCoach = () => {
    setCoachId(null);
    setIsLoggedIn(false);
  };

  useEffect(() => {
    // Optional: Auto-login if coach info is stored in localStorage or a cookie
    const storedCoachId = localStorage.getItem("coachId");
    if (storedCoachId) {
      setCoachId(storedCoachId);
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <CoachAdminContext.Provider value={{ coachId, isLoggedIn, loginCoach, logoutCoach }}>
      {children}
    </CoachAdminContext.Provider>
  );
};
