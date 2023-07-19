import React from "react";
import { Grid, TextField, Typography, Button } from "@mui/material";
import { PregledTable } from "./PregledTable";
import { KonsigTable } from "./KonsigTable";

interface NalogInputProps {
  Item: any;
}

export const NalogInputForm: React.FC<NalogInputProps> = ({ Item }) => (
  <>
    <Grid container justifyContent="right">
      <Item>
        <Grid item>
          <TextField
            disabled
            id="outlined-basic"
            value="EUR"
            variant="outlined"
            style={{ marginRight: 10, width: 65 }}
          />
          <TextField id="outlined-basic" label="Iznos" variant="outlined" />
        </Grid>
      </Item>
    </Grid>

    <Grid container justifyContent="space-between">
      <Grid item xs={5}>
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
        <Grid item>
          <Item>
            <Typography
              style={{ marginBottom: 20, fontWeight: "bold" }}
              variant="h5"
            >
              Konsignacija
            </Typography>
            <Grid item>
              <KonsigTable />
            </Grid>
          </Item>
        </Grid>
      </Grid>

      <Grid item xs={5} justifyItems="center">
        <Item>
          <Grid marginBottom={6} marginTop={2}>
            <Typography
              style={{ marginBottom: 30, fontWeight: "bold" }}
              variant="h5"
            >
              Račun platitelja
            </Typography>
            <Grid container marginBottom={2}>
              <TextField
                disabled
                id="outlined-basic"
                value="HR"
                variant="outlined"
                style={{ marginRight: 10, width: 70 }}
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
                style={{ marginRight: 10, width: 70 }}
              />
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                style={{ marginRight: 10, width: "70%" }}
              />
            </Grid>
            <Grid container>
              <Typography
                variant="h6"
                style={{ marginRight: 120, marginLeft: 85 }}
              >
                Model
              </Typography>
              <Typography variant="h6">Poziv na broj platitelja</Typography>
            </Grid>
            <Grid container>
              <TextField
                disabled
                id="outlined-basic"
                value="HR"
                variant="outlined"
                style={{ marginRight: 10, width: 70 }}
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
                style={{ marginRight: 10, width: 70 }}
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
                style={{ marginRight: 10, width: "70%" }}
              />
            </Grid>
          </Grid>
          <Grid marginBottom={6} marginTop={2}>
            <Typography
              style={{ marginBottom: 30, fontWeight: "bold" }}
              variant="h5"
            >
              Račun primatelja
            </Typography>
            <Grid container marginBottom={2}>
              <TextField
                disabled
                id="outlined-basic"
                value="HR"
                variant="outlined"
                style={{ marginRight: 10, width: 70 }}
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
                style={{ marginRight: 10, width: 70 }}
              />
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                style={{ marginRight: 10, width: "70%" }}
              />
            </Grid>
            <Grid container>
              <Typography variant="h6" style={{ marginRight: 110 }}>
                Model
              </Typography>
              <Typography variant="h6">Poziv na broj platitelja</Typography>
            </Grid>
            <Grid container>
              <TextField
                disabled
                id="outlined-basic"
                value="HR"
                variant="outlined"
                style={{ marginRight: 10, width: 70 }}
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
                style={{ marginRight: 10, width: 70 }}
              />
              <TextField
                id="outlined-basic"
                label=""
                variant="outlined"
                style={{ marginRight: 10, width: "70%" }}
              />
            </Grid>
          </Grid>
          <Grid container justifyContent="space-between">
            <TextField
              id="outlined-basic"
              label="Opis plaćanja"
              variant="outlined"
              style={{ marginRight: 10, width: "100%", marginBottom: 10 }}
            />
          </Grid>
          <Grid
            container
            justifyContent="space-between"
            marginTop={2}
            marginBottom={2}
          >
            <Grid container alignItems="center">
              <Grid container alignItems="center">
                <Typography variant="h6">Br. blag.</Typography>
                <TextField
                  disabled
                  id="outlined-basic"
                  value="1"
                  variant="outlined"
                  style={{ width: 70, marginLeft: "1%", marginRight: "2%" }}
                  sx={{
                    "& .MuiInputBase-root": {
                      "& input": {
                        textAlign: "center",
                      },
                    },
                  }}
                />

                <Typography variant="h6">Vrsta nak.</Typography>
                <TextField
                  disabled
                  id="outlined-basic"
                  value={2}
                  variant="outlined"
                  style={{
                    textAlign: "center",
                    width: 70,
                    marginLeft: "2%",
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
              <Grid container marginTop={2} marginBottom={-2}>
                <Typography variant="h6">Iznos naknade</Typography>
                <TextField
                  disabled
                  id="outlined-basic"
                  variant="outlined"
                  style={{ width: "100%" }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Item>
      </Grid>
      <Grid container justifyContent="right">
        <Grid
          item
          margin={2}
          padding={1}
          style={{ boxShadow: "5px 5px 15px gray" }}
        >
          <Button
            style={{ marginRight: 6, backgroundColor: "#e99516" }}
            variant="contained"
          >
            Pokušaj ponovno
          </Button>
          <Button variant="contained">Spremi nalog</Button>
        </Grid>
      </Grid>
    </Grid>
  </>
);
