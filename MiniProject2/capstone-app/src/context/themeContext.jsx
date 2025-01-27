import React, { useState } from "react";

// Theme options with specific color values
export const themes = {
  light: {
    foreground: "#333333",
    background: "#BAE2FF",
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222",
  },
};

// Named export for the theme context
export const MyThemeContext = React.createContext({
  theme: themes.light, // Default to light theme
  setTheme: () => {},  // Placeholder function
  darkMode: false,     // Default dark mode to false
});

// Theme Provider wrapper
export default function MyThemeProvider({ children }) {
  const [theme, setTheme] = useState(themes.light);

  // Boolean to check if dark mode is active
  const darkMode = theme.background === themes.dark.background;

  return (
    <MyThemeContext.Provider value={{ theme, setTheme, darkMode }}>
      {children}
    </MyThemeContext.Provider>
  );
}