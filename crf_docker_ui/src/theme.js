import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#0d1b2a" },
    success: { main: "#2e7d32" },
    warning: { main: "#ed6c02" },
    error: { main: "#d32f2f" },
  },
  typography: {
    fontFamily: "Inter, Roboto, sans-serif",
    h1: { fontSize: "28px", fontWeight: 700 },
  },
});

export default theme;

