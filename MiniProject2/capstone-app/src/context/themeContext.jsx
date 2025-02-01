import React, { createContext, useState, useContext } from "react";

// Step 1: Create theme objects
const theme = {
  colors: {
    background: "#F8F2DC", // Soft neutral for the app's background
    primary: "#5F0F40",    // Deep purple for primary elements (buttons, headers, etc.)
    secondary: "#BF8B85",  // Muted pink for secondary highlights
    accent: "#08B2E3",     // Bright blue for accents (links, call-to-action buttons, etc.)
    text: "#1B282A",       // Dark teal for text
  },
};


// Create a ThemeContext
const ThemeContext = createContext();

// Define the default theme
const defaultTheme = {
  colors: {
    background: "#F8F2DC", // Soft neutral
    primary: "#5F0F40",    // Deep purple
    secondary: "#BF8B85",  // Muted pink
    accent: "#08B2E3",     // Bright blue
    text: "#1B282A",       // Dark teal
  },
};

// Create the ThemeProvider component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(defaultTheme);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for accessing the theme
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}