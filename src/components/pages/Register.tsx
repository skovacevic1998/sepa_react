import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Logo from "./../../assets/vub_logo.png";
import { Item } from "../utilities/default/Item";
import { Footer } from "../utilities/default/Footer";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface RegisterProps {
  getBackgroundColor: any;
}

export const Register: React.FC<RegisterProps> = ({ getBackgroundColor }) => {
  const [imeRegister, setImeRegister] = useState("");
  const [prezimeRegister, setPrezimeRegister] = useState("");
  const [usernameRegister, setUsernameRegister] = useState("");
  const [lokacijaRegister, setLokacijaRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [rePasswordRegister, setRePasswordRegister] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/register", {
        imeRegister,
        prezimeRegister,
        usernameRegister,
        lokacijaRegister,
        emailRegister,
        passwordRegister,
        rePasswordRegister,
      });

      if (response.data && response.status === 200) {
        navigate("/");
      } else {
        throw new Error("Register failed");
      }
    } catch (error) {
      console.error("Register error:", error);
    }
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Item>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar src={Logo} />
            <Typography component="h1" variant="h5">
              Registracija korisnika
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="imeRegister"
                    required
                    fullWidth
                    id="imeRegister"
                    label="Ime"
                    autoFocus
                    onChange={(e) => setImeRegister(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="prezimeRegister"
                    label="Prezime"
                    name="prezimeRegister"
                    onChange={(e) => setPrezimeRegister(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    id="usernameRegister"
                    label="Korisničko ime"
                    name="usernameRegister"
                    onChange={(e) => setUsernameRegister(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    id="lokacijaRegister"
                    label="Lokacija"
                    name="lokacijaRegister"
                    onChange={(e) => setLokacijaRegister(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="emailRegister"
                    label="Email adresa"
                    name="emailRegister"
                    onChange={(e) => setEmailRegister(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    name="passwordRegister"
                    label="Lozinka"
                    type="password"
                    id="passwordRegister"
                    onChange={(e) => setPasswordRegister(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    name="rePasswordRegister"
                    label="Potvrdi lozinku"
                    type="password"
                    id="rePasswordRegister"
                    onChange={(e) => setRePasswordRegister(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Registriraj
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Imate korisnički račun? Logirajte se.
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Item>
        <Footer getBackgroundColor={getBackgroundColor} />
      </Container>
    </Grid>
  );
};
