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
import { KonsigTable } from "../konsignacija/KonsigTable";

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
      setCheckedIsplata(false);
    } else if (name === "checkboxIsplata") {
      setCheckedIsplata(checked);
      setCheckedUplata(false);
    }
  };

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={6} lg={4}>
        <Item>
          <Grid container justifyContent="space-evenly">
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
      </Grid>

      <Grid item xs={12} md={6} lg={4}>
        <Item>
          <Grid container justifyContent="center" spacing={1}>
            <Grid item>
              <TextField
                disabled
                id="outlined-basic"
                value="EUR"
                variant="outlined"
                style={{ width: 65 }}
              />
            </Grid>

            <Grid item xs>
              <TextField
                id="outlined-basic"
                label="Iznos"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
        </Item>
      </Grid>

      <Grid item xs={12} md={6} lg={5}>
        <Item>
          <Grid container justifyContent="left" marginBottom={4}>
            <Grid item xs marginBottom={1}>
              <TextField
                id="outlined-basic"
                label="PLATITELJ"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs>
                <TextField
                  id="outlined-basic"
                  label="Adresa"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs>
                <TextField
                  id="outlined-basic"
                  label="Mjesto"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid>
            <Grid item marginBottom={1} xs>
              <TextField
                id="outlined-basic"
                label="PRIMATELJ"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs>
                <TextField
                  id="outlined-basic"
                  label="Adresa"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs>
                <TextField
                  id="outlined-basic"
                  label="Mjesto"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid container marginTop={1} marginBottom={1} spacing={4}>
            <Grid item xs>
              <TextField
                id="outlined-basic"
                label="Šifra opisa plaćanja"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs>
              <TextField
                id="outlined-basic"
                label="Šifra namjene"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs>
              <TextField
                id="outlined-basic"
                label="Datum izvršenja"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs>
              <TextField
                id="outlined-basic"
                label="Datum podnošenja"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
        </Item>
      </Grid>

      <Grid item xs={12} md={6} lg={5}>
        <Item>
          <Grid marginBottom={4} item>
            <Typography style={{ fontWeight: "bold" }} variant="h5">
              Račun platitelja
            </Typography>
            <Grid container marginBottom={2} justifyContent="left" spacing={1}>
              <Grid item>
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
              </Grid>
              <Grid item>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  style={{ width: 70 }}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  id="outlined-basic"
                  label=""
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>

            <Grid container justifyContent="left" spacing={1}>
              <Grid item>
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
              </Grid>
              <Grid item>
                <TextField
                  disabled
                  id="outlined-basic"
                  variant="outlined"
                  value="99"
                  style={{ width: 70 }}
                  label="Model"
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    "& .MuiInputBase-root": {
                      "& input": {
                        textAlign: "center",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  label="Poziv na broj platitelja"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Typography style={{ fontWeight: "bold" }} variant="h5">
              Račun primatelja
            </Typography>
          </Grid>
          <Grid container marginBottom={2} justifyContent="left" spacing={1}>
            <Grid item>
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
            </Grid>
            <Grid item>
              <TextField
                id="outlined-basic"
                variant="outlined"
                style={{ width: 70 }}
              />
            </Grid>
            <Grid item xs>
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>

          <Grid container justifyContent="left" spacing={1} marginBottom={6}>
            <Grid item>
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
            </Grid>
            <Grid item>
              <TextField
                id="outlined-basic"
                variant="outlined"
                style={{ width: 70 }}
                label="Model"
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs>
              <TextField
                id="outlined-basic"
                variant="outlined"
                label="Poziv na broj primatelja"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
            </Grid>
          </Grid>
          <Grid container marginBottom={6}>
            <TextField
              id="outlined-basic"
              variant="outlined"
              label="Opis plaćanja"
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Grid>
          <Grid container marginTop={2} marginBottom={2}>
            <Grid container justifyContent="left" spacing={1}>
              <Grid item>
                <TextField
                  disabled
                  id="outlined-basic"
                  value="1"
                  variant="outlined"
                  style={{ width: 100 }}
                  label="Broj blagajne"
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    "& .MuiInputBase-root": {
                      "& input": {
                        textAlign: "center",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  disabled
                  id="outlined-basic"
                  value={2}
                  variant="outlined"
                  style={{
                    width: 100,
                  }}
                  label="Vrsta naknade"
                  InputLabelProps={{ shrink: true }}
                  sx={{
                    "& .MuiInputBase-root": {
                      "& input": {
                        textAlign: "center",
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  disabled
                  id="outlined-basic"
                  variant="outlined"
                  label="Iznos naknade"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
        </Item>
      </Grid>

      <Grid container justifyContent="center">
        <Grid item xs={10} md={10} lg={10}>
          <Item>
            <Grid item justifyContent="center">
              <Typography
                style={{ marginBottom: 15, fontWeight: "bold" }}
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
      </Grid>

      <Grid container justifyContent="right">
        <Grid item xs={12} md={8} lg={3} justifyContent="center">
          <Item>
            <Grid container justifyContent="space-evenly" spacing={2}>
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
    </Grid>
  );
};
