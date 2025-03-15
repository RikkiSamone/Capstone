import React, { useState, useMemo } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { UserProvider } from "./context/userContext.jsx";
import App from "./App.jsx";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { AuthProvider } from "./context/auth-context.jsx";
import { lightTheme, darkTheme } from "./theme.js";

const Main = () => {
  // Check local storage for theme preference or default to light mode
  const storedTheme = localStorage.getItem("theme") || "light";
  const [mode, setMode] = useState(storedTheme);

  // Memoize the theme so it only recalculates when `mode` changes
  const theme = useMemo(() => (mode === "dark" ? darkTheme : lightTheme), [mode]);

  // Function to toggle theme
  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("theme", newMode); // Save preference
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <UserProvider>
          <AuthProvider>
            <App toggleTheme={toggleTheme} mode={mode} />
          </AuthProvider>
        </UserProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Main />
  </StrictMode>
);