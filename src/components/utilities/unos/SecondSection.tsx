import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import axios from "axios";

interface SecondSectionProps {
  Item: any;
  isUplata: boolean;
  isIsplata: boolean;
  formik: any;
}

export const SecondSection: React.FC<SecondSectionProps> = ({
  Item,
  isUplata,
  isIsplata,
  formik,
}) => {
  const [sifNamjeneOptions, setSifNamjeneOptions] = useState<any[]>([]);
  const [openSifNamjeneDropdown, setOpenSifNamjeneDropdown] = useState(false);

  const [sifOpisPlacanjaOptions, setSifOpisPlacanjaOptions] = useState<
    {
      value: number;
      sif_opis_plac: number;
      opis: string;
    }[]
  >([]);

  const [openSifOpisPlacanjaDropdown, setOpenSifOpisPlacanjaDropdown] =
    useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseNamjene = await axios.get(
          "http://localhost:8080/api/getSifNamjene"
        );

        const optionsNamjene = responseNamjene.data.map((option: any) => ({
          value: option.sif_namjene,
          label: `${option.sif_namjene} - ${option.opis}`,
        }));

        setSifNamjeneOptions(optionsNamjene);
      } catch (error) {
        console.error("Error fetching sifNamjene options:", error);
      }

      try {
        const responseOpisPlacanja = await axios.get(
          "http://localhost:8080/api/getSifOpisPlacanja"
        );

        const optionsOpisPlacanja = responseOpisPlacanja.data.map(
          (option: any) => ({
            sif_opis_plac: option.sif_opis_plac,
            opis: option.opis,
          })
        );

        setSifOpisPlacanjaOptions(optionsOpisPlacanja);
      } catch (error) {
        console.error("Error fetching sifOpisPlacanja options:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Grid item xs={12} md={6} lg={5}>
        <Item>
          <Grid container justifyContent="left" marginBottom={4}>
            <Grid item xs marginBottom={1}>
              <TextField
                id="imePlat"
                name="imePlat"
                label="PLATITELJ"
                variant="outlined"
                fullWidth
                required
                disabled={isIsplata}
                value={formik.values.imePlat}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.imePlat && Boolean(formik.errors.imePlat)}
                helperText={formik.touched.imePlat && formik.errors.imePlat}
              />
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs>
                <TextField
                  id="adresaPlat"
                  name="adresaPlat"
                  label="Adresa"
                  variant="outlined"
                  fullWidth
                  required
                  disabled={isIsplata}
                  value={formik.values.adresaPlat}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.adresaPlat &&
                    Boolean(formik.errors.adresaPlat)
                  }
                  helperText={
                    formik.touched.adresaPlat && formik.errors.adresaPlat
                  }
                />
              </Grid>
              <Grid item xs>
                <TextField
                  id="mjestoPlat"
                  name="mjestoPlat"
                  label="Mjesto"
                  variant="outlined"
                  fullWidth
                  required
                  disabled={isIsplata}
                  value={formik.values.mjestoPlat}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.mjestoPlat &&
                    Boolean(formik.errors.mjestoPlat)
                  }
                  helperText={
                    formik.touched.mjestoPlat && formik.errors.mjestoPlat
                  }
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid>
            <Grid item marginBottom={1} xs>
              <TextField
                id="imePrim"
                name="imePrim"
                label="PRIMATELJ"
                variant="outlined"
                fullWidth
                required
                disabled={isUplata}
                value={formik.values.imePrim}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.imePrim && Boolean(formik.errors.imePrim)}
                helperText={formik.touched.imePrim && formik.errors.imePrim}
              />
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs>
                <TextField
                  id="adresaPrim"
                  name="adresaPrim"
                  label="Adresa"
                  variant="outlined"
                  fullWidth
                  required
                  disabled={isUplata}
                  value={formik.values.adresaPrim}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.adresaPrim &&
                    Boolean(formik.errors.adresaPrim)
                  }
                  helperText={
                    formik.touched.adresaPrim && formik.errors.adresaPrim
                  }
                />
              </Grid>
              <Grid item xs>
                <TextField
                  id="mjestoPrim"
                  name="mjestoPrim"
                  label="Mjesto"
                  variant="outlined"
                  fullWidth
                  required
                  disabled={isUplata}
                  value={formik.values.mjestoPrim}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.mjestoPrim &&
                    Boolean(formik.errors.mjestoPrim)
                  }
                  helperText={
                    formik.touched.mjestoPrim && formik.errors.mjestoPrim
                  }
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid container marginTop={1} marginBottom={1} spacing={4}>
            <Grid item xs>
              <FormControl variant="outlined" fullWidth required>
                <InputLabel id="sifOpisPlacanja-label">
                  Šifra opisa plaćanja
                </InputLabel>
                <Select
                  labelId="sifOpisPlacanja-label"
                  id="sifOpisPlac"
                  name="sifOpisPlac"
                  label="Šifra opisa plaćanja"
                  open={openSifOpisPlacanjaDropdown}
                  onOpen={() => setOpenSifOpisPlacanjaDropdown(true)}
                  onClose={() => setOpenSifOpisPlacanjaDropdown(false)}
                  value={formik.values.sifOpisPlac}
                  onChange={(e) => {
                    formik.setFieldValue("sifOpisPlac", e.target.value);

                    const selectedOption = sifOpisPlacanjaOptions.find(
                      (option) =>
                        option.sif_opis_plac === Number(e.target.value)
                    );

                    if (selectedOption && selectedOption.sif_opis_plac !== 0) {
                      formik.setFieldValue("opisPlac", selectedOption.opis);
                    } else {
                      formik.setFieldValue("opisPlac", "");
                    }
                  }}
                  onBlur={formik.handleBlur}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {sifOpisPlacanjaOptions.map((option) => (
                    <MenuItem
                      key={option.sif_opis_plac}
                      value={option.sif_opis_plac}
                      style={{
                        textAlign: openSifOpisPlacanjaDropdown
                          ? "left"
                          : "center",
                      }}
                    >
                      {openSifOpisPlacanjaDropdown
                        ? `${option.sif_opis_plac} - ${option.opis}`
                        : option.sif_opis_plac}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="sifNamjene-label">Šifra namjene</InputLabel>
                <Select
                  labelId="sifNamjene-label"
                  id="sifNamjene"
                  name="sifNamjene"
                  label="Šifra namjene"
                  open={openSifNamjeneDropdown}
                  onOpen={() => setOpenSifNamjeneDropdown(true)}
                  onClose={() => setOpenSifNamjeneDropdown(false)}
                  value={formik.values.sifNamjene}
                  onChange={(e) => {
                    formik.setFieldValue("sifNamjene", e.target.value);
                  }}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.sifNamjene &&
                    Boolean(formik.errors.sifNamjene)
                  }
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {sifNamjeneOptions.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      style={{
                        textAlign: openSifNamjeneDropdown ? "left" : "center",
                      }}
                    >
                      {openSifNamjeneDropdown ? option.label : option.value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs>
              <TextField
                id="datIzvrsenja"
                name="datIzvrsenja"
                label="Datum izvršenja"
                variant="outlined"
                fullWidth
                disabled
                value={formik.values.datIzvrsenja}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.datIzvrsenja &&
                  Boolean(formik.errors.datIzvrsenja)
                }
                helperText={
                  formik.touched.datIzvrsenja && formik.errors.datIzvrsenja
                }
              />
            </Grid>
            <Grid item xs>
              <TextField
                id="datPodnosenja"
                name="datPodnosenja"
                label="Datum podnošenja"
                variant="outlined"
                fullWidth
                disabled
                value={formik.values.datPodnosenja}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.datPodnosenja &&
                  Boolean(formik.errors.datPodnosenja)
                }
                helperText={
                  formik.touched.datPodnosenja && formik.errors.datPodnosenja
                }
              />
            </Grid>
          </Grid>
        </Item>
      </Grid>
    </>
  );
};
