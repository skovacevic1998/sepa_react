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
  const storedMode = localStorage.getItem("colorMode");
  const initialMode: "light" | "dark" =
    storedMode === "dark" ? "dark" : "light";
  const [mode, setMode] = React.useState<"light" | "dark">(initialMode);

  const toggleColorMode = React.useCallback(() => {
    const newMode = mode === "light" ? "dark" : "light";
    setMode(newMode);
    localStorage.setItem("colorMode", newMode);
  }, [mode]);

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  const colorModeValue = React.useMemo(
    () => ({
      toggleColorMode,
      colorMode: mode,
    }),
    [toggleColorMode, mode]
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
    <ColorModeContext.Provider value={colorModeValue}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/home/*"
              element={
                <HomeRoutes
                  colorModeValue={colorModeValue}
                  getBackgroundColor={getBackgroundColor}
                  getBackgroundColorNavBar={getBackgroundColorNavBar}
                  theme={theme}
                  getTextColorNavBar={getTextColorNavBar}
                  Item={Item}
                />
              }
            />
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
