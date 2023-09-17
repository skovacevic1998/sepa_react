import * as React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
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
import axios from "axios";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

interface RegisterProps {
  getBackgroundColor: any;
}

export const Register: React.FC<RegisterProps> = ({ getBackgroundColor }) => {
  const [emailExists, setEmailExists] = React.useState(false);

  const validationSchema = Yup.object().shape({
    imeRegister: Yup.string().required("Ime je obavezno polje"),
    prezimeRegister: Yup.string().required("Prezime je obavezno polje"),
    lokacijaRegister: Yup.string().required("Lokacija je obavezno polje"),
    emailRegister: Yup.string()
      .email("Neispravan format email-a")
      .required("Email adresa je obavezna")
      .test("is-unique", "Odabrani email postoji", async function (value) {
        if (!value) return true; // Skip validation if the email field is empty

        try {
          const response = await axios.get(
            `http://localhost:8080/api/checkEmail?email=${value}`
          );
          setEmailExists(response.data); // Set the email existence state
          return !response.data; // Return true if email does not exist
        } catch (error) {
          console.error("Email check error:", error);
          return false;
        }
      }),
    passwordRegister: Yup.string().required("Lozinka je obavezna"),
    rePasswordRegister: Yup.string()
      .oneOf([Yup.ref("passwordRegister"), ""], "Lozinke se ne podudaraju")
      .required("Potvrdite lozinku"),
    usernameRegister: Yup.string()
      .required("Korisničko ime je obavezno polje")
      .test("is-unique", "Korisničko ime već postoji", async (value) => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/checkUsername?username=${value}`
          );
          return response.data === false;
        } catch (error) {
          console.error("Username check error:", error);
          return false;
        }
      }),
  });

  const [successAlertOpen, setSuccessAlertOpen] = React.useState(false);

  const handleSubmit = async (
    values: any,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/register",
        values
      );

      if (response.data && response.status === 200) {
        setSuccessAlertOpen(true);
        resetForm();
        setSubmitting(false);
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
            <Formik
              initialValues={{
                imeRegister: "",
                prezimeRegister: "",
                usernameRegister: "",
                lokacijaRegister: "",
                emailRegister: "",
                passwordRegister: "",
                rePasswordRegister: "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, isValid, touched, errors }) => (
                <Form>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Field
                        name="imeRegister"
                        required
                        fullWidth
                        id="imeRegister"
                        label="Ime"
                        autoFocus
                        as={TextField}
                        error={touched.imeRegister && !!errors.imeRegister}
                      />
                      <ErrorMessage
                        name="imeRegister"
                        component="div"
                        className="error"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field
                        name="prezimeRegister"
                        required
                        fullWidth
                        id="prezimeRegister"
                        label="Prezime"
                        as={TextField}
                        error={
                          touched.prezimeRegister && !!errors.prezimeRegister
                        }
                      />
                      <ErrorMessage
                        name="prezimeRegister"
                        component="div"
                        className="error"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        name="usernameRegister"
                        required
                        fullWidth
                        id="usernameRegister"
                        label="Korisničko ime"
                        as={TextField}
                        error={
                          touched.usernameRegister && !!errors.usernameRegister
                        }
                      />
                      <ErrorMessage
                        name="usernameRegister"
                        component="div"
                        className="error"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        name="lokacijaRegister"
                        required
                        fullWidth
                        id="lokacijaRegister"
                        label="Lokacija"
                        as={TextField}
                        error={
                          touched.lokacijaRegister && !!errors.lokacijaRegister
                        }
                      />
                      <ErrorMessage
                        name="lokacijaRegister"
                        component="div"
                        className="error"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="emailRegister"
                        required
                        fullWidth
                        id="emailRegister"
                        label="Email adresa"
                        as={TextField}
                        error={
                          (touched.emailRegister && !!errors.emailRegister) ||
                          (emailExists && !errors.emailRegister)
                        }
                      />
                      <ErrorMessage
                        name="emailRegister"
                        component="div"
                        className={`error ${
                          emailExists && !errors.emailRegister
                            ? "red-error"
                            : ""
                        }`}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        name="passwordRegister"
                        required
                        fullWidth
                        type="password"
                        id="passwordRegister"
                        label="Lozinka"
                        as={TextField}
                        error={
                          touched.passwordRegister && !!errors.passwordRegister
                        }
                      />
                      <ErrorMessage
                        name="passwordRegister"
                        component="div"
                        className="error"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        name="rePasswordRegister"
                        required
                        fullWidth
                        type="password"
                        id="rePasswordRegister"
                        label="Potvrdi lozinku"
                        as={TextField}
                        error={
                          touched.rePasswordRegister &&
                          !!errors.rePasswordRegister
                        }
                      />
                      <ErrorMessage
                        name="rePasswordRegister"
                        component="div"
                        className="error"
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={isSubmitting || !isValid}
                  >
                    Registriraj
                  </Button>
                </Form>
              )}
            </Formik>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Imate korisnički račun? Logirajte se.
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Item>
        <Footer getBackgroundColor={getBackgroundColor} />
      </Container>
      <Snackbar
        open={successAlertOpen}
        autoHideDuration={5000}
        onClose={() => setSuccessAlertOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSuccessAlertOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Uspješno registriran korisnik!
        </Alert>
      </Snackbar>
    </Grid>
  );
};
