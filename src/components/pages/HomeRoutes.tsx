import React from "react";
import { Grid } from "@mui/material";
import { Routes, Route, useLocation } from "react-router-dom";
import Finance1 from "../../assets/finance1.jpg";
import {
  ErrorPage,
  Footer,
  Homepage,
  Konsignacija,
  PregledNaloga,
  Profil,
  UcitavanjeNaloga,
  UnosNaloga,
} from "./../../components";
import IconButton from "@mui/material/IconButton";
import { NavBar } from "../utilities/NavBar";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

interface ColorModeContextType {
  toggleColorMode: () => void;
  colorMode: "light" | "dark";
}

interface HomeRouterProps {
  Item: any;
  colorModeValue: ColorModeContextType; // Assuming this is the correct type
  theme: import("@mui/material/styles").Theme; // Properly import the Theme type
  getBackgroundColor: () => string;
  getBackgroundColorNavBar: () => string;
  getTextColorNavBar: () => string;
}

export const HomeRoutes: React.FC<HomeRouterProps> = ({
  Item,
  colorModeValue,
  theme,
  getBackgroundColor,
  getBackgroundColorNavBar,
  getTextColorNavBar,
}) => {
  const location = useLocation();

  return (
    <div
      style={{
        position: "relative",
        backgroundImage: `url(${Finance1})`,
        backgroundSize: "100% 100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
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
              getBackgroundColorNavBar={getBackgroundColorNavBar}
              getTextColorNavBar={getTextColorNavBar}
            />
          </Grid>

          <Grid item flexGrow={1}>
            <Routes location={location}>
              <Route
                path="/"
                element={
                  <Homepage
                    Item={Item}
                    getBackgroundColor={getBackgroundColor}
                  />
                }
              />
              <Route
                path="/konsignacija"
                element={<Konsignacija Item={Item} />}
              />
              <Route path="/pregled" element={<PregledNaloga Item={Item} />} />
              <Route path="/unos" element={<UnosNaloga Item={Item} />} />
              <Route
                path="/ucitavanje"
                element={<UcitavanjeNaloga Item={Item} />}
              />
              <Route path="/profil" element={<Profil Item={Item} />} />
              <Route path="/*" element={<ErrorPage Item={Item} />} />
            </Routes>
          </Grid>

          <Grid item>
            <Footer getBackgroundColor={getBackgroundColor} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
