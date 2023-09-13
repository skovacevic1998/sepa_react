import axios from "axios";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "./../../redux/slice";
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
import { useFormik } from "formik";
import * as Yup from "yup";

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
}

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Neispravan format email-a")
    .required("Email je obavezan"),
  password: Yup.string().required("Lozinka je obavezna"),
});

export const Login: React.FC<LoginProps> = ({ getBackgroundColor, theme }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:8080/api/login", {
          email: values.email,
          password: values.password,
        });

        if (response.data && response.status === 200) {
          const userData: User = response.data;
          dispatch(setUser(userData));
          navigate("/home");
        } else {
          dispatch(clearUser());
          navigate("/");
          throw new Error("Login failed");
        }
      } catch (error) {
        dispatch(clearUser());
        navigate("/");
        console.error("Login error:", error);
      }
    },
  });

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
                  <form onSubmit={formik.handleSubmit} noValidate>
                    <TextField
                      margin="normal"
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                      margin="normal"
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
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
                  </form>
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
