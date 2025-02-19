import { useContext } from "react";
import { MyThemeContext } from "../context/themeContext";

function ExampleComponent() {
  const { theme, setTheme, darkMode } = useContext(MyThemeContext);

  return (
    <div style={{ background: theme.background, color: theme.foreground }}>
      <h1>The current theme is {darkMode ? "Dark" : "Light"}</h1>
      <button onClick={() => setTheme(darkMode ? themes.light : themes.dark)}>
        Toggle Theme
      </button>
    </div>
  );
}