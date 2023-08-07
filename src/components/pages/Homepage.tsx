import React from "react";
import { Grid, Typography } from "@mui/material";
import { FinanceMediaCard1 } from "../utilities/homepage/FinanceMediaCard1";
import { FinanceMediaCard2 } from "../utilities/homepage/FinanceMediaCard2";
import { FinanceMediaCard3 } from "../utilities/homepage/FinanceMediaCard3";

interface ThemeProp {
  Item: any;
  getBackgroundColor: () => string;
}

export const Homepage: React.FC<ThemeProp> = ({ Item, getBackgroundColor }) => {
  return (
    <>
      <Grid>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={12}>
            <Item>
              <Typography
                variant="h2"
                fontWeight="bold"
                style={{ margin: "1rem" }}
              >
                UPRAVLJAJTE SVOJIM SVIJETOM FINANCIJA
              </Typography>
            </Item>
          </Grid>

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
                  justifyContent="space-between"
                  style={{
                    height: "100%",
                  }}
                >
                  <Grid item />
                  <Grid item>
                    <div
                      style={{
                        background: getBackgroundColor(),
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
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
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

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
                  justifyContent="space-between"
                  style={{
                    height: "100%",
                  }}
                >
                  <Grid item />
                  <Grid item>
                    <div
                      style={{
                        background: getBackgroundColor(),
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                        borderRadius: "5px 0px 0px 5px",
                        padding: 10,
                        textAlign: "justify",
                      }}
                    >
                      <Typography variant="h6">
                        Obavljajte, upravljajte ili pregledavajte transakcije
                        koristeći naše sučelje, učitajte ih putem datoteke ili
                        čak upravljajte svojim korisničkim profilom - sve je na
                        vama.
                      </Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <FinanceMediaCard2 getBackgroundColor={getBackgroundColor} />
              </Grid>
            </Grid>
          </Grid>

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
                  justifyContent="space-between"
                  style={{
                    height: "100%",
                  }}
                >
                  <Grid item />
                  <Grid item>
                    <div
                      style={{
                        background: getBackgroundColor(),
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
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
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
