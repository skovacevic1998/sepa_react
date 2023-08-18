import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import PersonIcon from "@mui/icons-material/Person";
//import { useSelector } from "react-redux";
//import { RootState } from "../../redux/store";

interface Role {
  id: number;
  name: string;
}

interface ProfilProps {
  name: string;
  surname: string;
  email: string;
  age: number;
  location: string;
  roles: Role[];
  onUpdate: (data: Partial<ProfilProps>) => void;
  Item: any;
}

export const Profil: React.FC<ProfilProps> = ({
  name,
  surname,
  email,
  age,
  location,
  roles,
  onUpdate,
  Item,
}) => {
  //const user = useSelector((state: RootState) => state.user.currentUser);

  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState<Partial<ProfilProps>>({
    name,
    surname,
    email,
    age,
    location,
  });

  const handleUpdate = () => {
    onUpdate(updatedData);
    setIsEditing(false);
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
                Korisnički profil
              </Typography>
            </Item>
          </Grid>
        </Grid>

        <Grid item xs={5}>
          <Item>
            <CssBaseline />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Box component="form" noValidate sx={{ mt: 3 }}>
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
                      value={updatedData.name || ""}
                      onChange={(e) =>
                        setUpdatedData({ ...updatedData, name: e.target.value })
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
                      value={updatedData.surname || ""}
                      onChange={(e) =>
                        setUpdatedData({
                          ...updatedData,
                          surname: e.target.value,
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
                      label="Godina rođenja"
                      name="korisnickaDob"
                      type="number"
                      value={updatedData.age || ""}
                      onChange={(e) =>
                        setUpdatedData({
                          ...updatedData,
                          age: parseInt(e.target.value),
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
                      value={updatedData.location || ""}
                      onChange={(e) =>
                        setUpdatedData({
                          ...updatedData,
                          location: e.target.value,
                        })
                      }
                      disabled={!isEditing}
                    />
                  </Grid>
                  <Grid item xs={12} textAlign={"left"}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">
                        <Typography variant="h5">
                          Aktivne role: {roles.join(", ")}
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
            </Box>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
};
