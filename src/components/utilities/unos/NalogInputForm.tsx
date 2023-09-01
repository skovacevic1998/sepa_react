import React, { useState } from "react";
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
import { useFormik } from "formik";
import * as yup from "yup";

interface NalogInputProps {
  Item: any;
}

export const NalogInputForm: React.FC<NalogInputProps> = ({ Item }) => {
  const [isCheckedUplata, setCheckedUplata] = useState(true);
  const [isCheckedIsplata, setCheckedIsplata] = useState(false);

  const [isUplata, setUplata] = useState(true);
  const [isIsplata, setIsplata] = useState(false);

  const handleCheckboxChange = (event: any) => {
    const { name } = event.target;
    if (name === "checkboxUplata") {
      setCheckedUplata(true);
      setCheckedIsplata(false);
      setUplata(true);
      setIsplata(false);
    } else if (name === "checkboxIsplata") {
      setCheckedIsplata(true);
      setCheckedUplata(false);
      setUplata(false);
      setIsplata(true);
    }
  };

  const validationSchema = yup.object({
    iznos: yup
      .number()
      .typeError("Iznos must be a number")
      .required("Iznos is required"),
    imePlat: yup.string().required("PLATITELJ is required"),
    adresaPlat: yup.string().required("Adresa is required"),
    mjestoPlat: yup.string().required("Mjesto is required"),
    imePrim: yup.string().required("PRIMATELJ is required"),
    adresaPrim: yup.string().required("Adresa is required"),
    mjestoPrim: yup.string().required("Mjesto is required"),
    sifOpisPlac: yup.string().required("Šifra opisa plaćanja is required"),
    sifNamjene: yup.string(),
    datIzvrsenja: yup.date().nullable(),
    datPodnosenja: yup.date().nullable(),
    drzavaPlat: yup.string(),
    kontrolniBrojPlat: yup.string(),
    pnbPlat: yup.string().required("Poziv na broj platitelja is required"),
    ibanPlat: yup.string(),
    modelPlat: yup.string(),
    pnbPrim: yup.string().required("Poziv na broj primatelja is required"),
    drzavaPrim: yup.string(),
    kontrolniBrojPrim: yup.string(),
    ibanPrim: yup.string(),
    modelPrim: yup.string(),
    opisPlac: yup.string().required("Opis plaćanja is required"),
    brBlagajne: yup.string(),
    vrNaknade: yup.string(),
    iznosNaknade: yup.number().typeError("Iznos naknade must be a number"),
  });

  const formik = useFormik({
    initialValues: {
      iznos: 0,
      imePlat: "",
      adresaPlat: "",
      mjestoPlat: "",
      imePrim: "",
      adresaPrim: "",
      mjestoPrim: "",
      sifOpisPlac: "",
      sifNamjene: "",
      datIzvrsenja: "",
      datPodnosenja: "",
      drzavaPlat: "",
      kontrolniBrojPlat: "",
      pnbPlat: "",
      ibanPlat: "",
      modelPlat: "",
      pnbPrim: "",
      drzavaPrim: "",
      kontrolniBrojPrim: "",
      ibanPrim: "",
      modelPrim: "",
      opisPlac: "",
      brBlagajne: "",
      vrNaknade: "",
      iznosNaknade: "",
    },
    validationSchema: validationSchema, // Combine schemas into a single object
    onSubmit: (values) => {
      // Handle form submission here
      console.log(values);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.handleSubmit(e);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
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
                  id="valutaPlacanja"
                  value="EUR"
                  variant="outlined"
                  style={{ width: 65 }}
                />
              </Grid>

              <Grid item xs>
                <TextField
                  label="Iznos"
                  variant="outlined"
                  type="text"
                  fullWidth
                  inputProps={{
                    inputMode: "decimal",
                    step: "0.01",
                    style: { textAlign: "right" },
                  }}
                  required
                  id="iznos"
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
                  id="imePlat"
                  label="PLATITELJ"
                  variant="outlined"
                  fullWidth
                  required
                  disabled={isIsplata}
                />
              </Grid>
              <Grid container spacing={4}>
                <Grid item xs>
                  <TextField
                    id="adresaPlat"
                    label="Adresa"
                    variant="outlined"
                    fullWidth
                    required
                    disabled={isIsplata}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    id="mjestoPlat"
                    label="Mjesto"
                    variant="outlined"
                    fullWidth
                    required
                    disabled={isIsplata}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid>
              <Grid item marginBottom={1} xs>
                <TextField
                  id="imePrim"
                  label="PRIMATELJ"
                  variant="outlined"
                  fullWidth
                  required
                  disabled={isUplata}
                />
              </Grid>
              <Grid container spacing={4}>
                <Grid item xs>
                  <TextField
                    id="adresaPrim"
                    label="Adresa"
                    variant="outlined"
                    fullWidth
                    required
                    disabled={isUplata}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    id="mjestoPrim"
                    label="Mjesto"
                    variant="outlined"
                    fullWidth
                    required
                    disabled={isUplata}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid container marginTop={1} marginBottom={1} spacing={4}>
              <Grid item xs>
                <TextField
                  id="sifOpisPlac"
                  label="Šifra opisa plaćanja"
                  variant="outlined"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs>
                <TextField
                  id="sifNamjene"
                  label="Šifra namjene"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs>
                <TextField
                  id="datIzvrsenja"
                  label="Datum izvršenja"
                  variant="outlined"
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs>
                <TextField
                  id="datPodnosenja"
                  label="Datum podnošenja"
                  variant="outlined"
                  fullWidth
                  disabled
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
              <Grid
                container
                marginBottom={2}
                justifyContent="left"
                spacing={1}
              >
                <Grid item>
                  <TextField
                    disabled
                    id="drzavaPlat"
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
                    id="kontrolniBrojPlat"
                    variant="outlined"
                    style={{ width: 70 }}
                    required
                    disabled={isUplata}
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    id="ibanPlat"
                    variant="outlined"
                    fullWidth
                    required
                    disabled={isUplata}
                  />
                </Grid>
              </Grid>

              <Grid container justifyContent="left" spacing={1}>
                <Grid item>
                  <TextField
                    disabled
                    id="drzavaPlat"
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
                    disabled={isUplata}
                    id="modelPlat"
                    variant="outlined"
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
                    id="pnbPlat"
                    variant="outlined"
                    label="Poziv na broj platitelja"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    disabled={isUplata}
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
                  id="drzavaPrim"
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
                  id="kontrolniBrojPrim"
                  variant="outlined"
                  style={{ width: 70 }}
                  disabled={isIsplata}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  id="ibanPrim"
                  variant="outlined"
                  fullWidth
                  required
                  disabled={isIsplata}
                />
              </Grid>
            </Grid>

            <Grid container justifyContent="left" spacing={1} marginBottom={6}>
              <Grid item>
                <TextField
                  disabled
                  id="drzavaPrim"
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
                  id="modelPrim"
                  variant="outlined"
                  style={{ width: 70 }}
                  label="Model"
                  InputLabelProps={{ shrink: true }}
                  required
                  disabled={isIsplata}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  id="pnbPrim"
                  variant="outlined"
                  label="Poziv na broj primatelja"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  required
                  disabled={isIsplata}
                />
              </Grid>
            </Grid>
            <Grid container marginBottom={6}>
              <TextField
                id="opisPlac"
                variant="outlined"
                label="Opis plaćanja"
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
              />
            </Grid>
            <Grid container marginTop={2} marginBottom={2}>
              <Grid container justifyContent="left" spacing={1}>
                <Grid item>
                  <TextField
                    disabled
                    id="brBlagajne"
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
                    id="vrNaknade"
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
                    id="iznosNaknade"
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
                  <Button variant="contained" type="submit">
                    Spremi nalog
                  </Button>
                </Grid>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};
