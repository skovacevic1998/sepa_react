import IconButton from "@mui/material/IconButton";
import { NavBar } from "../utilities/NavBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
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

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  margin: 40,
}));

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
