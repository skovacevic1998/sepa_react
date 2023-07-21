import IconButton from "@mui/material/IconButton";
import { NavBar } from "../utilities/NavBar";
import { Item } from "../utilities/Item";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import React from "react";

import {
  Konsignacija,
  UnosNaloga,
  PregledNaloga,
  Homepage,
  Profil,
  Footer,
} from "./../../components";
import { Routes, Route, useLocation } from "react-router-dom";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export const HomeRoutes = () => {
  const location = useLocation();

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
        <NavBar
          iconButton={
            <IconButton
              sx={{ ml: 1, mr: 2 }}
              onClick={colorMode.toggleColorMode}
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

        <Routes location={location}>
          <Route
            path="/"
            element={
              <Homepage
                colorMode={colorMode}
                ColorModeContext={ColorModeContext}
                theme={theme}
                Item={Item}
              />
            }
          />
          <Route
            path="/konsignacija"
            element={
              <Konsignacija
                colorMode={colorMode}
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
                colorMode={colorMode}
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
                colorMode={colorMode}
                ColorModeContext={ColorModeContext}
                theme={theme}
                Item={Item}
              />
            }
          />
          <Route
            path="/profil"
            element={
              <Profil
                colorMode={colorMode}
                ColorModeContext={ColorModeContext}
                theme={theme}
                Item={Item}
              />
            }
          />
        </Routes>
        <Footer defaultTheme={theme} />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
