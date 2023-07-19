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
                  Unos naloga
                </Typography>
              </Box>
              <div
                style={{ boxShadow: "5px 5px 15px #aeaead", marginBottom: 30 }}
              >
                <NalogInputForm Item={Item} />
              </div>
            </Grid>
          </Grid>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};
