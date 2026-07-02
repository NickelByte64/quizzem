import { createTheme } from "@mui/material";

export const THEME = createTheme({
  palette: {
    primary: {
      main: "#1f7a5c",
      light: "#2aa27a",
      dark: "#15513d",
      contrastText: "#d6f5eb",
    },
    secondary: {
      main: "#a32952",
      light: "#cc3366",
      dark: "#7a1f3d",
      contrastText: "#f5d6e0",
    },
    background: {
      default: "#f9f4eb",
      paper: "#fbfefd",
    },
  },
});
