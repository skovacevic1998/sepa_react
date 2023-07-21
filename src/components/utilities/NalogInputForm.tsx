import React from "react";
import { useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  Button,
  FormGroup,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { KonsigTable } from "./KonsigTable";

interface NalogInputProps {
  Item: any;
}

export const NalogInputForm: React.FC<NalogInputProps> = ({ Item }) => {
  const [isCheckedUplata, setCheckedUplata] = useState(true);
  const [isCheckedIsplata, setCheckedIsplata] = useState(false);

  const handleCheckboxChange = (event: any) => {
    const { name, checked } = event.target;
    if (name === "checkboxUplata") {
      setCheckedUplata(checked);
      setCheckedIsplata(false); // Uncheck checkboxB if checkboxA is checked
    } else if (name === "checkboxIsplata") {
      setCheckedIsplata(checked);
      setCheckedUplata(false); // Uncheck checkboxA if checkboxB is checked
    }
  };

  return (
    <>
      <Grid container justifyContent="space-evenly" alignItems="center">
        <Item>
          <Grid container spacing={4}>
            <Grid item>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isCheckedUplata}
                      onChange={handleCheckboxChange}
                    />
                  }
                  name="checkboxUplata"
                  label="Gotovinska uplata"
                />
              </FormGroup>
            </Grid>

            <Grid item>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isCheckedIsplata}
                      onChange={handleCheckboxChange}
                    />
                  }
                  name="checkboxIsplata"
                  label="Gotovinska isplata"
                />
              </FormGroup>
            </Grid>
          </Grid>
        </Item>
        <Item>
          <Grid container justifyContent="space-between" spacing={2}>
            <Grid item>
              <TextField
                disabled
                id="outlined-basic"
                value="EUR"
                variant="outlined"
                style={{ width: 65 }}
              />
            </Grid>

            <Grid item>
              <TextField id="outlined-basic" label="Iznos" variant="outlined" />
            </Grid>
          </Grid>
        </Item>
      </Grid>

      <Grid container justifyContent="space-evenly">
        <Grid item xs={12} md={5}>
          <Item>
            <Grid>
              <Grid container marginBottom={2}>
                <TextField
                  id="outlined-basic"
                  label="PLATITELJ"
                  variant="outlined"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid container justifyContent="space-between">
                <TextField
                  id="outlined-basic"
                  label="Adresa"
                  variant="outlined"
                />
                <TextField
                  id="outlined-basic"
                  label="Mjesto"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid marginBottom={6} marginTop={2}>
              <Grid container marginBottom={2}>
                <TextField
                  id="outlined-basic"
                  label="PRIMATELJ"
                  variant="outlined"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid container justifyContent="space-between">
                <TextField
                  id="outlined-basic"
                  label="Adresa"
                  variant="outlined"
                />
                <TextField
                  id="outlined-basic"
                  label="Mjesto"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="space-between" marginTop={8}>
              <Grid item>
                <TextField
                  id="outlined-basic"
                  label="Šifra opisa plaćanja"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-basic"
                  label="Šifra namjene"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="space-between" marginTop={2}>
              <Grid item>
                <TextField
                  id="outlined-basic"
                  label="Datum izvršenja"
                  variant="outlined"
                />
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-basic"
                  label="Datum podnošenja"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Item>
        </Grid>

        <Grid item justifyItems="center">
          <Item>
            <Grid marginBottom={4} marginTop={0}>
              <Typography style={{ fontWeight: "bold" }} variant="h5">
                Račun platitelja
              </Typography>
              <Grid container marginBottom={2} justifyContent="space-between">
                <TextField
                  disabled
                  id="outlined-basic"
                  value="HR"
                  variant="outlined"
                  style={{ width: 70 }}
                  sx={{
                    "& .MuiInputBase-root": {
                      "& input": {
                        textAlign: "center",
                      },
                    },
                  }}
                />
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  style={{ width: 70 }}
                />
                <TextField
                  id="outlined-basic"
                  label=""
                  variant="outlined"
                  style={{ width: "70%" }}
                />
              </Grid>
              <Grid container justifyContent="space-evenly">
                <Typography variant="h6">Model</Typography>
                <Typography variant="h6">Poziv na broj platitelja</Typography>
              </Grid>
              <Grid container justifyContent="space-between">
                <TextField
                  disabled
                  id="outlined-basic"
                  value="HR"
                  variant="outlined"
                  style={{ width: 70 }}
                  sx={{
                    "& .MuiInputBase-root": {
                      "& input": {
                        textAlign: "center",
                      },
                    },
                  }}
                />
                <TextField
                  disabled
                  id="outlined-basic"
                  variant="outlined"
                  value="99"
                  style={{ width: 70 }}
                  sx={{
                    "& .MuiInputBase-root": {
                      "& input": {
                        textAlign: "center",
                      },
                    },
                  }}
                />
                <TextField
                  id="outlined-basic"
                  label=""
                  variant="outlined"
                  style={{ width: "70%" }}
                />
              </Grid>
            </Grid>
            <Grid marginBottom={6} marginTop={2} justifyContent="center">
              <Typography style={{ fontWeight: "bold" }} variant="h5">
                Račun primatelja
              </Typography>
              <Grid container marginBottom={2} justifyContent="space-between">
                <TextField
                  disabled
                  id="outlined-basic"
                  value="HR"
                  variant="outlined"
                  style={{ width: 70 }}
                  sx={{
                    "& .MuiInputBase-root": {
                      "& input": {
                        textAlign: "center",
                      },
                    },
                  }}
                />
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  style={{ width: 70 }}
                />
                <TextField
                  id="outlined-basic"
                  label=""
                  variant="outlined"
                  style={{ width: "70%" }}
                />
              </Grid>
              <Grid container justifyContent="space-evenly">
                <Typography variant="h6">Model</Typography>
                <Typography variant="h6">Poziv na broj platitelja</Typography>
              </Grid>
              <Grid container justifyContent="space-between">
                <TextField
                  disabled
                  id="outlined-basic"
                  value="HR"
                  variant="outlined"
                  style={{ width: 70 }}
                  sx={{
                    "& .MuiInputBase-root": {
                      "& input": {
                        textAlign: "center",
                      },
                    },
                  }}
                />
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  style={{ width: 70 }}
                />
                <TextField
                  id="outlined-basic"
                  label=""
                  variant="outlined"
                  style={{ width: "70%" }}
                />
              </Grid>
            </Grid>
            <Grid container justifyContent="space-evenly" marginBottom={5}>
              <TextField
                id="outlined-basic"
                label="Opis plaćanja"
                variant="outlined"
                style={{ width: "100%" }}
              />
            </Grid>
            <Grid
              container
              justifyContent="space-between"
              marginTop={2}
              marginBottom={2}
            >
              <Grid container justifyContent="space-between">
                <Grid container justifyContent="space-evenly">
                  <Grid item alignItems="center" justifyContent="left">
                    <Typography variant="h6">Broj blagajne:</Typography>
                    <TextField
                      disabled
                      id="outlined-basic"
                      value="1"
                      variant="outlined"
                      style={{ width: 70 }}
                      sx={{
                        "& .MuiInputBase-root": {
                          "& input": {
                            textAlign: "center",
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item alignItems="center" justifyContent="left">
                    <Typography variant="h6">Vrsta naknade:</Typography>
                    <TextField
                      disabled
                      id="outlined-basic"
                      value={2}
                      variant="outlined"
                      style={{
                        width: 70,
                      }}
                      sx={{
                        "& .MuiInputBase-root": {
                          "& input": {
                            textAlign: "center",
                          },
                        },
                      }}
                    />
                  </Grid>
                  <Grid item alignItems="center">
                    <Typography variant="h6">Iznos naknade:</Typography>
                    <TextField
                      disabled
                      id="outlined-basic"
                      variant="outlined"
                      style={{ width: "100%" }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Item>
        </Grid>
        <Grid container justifyContent="center">
          <Item>
            <Grid item justifyContent="center">
              <Typography
                style={{ marginBottom: 4, fontWeight: "bold" }}
                variant="h5"
              >
                Konsignacija
              </Typography>
            </Grid>
            <Grid item justifyContent="center">
              <KonsigTable />
            </Grid>
          </Item>
        </Grid>
        <Grid container justifyContent="right">
          <Item>
            <Grid container justifyContent="space-between" spacing={2}>
              <Grid item>
                <Button
                  style={{ backgroundColor: "#e99516" }}
                  variant="contained"
                >
                  Pokušaj ponovno
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained">Spremi nalog</Button>
              </Grid>
            </Grid>
          </Item>
        </Grid>
      </Grid>
    </>
  );
};
