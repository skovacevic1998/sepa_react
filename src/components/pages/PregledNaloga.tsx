import React from "react";
import { Grid, Typography } from "@mui/material";
import { PregledTable } from "../utilities/pregled/PregledTable";

interface ThemeProp {
  Item: any;
}

export const PregledNaloga: React.FC<ThemeProp> = ({ Item }) => {
  return (
    <>
      <Grid container spacing={0} justifyContent={"center"} marginTop={2}>
        <Grid item xs={12}>
          <Item>
            <Typography
              variant="h2"
              fontWeight="bold"
              style={{ margin: "1rem" }}
            >
              PREGLED UNESENIH NALOGA
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={10} sx={{ marginTop: -5 }}>
          <Item>
            <PregledTable />
          </Item>
        </Grid>
      </Grid>
    </>
  );
};
