import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
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
          <Grid container justifyContent="center" spacing={2}>
            <Grid item xs={12} md={8} lg={12}>
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
