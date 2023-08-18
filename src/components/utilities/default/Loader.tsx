import React from "react";
import { CircularProgress, Grid } from "@mui/material";
import { Item } from "./Item";

interface LoaderProps {
  text?: string;
}

export const Loader: React.FC<LoaderProps> = ({ text }) => {
  return (
    <>
      <Item sx={{ margin: 0, borderRadius: 0, height: "100vh", padding: 0 }}>
        <Grid
          container
          sx={{
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid item xs={12} md={12} lg={12}>
            <CircularProgress />
          </Grid>
        </Grid>
      </Item>
    </>
  );
};
