import { red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: { main: "#203240" },
    secondary: { main: "#19857b" },
    error: { main: red.A400 },
  },
  typography: { fontFamily: roboto.style.fontFamily },
  shape: { borderRadius: 0 },
});

export default theme;
