import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Grid, Typography } from "@mui/material";
import { FinanceMediaCard1 } from "../utilities/homepage/FinanceMediaCard1";
import { FinanceMediaCard2 } from "../utilities/homepage/FinanceMediaCard2";
import { FinanceMediaCard3 } from "../utilities/homepage/FinanceMediaCard3";

interface ThemeProp {
  colorMode: any;
  theme: any;
  ColorModeContext: any;
  Item: any; // Assuming Item is a custom component to render its children
  getBackgroundColor: any;
}

export const Homepage: React.FC<ThemeProp> = ({
  colorMode,
  theme,
  ColorModeContext,
  Item,
  getBackgroundColor,
}) => {
  return (
    <Grid>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <Grid container justifyContent="center">
            {/* First row */}
            <Grid item xs={12} sm={12}>
              <Item>
                <Typography variant="h1">
                  Upravljajte svojim svijetom financija
                </Typography>
              </Item>
            </Grid>

            {/* Second row */}
            <Grid
              item
              marginBottom={5}
              xs={10}
              sm={10}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Grid container>
                <Grid item>
                  <FinanceMediaCard1 getBackgroundColor={getBackgroundColor} />
                </Grid>
                <Grid item sm={4}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="space-between" /* Push the content to the bottom */
                    style={{
                      height: "100%",
                    }} /* Ensure this inner container takes the full height */
                  >
                    <Grid item>
                      {/* Your content here, which will be positioned at the top */}
                    </Grid>
                    <Grid item>
                      <div
                        style={{
                          background: getBackgroundColor(),
                          display: "flex",
                          flexDirection: "column",
                          height:
                            "100%" /* Ensure the container takes the full height of its parent */,
                          borderRadius: "0px 5px 5px 0px",
                          padding: 10,
                          textAlign: "justify",
                          zIndex: -1,
                        }}
                      >
                        <Typography variant="h6">
                          S našim jednostavnim sučeljem, obavljanje transakcija
                          nikada nije bilo lakše. Dovoljan je samo jedan klik da
                          obavite svoj posao.
                        </Typography>
                      </div>
                      {/* This is an empty item that will push the content to the bottom */}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* Third row */}
            <Grid
              item
              marginBottom={5}
              xs={10}
              sm={10}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Grid container justifyContent={"right"}>
                <Grid item sm={4}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="space-between" /* Push the content to the bottom */
                    style={{
                      height: "100%",
                    }} /* Ensure this inner container takes the full height */
                  >
                    <Grid item>
                      {/* Your content here, which will be positioned at the top */}
                    </Grid>
                    <Grid item>
                      <div
                        style={{
                          background: getBackgroundColor(),
                          display: "flex",
                          flexDirection: "column",
                          height:
                            "100%" /* Ensure the container takes the full height of its parent */,
                          borderRadius: "5px 0px 0px 5px",
                          padding: 10,
                          textAlign: "justify",
                        }}
                      >
                        <Typography variant="h6">
                          Obavljajte, upravljajte ili pregledavajte transakcije
                          koristeći naše sučelje, učitajte ih putem datoteke ili
                          čak upravljajte svojim korisničkim profilom - sve je
                          na vama.
                        </Typography>
                      </div>
                      {/* This is an empty item that will push the content to the bottom */}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <FinanceMediaCard2 getBackgroundColor={getBackgroundColor} />
                </Grid>
              </Grid>
            </Grid>

            {/* Forth row */}
            <Grid
              item
              marginBottom={5}
              xs={10}
              sm={10}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Grid container>
                <Grid item>
                  <FinanceMediaCard3 getBackgroundColor={getBackgroundColor} />
                </Grid>
                <Grid item sm={4}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="space-between" /* Push the content to the bottom */
                    style={{
                      height: "100%",
                    }} /* Ensure this inner container takes the full height */
                  >
                    <Grid item>
                      {/* Your content here, which will be positioned at the top */}
                    </Grid>
                    <Grid item>
                      <div
                        style={{
                          background: getBackgroundColor(),
                          display: "flex",
                          flexDirection: "column",
                          height:
                            "100%" /* Ensure the container takes the full height of its parent */,
                          borderRadius: "0px 5px 5px 0px",
                          padding: 10,
                          textAlign: "justify",
                          zIndex: -1,
                        }}
                      >
                        <Typography variant="h6">
                          Naše usluge jamče povećanje učinkovitosti vremena za
                          10%, dostupne 24/7 tijekom cijelog tjedna, s brzom i
                          jednostavnom podrškom.
                        </Typography>
                      </div>
                      {/* This is an empty item that will push the content to the bottom */}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </Grid>
  );
};
