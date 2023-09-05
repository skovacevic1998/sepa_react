import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

interface FirstSectionProps {
  Item: any;
  isCheckedUplata: boolean;
  isCheckedIsplata: boolean;
  handleCheckboxChange: any;
  formik: any;
}

export const FirstSection: React.FC<FirstSectionProps> = ({
  Item,
  isCheckedUplata,
  handleCheckboxChange,
  isCheckedIsplata,
  formik,
}) => {
  return (
    <>
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
                fullWidth
                required
                id="iznos"
                type="text"
                value={formik.values.iznos}
                onChange={(e) => {
                  let sanitizedValue = e.target.value.replace(/^0+/, "");
                  sanitizedValue = sanitizedValue || "0";
                  sanitizedValue = sanitizedValue.replace(/[^0-9.]/g, "");
                  formik.handleChange("iznos")(sanitizedValue);
                }}
                onBlur={formik.handleBlur}
                error={formik.touched.iznos && Boolean(formik.errors.iznos)}
                helperText={formik.touched.iznos && formik.errors.iznos}
                inputProps={{
                  inputMode: "numeric",
                  style: { textAlign: "right" },
                }}
              />
            </Grid>
          </Grid>
        </Item>
      </Grid>
    </>
  );
};
