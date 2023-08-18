import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUser } from "./../../redux/userSlice";
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

interface LoginProps {
  getBackgroundColor: any;
  theme: any;
}

interface User {
  id: number;
  ime: string;
  prezime: string;
  email: string;
  dob: number;
  lokacija: string;
  roles: string;
}

export const Login: React.FC<LoginProps> = ({ getBackgroundColor, theme }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post("/api/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.status === 200) {
        const userData: User = response.data;
        dispatch(setUser(userData));

        navigate("/home");
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
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
            <Item>
              <Container component="main" maxWidth="xs">
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
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
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
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
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
              </Container>
            </Item>
            <Footer getBackgroundColor={getBackgroundColor} />
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
