import React from "react";
import { Grid } from "@mui/material";

interface ThemeProp {
  Item: any;
}

export const ErrorPage: React.FC<ThemeProp> = ({ Item }) => {
  return (
    <>
      <Grid container spacing={0} justifyContent={"center"} marginTop={2}>
        <Grid item width={"50%"} height={"100%"} xs={10}>
          <Item>Error page!</Item>
        </Grid>
      </Grid>
    </>
  );
};
