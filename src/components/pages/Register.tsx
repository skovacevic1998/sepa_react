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
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { isEmailValid } from "../utilities/regex/Validation";

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

  const [emailError, setEmailError] = useState("");
  const handleEmailFocus = () => {
    setEmailError("");
  };
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isEmailValid(emailRegister)) {
      setEmailError("Neispravan format email-a");
      return;
    } else {
      setEmailError("");
    }

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
        clearInputFields();

        setSuccessAlertOpen(true);
      } else {
        setEmailError("Uneseni email postoji");
        throw new Error("Register failed");
      }
    } catch (error) {
      setEmailError("Uneseni email postoji, pokušajte ponovno!");
      console.error("Register error:", error);
    }
  };

  const clearInputFields = () => {
    setImeRegister("");
    setPrezimeRegister("");
    setUsernameRegister("");
    setLokacijaRegister("");
    setEmailRegister("");
    setPasswordRegister("");
    setRePasswordRegister("");
  };

  const handleSuccessAlertClose = () => {
    setSuccessAlertOpen(false);
    clearInputFields();
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
                    value={imeRegister}
                    onChange={(e: {
                      target: { value: React.SetStateAction<string> };
                    }) => setImeRegister(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="prezimeRegister"
                    label="Prezime"
                    name="prezimeRegister"
                    value={prezimeRegister}
                    onChange={(e: {
                      target: { value: React.SetStateAction<string> };
                    }) => setPrezimeRegister(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    id="usernameRegister"
                    label="Korisničko ime"
                    name="usernameRegister"
                    value={usernameRegister}
                    onChange={(e: {
                      target: { value: React.SetStateAction<string> };
                    }) => setUsernameRegister(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    required
                    fullWidth
                    id="lokacijaRegister"
                    label="Lokacija"
                    name="lokacijaRegister"
                    value={lokacijaRegister}
                    onChange={(e: {
                      target: { value: React.SetStateAction<string> };
                    }) => setLokacijaRegister(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="emailRegister"
                    label="Email adresa"
                    name="emailRegister"
                    value={emailRegister}
                    onChange={(e: {
                      target: { value: React.SetStateAction<string> };
                    }) => setEmailRegister(e.target.value)}
                    error={!!emailError}
                    helperText={emailError}
                    onFocus={handleEmailFocus}
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
                    value={passwordRegister}
                    onChange={(e: {
                      target: { value: React.SetStateAction<string> };
                    }) => setPasswordRegister(e.target.value)}
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
                    value={rePasswordRegister}
                    onChange={(e: {
                      target: { value: React.SetStateAction<string> };
                    }) => setRePasswordRegister(e.target.value)}
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
      <Snackbar
        open={successAlertOpen}
        autoHideDuration={5000}
        onClose={handleSuccessAlertClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSuccessAlertClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Uspješno registriran korisnik!
        </Alert>
      </Snackbar>
    </Grid>
  );
};
