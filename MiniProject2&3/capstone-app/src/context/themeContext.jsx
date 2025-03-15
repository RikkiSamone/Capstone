import React, { createContext, useState, useContext } from "react";

// Step 1: Create theme objects
const theme = {
  colors: {
    background: "#F9FAFB", // Soft neutral for the app's background
    primary: "#FFDD4C",    // Deep purple for primary elements (buttons, headers, etc.)
    secondary: "#D1D5DB",  // Muted pink for secondary highlights
    accent: "#FE9A9A",     // Bright blue for accents (links, call-to-action buttons, etc.)
    text: "#127334B",       // Dark teal for text
  },
};


// Create a ThemeContext
const ThemeContext = createContext();

// Define the default theme
const defaultTheme = {
  colors: {
    background: "#F9FAFB", // Soft neutral for the app's background
    primary: "#FFDD4C",    // Deep purple for primary elements (buttons, headers, etc.)
    secondary: "#D1D5DB",  // Muted pink for secondary highlights
    accent: "#FE9A9A",     // Bright blue for accents (links, call-to-action buttons, etc.)
    text: "#127334B", 
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