import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Login, Register, HomeRoutes } from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const [mode, setMode] = React.useState<"light" | "dark">("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home/*" element={<HomeRoutes />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
