import { Grid, Button } from "@mui/material";

interface KonsigBtnSetProps {
  Item: any;
}

export const KonsigBtnSet: React.FC<KonsigBtnSetProps> = ({ Item }) => {
  return (
    <>
      <Grid container justifyContent="right">
        <Grid item xs={12} md={8} lg={4.5} justifyContent="center">
          <Item>
            <Grid container justifyContent="space-evenly" spacing={2}>
              <Grid item>
                <Button variant="contained" color="error">
                  Deaktiviraj
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained">Zatvori konsignaciju</Button>
              </Grid>
              <Grid item>
                <Button variant="contained">Slanje na izvršenje</Button>
              </Grid>
            </Grid>
          </Item>
        </Grid>
      </Grid>
    </>
  );
};
