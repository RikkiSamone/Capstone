import { createTheme } from "@mui/material/styles";

// Define your colors
const customPrimary = "#AB0767"; // Deep magenta for primary color
const darkModePrimary = "#D91C82"; // Slightly brighter magenta for dark mode contrast

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: customPrimary, // Updated primary color
    },
    secondary: {
      main: "#D1D5DB", // Soft gray for contrast
    },
    accent: {
      main: "#FE9A9A", // Red-pink accent
    },
    background: {
      default: "#F9FAFB",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#27334B",
      secondary: "#6269B7",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontSize: "4rem", fontWeight: 800 },
    h2: { fontSize: "1.75rem", fontWeight: 600 },
    body1: { fontSize: "1rem" },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: darkModePrimary, // Brighter magenta for contrast
    },
    secondary: {
      main: "#A1A5AD", // Muted gray for balance
    },
    accent: {
      main: "#FF7575", // Warmer red-pink accent
    },
    background: {
      default: "#1A1A1A",
      paper: "#242424",
    },
    text: {
      primary: "#E0E0E0",
      secondary: "#B3B3B3",
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontSize: "4rem", fontWeight: 800 },
    h2: { fontSize: "1.75rem", fontWeight: 600 },
    body1: { fontSize: "1rem" },
    
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
        },
      },
    },
  },
  
});