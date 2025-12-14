import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#FF6B9D", // Sweet pink
      light: "#FFB3D1",
      dark: "#E91E63",
      contrastText: "#FFFFFF"
    },
    secondary: {
      main: "#FFA726", // Warm orange
      light: "#FFD54F",
      dark: "#FF6F00",
      contrastText: "#FFFFFF"
    },
    accent: {
      main: "#BA68C8", // Purple
      light: "#E1BEE7",
      dark: "#7B1FA2"
    },
    background: {
      default: "#FFF8F5", // Soft cream
      paper: "#FFFFFF"
    },
    text: {
      primary: "#2C2C2C",
      secondary: "#666666"
    },
    success: {
      main: "#66BB6A",
      light: "#A5D6A7"
    },
    error: {
      main: "#EF5350",
      light: "#EF9A9A"
    }
  },
  typography: {
    fontFamily: "'Poppins', 'Inter', system-ui, sans-serif",
    h1: {
      fontWeight: 700,
      letterSpacing: "-0.02em"
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.01em"
    },
    h3: {
      fontWeight: 600
    },
    h4: {
      fontWeight: 600
    },
    h5: {
      fontWeight: 600
    },
    h6: {
      fontWeight: 600
    },
    button: {
      textTransform: "none",
      fontWeight: 600
    }
  },
  shape: {
    borderRadius: 16
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "10px 24px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0 8px 30px rgba(0,0,0,0.12)"
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12
          }
        }
      }
    }
  }
});
