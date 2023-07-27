import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { Grid } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        VUB
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

interface FooterProps {
  getBackgroundColor: any;
}

export function Footer({ getBackgroundColor }: FooterProps) {
  return (
    <>
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: getBackgroundColor,
          bottom: 0,
          textAlign: "center",
        }}
      >
        <Container maxWidth="sm">
          <Grid container justifyContent={"center"}>
            <Grid item>
              <Typography variant="body1" textAlign={"right"}>
                Za više informacija kontaktirajte mail:
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                variant="body1"
                fontWeight={"bold"}
                textAlign={"left"}
              >
                skovacevic@vub.hr
              </Typography>
            </Grid>
          </Grid>
          <Copyright />
        </Container>
      </Box>
    </>
  );
}
