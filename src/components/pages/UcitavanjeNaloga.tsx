import React, { useState } from "react";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography,
} from "@mui/material";
import { UcitaniNaloziTbl } from "../utilities/ucitavanje/UcitaniNaloziTbl";
import { UcitavanjeNalogaBtnSet } from "../utilities/ucitavanje/UcitavanjeNalogaBtnSet";
import { KonsigTable } from "../utilities/konsignacija/KonsigTable";

interface UcitavanjeNalogaProps {
  Item: any;
}

export const UcitavanjeNaloga: React.FC<UcitavanjeNalogaProps> = ({ Item }) => {
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
    <>
      <Grid container justifyContent={"center"}>
        <Grid item xs={12}>
          <Item>
            <Typography
              variant="h2"
              fontWeight="bold"
              style={{ margin: "1rem" }}
            >
              DATOTEČNO UČITAVANJE NALOGA
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: -5, marginBottom: -5 }}>
          <Item>
            <Grid container justifyContent={"center"}>
              <Grid item xs={12} md={6} lg={4} sx={{ margin: -5, padding: 0 }}>
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
                          label="Datotečna uplata"
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
                          label="Datotečna isplata"
                        />
                      </FormGroup>
                    </Grid>
                  </Grid>
                </Item>
              </Grid>
              <Grid item marginBottom={"2%"} marginTop={"2%"} xs={10}>
                <UcitaniNaloziTbl />
              </Grid>

              <Grid item xs={10}>
                <KonsigTable />
              </Grid>
            </Grid>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <UcitavanjeNalogaBtnSet Item={Item} />
        </Grid>
      </Grid>
    </>
  );
};
