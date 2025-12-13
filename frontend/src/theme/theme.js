import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#E53935" // strong red
    },
    secondary: {
      main: "#FB8C00" // orange accent
    },
    background: {
      default: "#fff8f5"
    }
  },
  typography: {
    fontFamily: "'Poppins', sans-serif"
  }
});
