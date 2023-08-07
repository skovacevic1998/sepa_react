import React from "react";
import { Grid } from "@mui/material";

interface UcitavanjeNalogaProps {
  Item: any;
}

export const UcitavanjeNaloga: React.FC<UcitavanjeNalogaProps> = ({ Item }) => {
  return (
    <>
      <Grid container spacing={0} justifyContent={"center"} marginTop={2}>
        <Grid item width={"50%"} height={"100%"} xs={10}>
          <Item>Učitavanje naloga</Item>
        </Grid>
      </Grid>
    </>
  );
};
