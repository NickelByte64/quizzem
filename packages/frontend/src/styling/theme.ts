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
      default: "#faf6ef",
      paper: "#fbfefd",
    },
  },
  typography: {
    fontFamily: "sans-serif",
    fontWeightBold: 600,
    fontWeightMedium: 600,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    body1: {
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.125,
      letterSpacing: "0.035em",
    },
    h1: {
      fontweight: 600,
      fontSize: "3rem",
      lineHeight: 1.25,
      letterSpacing: "0.022em",
      margin: "0.35em 0",
    },
    h2: {
      fontweight: 600,
      fontSize: "2.5rem",
      lineheight: 1.1765,
      letterspacing: "0.0116em",
      margin: "0.35em 0",
    },
    h3: {
      fontweight: 600,
      fontSize: "2rem",
      lineHeight: 1.2,
      letterSpacing: "0.0025em",
      margin: "0.35em 0",
    },
    h4: {
      fontweight: 400,
      fontSize: "1.75rem",
      lineHeight: 1.25,
      letterSpacing: "-0.004em",
      margin: "0.35em 0",
    },
    h5: {
      fontweight: 400,
      fontSize: "1.5rem",
      lineHeight: 1.28,
      letterSpacing: "-0.0096em",
      margin: "0.35em 0",
    },
    h6: {
      fontweight: 400,
      fontSize: "1.2rem",
      lineHeight: 1.4,
      letterSpacing: "-0.0137em",
      margin: "0.35em 0",
    },
  },
  shape: {
    borderRadius: 8,
    borderRadiusSm: 1,
    borderRadiusMd: 2,
    borderRadiusLg: 4,
    borderRadiusXl: 8,
  },
});

declare module "@mui/material/styles" {
  interface Shape {
    borderRadiusSm: number;
    borderRadiusMd: number;
    borderRadiusLg: number;
    borderRadiusXl: number;
  }

  interface ShapeOptions {
    borderRadiusSm?: number;
    borderRadiusMd?: number;
    borderRadiusLg?: number;
    borderRadiusXl?: number;
  }
}
