import IconButton from "@mui/material/IconButton";
import { NavBar } from "../utilities/NavBar";
import { Item } from "../utilities/Item";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import React, { useMemo, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Finance1 from "../../assets/finance1.jpg";
import {
  ErrorPage,
  Footer,
  Homepage,
  Konsignacija,
  PregledNaloga,
  Profil,
  UnosNaloga,
} from "./../../components";
import { Grid } from "@mui/material";

// Define the ColorModeContextType
interface ColorModeContextType {
  toggleColorMode: () => void;
  colorMode: "light" | "dark";
}

const ColorModeContext = React.createContext<ColorModeContextType>({
  toggleColorMode: () => {},
  colorMode: "light",
});

export const HomeRoutes = () => {
  const getBackgroundColor = () => {
    return theme.palette.mode === "dark"
      ? "rgba(20, 20, 20, 0.5)"
      : "rgba(201, 201, 201, 0.5)";
  };

  const location = useLocation();

  const [mode, setMode] = useState<"light" | "dark">("light");

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const colorModeValue = useMemo(
    () => ({ toggleColorMode, colorMode: mode }),
    [mode]
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <div
      style={{
        position: "relative",
        backgroundImage: `url(${Finance1})`,
        backgroundSize: "100% 100%",
        minHeight: "100vh",
        display: "flex", // Set display to flex
        flexDirection: "column",
      }}
    >
      <ColorModeContext.Provider value={colorModeValue}>
        <ThemeProvider theme={theme}>
          <div
            style={{
              position: "relative",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: getBackgroundColor(),
              backdropFilter: "blur(5px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Grid style={{ minHeight: "100vh" }}>
              {/* Navbar */}
              <Grid item>
                <NavBar
                  iconButton={
                    <IconButton
                      sx={{ ml: 1, mr: 2 }}
                      onClick={colorModeValue.toggleColorMode}
                      color="inherit"
                    >
                      {theme.palette.mode === "dark" ? (
                        <Brightness7Icon />
                      ) : (
                        <Brightness4Icon />
                      )}
                    </IconButton>
                  }
                />
              </Grid>

              {/* Routes */}
              <Grid item flexGrow={1}>
                <Routes location={location}>
                  <Route
                    path="/"
                    element={
                      <Homepage
                        colorMode={colorModeValue}
                        ColorModeContext={ColorModeContext}
                        theme={theme}
                        Item={Item}
                        getBackgroundColor={getBackgroundColor}
                      />
                    }
                  />
                  <Route
                    path="/konsignacija"
                    element={
                      <Konsignacija
                        colorMode={colorModeValue}
                        ColorModeContext={ColorModeContext}
                        theme={theme}
                        Item={Item}
                      />
                    }
                  />
                  <Route
                    path="/pregled"
                    element={
                      <PregledNaloga
                        colorMode={colorModeValue}
                        ColorModeContext={ColorModeContext}
                        theme={theme}
                        Item={Item}
                      />
                    }
                  />
                  <Route
                    path="/unos"
                    element={
                      <UnosNaloga
                        colorMode={colorModeValue}
                        ColorModeContext={ColorModeContext}
                        theme={theme}
                        Item={Item}
                        getBackgroundColor={getBackgroundColor}
                      />
                    }
                  />
                  <Route
                    path="/profil"
                    element={
                      <Profil
                        colorMode={colorModeValue}
                        ColorModeContext={ColorModeContext}
                        theme={theme}
                        Item={Item}
                      />
                    }
                  />

                  <Route
                    path="/*"
                    element={
                      <ErrorPage
                        colorMode={colorModeValue}
                        ColorModeContext={ColorModeContext}
                        theme={theme}
                        Item={Item}
                      />
                    }
                  />
                </Routes>
              </Grid>

              {/* Footer */}
              <Grid item>
                <Footer
                  defaultTheme={theme}
                  getBackgroundColor={getBackgroundColor}
                />
              </Grid>
            </Grid>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </div>
  );
};
