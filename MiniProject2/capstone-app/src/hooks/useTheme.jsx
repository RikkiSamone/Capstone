import React from "react";
import { useTheme } from "./ThemeProvider";

const ThemedComponent = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div style={{ background: theme.background, color: theme.color, height: "100vh", padding: "20px" }}>
      <h1>The current theme</h1>
      <button onClick={toggleTheme} style={{ padding: "10px", backgroundColor: theme.color, color: theme.background }}>
        Toggle Theme
      </button>
    </div>
  );
};

export default ThemedComponent;