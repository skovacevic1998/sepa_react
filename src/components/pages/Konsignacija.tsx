import React from "react";
import { Grid, Typography } from "@mui/material";
import { KonsigTable } from "../utilities/konsignacija/KonsigTable";
import { KonsigBtnSet } from "../utilities/konsignacija/KonsigBtnSet";

interface ThemeProp {
  Item: any;
}
export const Konsignacija: React.FC<ThemeProp> = ({ Item }) => {
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
              KONSIGNACIJA UNESENIH NALOGA
            </Typography>
          </Item>
        </Grid>
        <Grid item sx={{ marginTop: -5, marginBottom: -5 }}>
          <Item>
            <KonsigTable enableCheckboxSelection={true} />
          </Item>
        </Grid>
        <Grid item xs={12}>
          <KonsigBtnSet Item={Item} />
        </Grid>
      </Grid>
    </>
  );
};
