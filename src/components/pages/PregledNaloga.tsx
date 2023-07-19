import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Grid, Box, Typography } from "@mui/material";
import { PregledTable } from "../utilities/PregledTable";

interface ThemeProp {
  colorMode: any;
  theme: any;
  ColorModeContext: any;
  Item: any;
}

export const PregledNaloga: React.FC<ThemeProp> = ({
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
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};
