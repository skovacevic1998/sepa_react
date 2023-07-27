import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { PregledTable } from "../utilities/PregledTable";

interface ThemeProp {
  Item: any;
}

export const PregledNaloga: React.FC<ThemeProp> = ({ Item }) => {
  return (
    <>
      <Grid container spacing={0} justifyContent={"center"} marginTop={2}>
        <Grid item width={"50%"} height={"100%"} xs={10}>
          <Box
            sx={{
              width: "100%",
              justifyContent: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="h1" gutterBottom>
              Pregled naloga
            </Typography>
          </Box>
          <Item>
            <PregledTable />
          </Item>
        </Grid>
      </Grid>
    </>
  );
};
