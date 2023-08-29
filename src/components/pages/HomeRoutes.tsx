import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Finance1 from "../../assets/finance1.jpg";
import {
  ErrorPage,
  Footer,
  Homepage,
  Konsignacija,
  Loader,
  PregledNaloga,
  Profil,
  UcitavanjeNaloga,
  UnosNaloga,
} from "./../../components";
import IconButton from "@mui/material/IconButton";
import { NavBar } from "../utilities/default/NavBar";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { setUser } from "../../redux/userSlice";

interface ColorModeContextType {
  toggleColorMode: () => void;
  colorMode: "light" | "dark";
}

interface HomeRouterProps {
  Item: any;
  colorModeValue: ColorModeContextType;
  theme: import("@mui/material/styles").Theme;
  getBackgroundColor: () => string;
  getBackgroundColorNavBar: () => string;
  getTextColorNavBar: () => string;
}

interface User {
  id: number;
  ime: string;
  prezime: string;
  email: string;
  dob: number;
  lokacija: string;
  roles: string;
  username: string;
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
  const [loading, setLoading] = useState(true);

  // Use useDispatch to get the dispatch function from Redux
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    const timeoutId = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [location]);

  // Get the user data from the Redux store
  const userData = useSelector((state: RootState) => state.user.currentUser);

  const handleUpdateProfile = (data: Partial<User>) => {
    console.log(userData);
    if (userData) {
      const updatedUserData: User = {
        ...userData,
        ...data,
      };
      dispatch(setUser(updatedUserData));
    }
  };

  if (loading) {
    return <Loader text="Loading..." />;
  }

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
                  userData ? (
                    <Homepage
                      Item={Item}
                      getBackgroundColor={getBackgroundColor}
                    />
                  ) : (
                    <Navigate to={"/"} />
                  )
                }
              />
              <Route
                path="/konsignacija"
                element={
                  userData ? (
                    <Konsignacija Item={Item} />
                  ) : (
                    <Navigate to={"/"} />
                  )
                }
              />
              <Route
                path="/pregled"
                element={
                  userData ? (
                    <PregledNaloga Item={Item} />
                  ) : (
                    <Navigate to={"/"} />
                  )
                }
              />
              <Route
                path="/unos"
                element={
                  userData ? <UnosNaloga Item={Item} /> : <Navigate to={"/"} />
                }
              />
              <Route
                path="/ucitavanje"
                element={
                  userData ? (
                    <UcitavanjeNaloga Item={Item} />
                  ) : (
                    <Navigate to={"/"} />
                  )
                }
              />
              <Route
                path="/profil"
                element={
                  userData ? (
                    <Profil
                      ime={userData?.ime}
                      prezime={userData?.prezime}
                      email={userData?.email}
                      dob={userData?.dob}
                      lokacija={userData?.lokacija}
                      roles={userData?.roles}
                      username={userData?.username}
                      onUpdate={handleUpdateProfile}
                      Item={Item}
                    />
                  ) : (
                    <Navigate to={"/"} />
                  )
                }
              />
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
