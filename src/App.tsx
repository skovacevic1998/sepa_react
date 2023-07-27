import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Login, Register, HomeRoutes, Item } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

interface ColorModeContextType {
  toggleColorMode: () => void;
  colorMode: "light" | "dark";
}

const ColorModeContext = React.createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  colorMode: "light",
});

function App() {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const toggleColorMode = React.useCallback(() => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }, []);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );
  const getBackgroundColor = () => {
    return mode === "dark"
      ? "rgba(20, 20, 20, 0.5)"
      : "rgba(201, 201, 201, 0.5)";
  };

  const getBackgroundColorNavBar = () => {
    return mode === "dark" ? "rgba(10, 10, 10, 0.5)" : "rgba(80, 80, 80, 0.5)";
  };

  const getTextColorNavBar = () => {
    return mode === "dark" ? "white" : "black";
  };

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Pass the toggleColorMode function directly */}
          <Route
            path="/home/*"
            element={
              <HomeRoutes
                colorModeValue={ColorModeContext}
                getBackgroundColor={getBackgroundColor}
                getBackgroundColorNavBar={getBackgroundColorNavBar}
                theme={theme}
                getTextColorNavBar={getTextColorNavBar}
                ColorModeContext={ColorModeContext}
                Item={Item}
              />
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
