import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/userSlice";
import { RootState } from "../../redux/store";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

interface ProfilProps {
  ime: string | undefined;
  prezime: string | undefined;
  email: string | undefined;
  dob: number | undefined;
  lokacija: string | undefined;
  roles: string | undefined;
  username: string | undefined;
  onUpdate: (data: Partial<ProfilProps>) => void;
  Item: any;
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

export const Profil: React.FC<ProfilProps> = ({
  ime,
  prezime,
  email,
  dob,
  lokacija,
  roles,
  username,
  Item,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState<Partial<ProfilProps>>({
    ime,
    prezime,
    email,
    dob,
    lokacija,
    roles,
    username,
  });

  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [errorAlertOpen, setErrorAlertOpen] = useState(false);

  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const handleUpdate = async () => {
    if (currentUser && currentUser.id !== undefined) {
      const updatedUserData: Partial<User> = {
        id: currentUser.id,
        ime: updatedData.ime || currentUser.ime,
        prezime: updatedData.prezime || currentUser.prezime,
        email: updatedData.email || currentUser.email,
        dob: updatedData.dob || currentUser.dob,
        lokacija: updatedData.lokacija || currentUser.lokacija,
        roles: updatedData.roles || currentUser.roles,
        username: updatedData.username || currentUser.username,
      };

      try {
        dispatch(updateUser(updatedUserData));

        await axios.put(
          "http://localhost:8080/api/updateUser",
          {
            email,
            updatedUserData,
          }
        );

        setIsEditing(false);
        setSuccessAlertOpen(true);
      } catch (error) {
        console.error("Error updating user profile:", error);
        setErrorAlertOpen(true);
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Grid container justifyContent={"center"}>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              width: 200,
              height: 200,
              bgcolor: "primary.main",
              "& .MuiSvgIcon-root": {
                fontSize: 96,
              },
            }}
          >
            <PersonIcon />
          </Avatar>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: -6,
          }}
        >
          <Grid item xs={5}>
            <Item>
              <Typography component="h1" variant="h2" textAlign={"center"}>
                KORISNIČKI PROFIL
              </Typography>
            </Item>
          </Grid>
        </Grid>

        <Grid item xs={5} marginTop={-5}>
          <Item>
            <Typography
              component="h1"
              variant="h4"
              textAlign={"center"}
              marginBottom={2}
            >
              Prijavljeni korisnik: {updatedData.username}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box component="form" noValidate sx={{ mt: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="ime"
                      name="ime"
                      required
                      fullWidth
                      id="imeKorisnika"
                      label="Korisničko ime"
                      autoFocus
                      value={updatedData.ime || ""}
                      onChange={(e) =>
                        setUpdatedData({ ...updatedData, ime: e.target.value })
                      }
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="prezimeKorisnika"
                      label="Korisničko prezime"
                      name="prezime"
                      autoComplete="Prezime"
                      value={updatedData.prezime || ""}
                      onChange={(e) =>
                        setUpdatedData({
                          ...updatedData,
                          prezime: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="emailKorisnika"
                      label="Email"
                      name="email"
                      autoComplete="email"
                      value={updatedData.email || ""}
                      onChange={(e) =>
                        setUpdatedData({
                          ...updatedData,
                          email: e.target.value,
                        })
                      }
                      disabled={true}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="korisnickaDob"
                      label="Dob"
                      name="korisnickaDob"
                      type="number"
                      value={updatedData.dob || ""}
                      onChange={(e) =>
                        setUpdatedData({
                          ...updatedData,
                          dob: parseInt(e.target.value),
                        })
                      }
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="lokacijaKorisnika"
                      label="Lokacija"
                      name="lokacija"
                      autoComplete="lokacija"
                      value={updatedData.lokacija || ""}
                      onChange={(e) =>
                        setUpdatedData({
                          ...updatedData,
                          lokacija: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12} textAlign={"left"}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        <Typography variant="h5">
                          Aktivne role: {roles}
                        </Typography>
                      </FormLabel>
                    </FormControl>
                  </Grid>
                </Grid>
                {isEditing ? (
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleUpdate}
                  >
                    Save Changes
                  </Button>
                ) : (
                  <Button
                    type="button"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={() => setIsEditing(true)}
                  >
                    Edit Profile
                  </Button>
                )}
              </Box>

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
                  Uspješno ažuriran korisnik!
                </Alert>
              </Snackbar>

              <Snackbar
                open={errorAlertOpen}
                autoHideDuration={5000}
                onClose={() => setErrorAlertOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              >
                <Alert
                  onClose={() => setErrorAlertOpen(false)}
                  severity="error"
                  sx={{ width: "100%" }}
                >
                  Došlo je do pogreške.
                </Alert>
              </Snackbar>
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};
