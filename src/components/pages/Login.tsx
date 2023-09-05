import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "./../../redux/userSlice";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Box, Grid, Link } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { ThemeProvider } from "@mui/material/styles";
import Logo from "./../../assets/vub_logo.png";
import { Item } from "../utilities/default/Item";
import { Footer } from "../utilities/default/Footer";
import { isEmailValid } from "../utilities/regex/Validation";

interface LoginProps {
  getBackgroundColor: () => string;
  theme: any;
}

interface User {
  dob: number;
  email: string;
  id: number;
  ime: string;
  lokacija: string;
  password: string;
  prezime: string;
  roles: string;
  username: string;
  br_blagajne: number;
}

export const Login: React.FC<LoginProps> = ({ getBackgroundColor, theme }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFocus = () => {
    setLoginFailed(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isEmailValid(email)) {
      setLoginFailed(true);
      return;
    } else {
      setLoginFailed(false);
    }

    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        email,
        password,
      });

      if (response.data && response.status === 200) {
        const userData: User = response.data;

        if (isDataSerializable(userData)) {
          dispatch(setUser(userData));
          console.log(userData);
          navigate("/home");
        } else {
          console.error("Received non-serializable data:", userData);
        }
      } else {
        dispatch(clearUser());
        setLoginFailed(true);
        navigate("/");
        throw new Error("Login failed");
      }
    } catch (error) {
      dispatch(clearUser());
      setLoginFailed(true);
      navigate("/");
      console.error("Login error:", error);
    }
  };

  const isDataSerializable = (data: any) => {
    try {
      JSON.stringify(data);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Container component="main" maxWidth="xs">
              <Item>
                <CssBaseline />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Avatar src={Logo} />
                  <Typography component="h1" variant="h5">
                    Login
                  </Typography>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      value={email}
                      onFocus={handleFocus}
                      error={loginFailed}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={password}
                      onFocus={handleFocus}
                      error={loginFailed}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                      fullWidth
                      type="submit"
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Login
                    </Button>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Link href="/register" variant="body2">
                          {"Don't have an account? Register."}
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </div>
              </Item>
            </Container>
            <Footer getBackgroundColor={getBackgroundColor} />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
