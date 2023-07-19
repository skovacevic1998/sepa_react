import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Grid } from "@mui/material";

interface ThemeProp {
  colorMode: any;
  theme: any;
  ColorModeContext: any;
  Item: any;
}

export const Homepage: React.FC<ThemeProp> = ({
  colorMode,
  theme,
  ColorModeContext,
  Item,
}) => {
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Grid container spacing={0} justifyContent={"center"} marginTop={2}>
            <Grid width={"50%"} height={"100%"} xs={10}>
              <Item>Homepage</Item>
            </Grid>
          </Grid>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};
