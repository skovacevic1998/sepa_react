import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Grid, Box, Typography } from "@mui/material";
import { NalogInputForm } from "../utilities/NalogInputForm";

interface ThemeProp {
  colorMode: any;
  theme: any;
  ColorModeContext: any;
  Item: any;
}

export const UnosNaloga: React.FC<ThemeProp> = ({
  colorMode,
  theme,
  ColorModeContext,
  Item,
}) => {
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Grid container justifyContent="center">
            <Grid item>
              <Item>
                <Typography variant="h2" fontWeight="bold">
                  UNOS GOTOVINSKIH NALOGA
                </Typography>
              </Item>
              <Item>
                <NalogInputForm Item={Item} />
              </Item>
            </Grid>
          </Grid>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};
