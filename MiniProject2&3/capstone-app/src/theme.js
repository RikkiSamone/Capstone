import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light", // Supports 'light' and 'dark' modes
    primary: {
      main: "#1976d2", // Customize your primary color
    },
    secondary: {
      main: "#ff9800", // Accent color
    },
    background: {
      default: "#f5f5f5", // App background color
      paper: "#ffffff", // Card background color
    },
    text: {
      primary: "#212121",
      secondary: "#757575",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontSize: "2rem", fontWeight: 600 },
    h2: { fontSize: "1.75rem", fontWeight: 600 },
    body1: { fontSize: "1rem" },
  },
  shape: {
    borderRadius: 12, // Smooth rounded corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Removes uppercase styling
          borderRadius: 8, // Rounded buttons
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16, // Smooth card design
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

export default theme;