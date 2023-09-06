import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import axios from "axios";

interface ThirdSectionProps {
  Item: any;
  isUplata: boolean;
  isIsplata: boolean;
  formik: any;
}

export const ThirdSection: React.FC<ThirdSectionProps> = ({
  Item,
  isIsplata,
  isUplata,
  formik,
}) => {
  const handleIbanPrimBlur = async () => {
    const drzavaRac = formik.values.drzavaRac;
    const kontrolniBrojRac = formik.values.kontrolniBrojPrim;
    const ibanRac = formik.values.ibanPrim;

    try {
      const response = await axios.post(
        "http://localhost:8080/api/getRacunInfo",
        {
          drzavaRac,
          kontrolniBrojRac,
          ibanRac,
        }
      );

      if (response.data && response.data !== "") {
        const ime = response.data.ime;
        const adresa = response.data.adresa;
        const mjesto = response.data.mjesto;

        formik.setFieldValue("imePrim", ime);
        formik.setFieldValue("adresaPrim", adresa);
        formik.setFieldValue("mjestoPrim", mjesto);

        const naknadaResponse = await axios.post(
          "http://localhost:8080/api/getNaknada",
          {
            ibanRac,
          }
        );

        if (naknadaResponse.data && naknadaResponse.data !== "") {
          const vrstaNaknade = naknadaResponse.data.vrstaNaknade;
          const iznosNaknade = naknadaResponse.data.iznosNaknade;

          formik.setFieldValue("vrNaknade", vrstaNaknade);
          formik.setFieldValue("iznosNaknade", iznosNaknade);
        }
      }
    } catch (error) {
      console.error("Error fetching iban_prim:", error);
    }
  };

  const handleIbanPlatBlur = async () => {
    const drzavaRac = formik.values.drzavaRac;
    const kontrolniBrojRac = formik.values.kontrolniBrojPlat;
    const ibanRac = formik.values.ibanPlat;

    try {
      const response = await axios.post(
        "http://localhost:8080/api/getRacunInfo",
        {
          drzavaRac,
          kontrolniBrojRac,
          ibanRac,
        }
      );

      if (response.data && response.data !== "") {
        const ime = response.data.ime;
        const adresa = response.data.adresa;
        const mjesto = response.data.mjesto;

        formik.setFieldValue("imePlat", ime);
        formik.setFieldValue("adresaPlat", adresa);
        formik.setFieldValue("mjestoPlat", mjesto);

        const naknadaResponse = await axios.post(
          "http://localhost:8080/api/getNaknada",
          {
            ibanRac,
          }
        );

        if (naknadaResponse.data && naknadaResponse.data !== "") {
          const vrstaNaknade = naknadaResponse.data.vrstaNaknade;
          const iznosNaknade = naknadaResponse.data.iznosNaknade;

          formik.setFieldValue("vrNaknade", vrstaNaknade);
          formik.setFieldValue("iznosNaknade", iznosNaknade);
        }
      }
    } catch (error) {
      console.error("Error fetching iban_plat:", error);
    }
  };

  return (
    <>
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
                  id="drzavaRac"
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
                  disabled={isIsplata}
                  value={formik.values.kontrolniBrojPlat}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.kontrolniBrojPlat &&
                    Boolean(formik.errors.kontrolniBrojPlat)
                  }
                  helperText={
                    formik.touched.kontrolniBrojPlat &&
                    formik.errors.kontrolniBrojPlat
                  }
                />
              </Grid>
              <Grid item xs>
                <TextField
                  id="ibanPlat"
                  variant="outlined"
                  fullWidth
                  required
                  disabled={isIsplata}
                  value={formik.values.ibanPlat}
                  onChange={formik.handleChange}
                  onBlur={handleIbanPlatBlur}
                  error={
                    formik.touched.ibanPlat && Boolean(formik.errors.ibanPlat)
                  }
                  helperText={formik.touched.ibanPlat && formik.errors.ibanPlat}
                />
              </Grid>
            </Grid>

            <Grid container justifyContent="left" spacing={1}>
              <Grid item>
                <TextField
                  disabled
                  id="drzavaRac"
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
                  disabled={isIsplata}
                  id="modelPlat"
                  variant="outlined"
                  style={{ width: 70 }}
                  label="Model"
                  InputLabelProps={{ shrink: true }}
                  required
                  sx={{
                    "& .MuiInputBase-root": {
                      "& input": {
                        textAlign: "center",
                      },
                    },
                  }}
                  value={formik.values.modelPlat}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.modelPlat && Boolean(formik.errors.modelPlat)
                  }
                  helperText={
                    formik.touched.modelPlat && formik.errors.modelPlat
                  }
                />
              </Grid>
              <Grid item xs>
                <TextField
                  id="pnbPlat"
                  variant="outlined"
                  label="Poziv na broj platitelja"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  disabled={isIsplata || formik.values.modelPlat === "99"}
                  value={formik.values.pnbPlat}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.pnbPlat && Boolean(formik.errors.pnbPlat)
                  }
                  helperText={formik.touched.pnbPlat && formik.errors.pnbPlat}
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
                id="drzavaRac"
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
                required
                disabled={isUplata}
                value={formik.values.kontrolniBrojPrim}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.kontrolniBrojPrim &&
                  Boolean(formik.errors.kontrolniBrojPrim)
                }
                helperText={
                  formik.touched.kontrolniBrojPrim &&
                  formik.errors.kontrolniBrojPrim
                }
              />
            </Grid>
            <Grid item xs>
              <TextField
                id="ibanPrim"
                variant="outlined"
                fullWidth
                required
                disabled={isUplata}
                value={formik.values.ibanPrim}
                onChange={formik.handleChange}
                onBlur={handleIbanPrimBlur}
                error={
                  formik.touched.ibanPrim && Boolean(formik.errors.ibanPrim)
                }
                helperText={formik.touched.ibanPrim && formik.errors.ibanPrim}
              />
            </Grid>
          </Grid>

          <Grid container justifyContent="left" spacing={1} marginBottom={6}>
            <Grid item>
              <TextField
                disabled
                id="drzavaRac"
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
                disabled={isUplata}
                value={formik.values.modelPrim}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.modelPrim && Boolean(formik.errors.modelPrim)
                }
                helperText={formik.touched.modelPrim && formik.errors.modelPrim}
              />
            </Grid>
            <Grid item xs>
              <TextField
                id="pnbPrim"
                variant="outlined"
                label="Poziv na broj primatelja"
                InputLabelProps={{ shrink: true }}
                fullWidth
                disabled={isUplata || formik.values.modelPrim === "99"}
                value={formik.values.pnbPrim}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.pnbPrim && Boolean(formik.errors.pnbPrim)}
                helperText={formik.touched.pnbPrim && formik.errors.pnbPrim}
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
              disabled={formik.values.sifOpisPlac !== 0}
              value={formik.values.opisPlac}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.opisPlac && Boolean(formik.errors.opisPlac)}
              helperText={formik.touched.opisPlac && formik.errors.opisPlac}
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
                  value={formik.values.brBlagajne}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.brBlagajne &&
                    Boolean(formik.errors.brBlagajne)
                  }
                  helperText={
                    formik.touched.brBlagajne && formik.errors.brBlagajne
                  }
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
                  value={formik.values.vrNaknade}
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
                  value={formik.values.iznosNaknade}
                />
              </Grid>
            </Grid>
          </Grid>
        </Item>
      </Grid>
    </>
  );
};
