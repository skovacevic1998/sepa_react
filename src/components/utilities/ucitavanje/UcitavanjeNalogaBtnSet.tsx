import { Grid, Button } from "@mui/material";
import { UploadFileComponent } from "./UploadFileComponent";

interface UcitavanjeNalogaBtnSetProps {
  Item: any;
}

export const UcitavanjeNalogaBtnSet: React.FC<UcitavanjeNalogaBtnSetProps> = ({
  Item,
}) => {
  const handleFileUpload = (file: File) => {
    console.log("Uploading file:", file);
  };

  return (
    <>
      <Grid container justifyContent="right">
        <Grid item xs={12} md={8} lg={4} justifyContent="center">
          <Item>
            <Grid container justifyContent="space-evenly" spacing={2}>
              <Grid item>
                <Button variant="contained" color="error">
                  Isprazni tablicu
                </Button>
              </Grid>
              <Grid item>
                <UploadFileComponent onFileUpload={handleFileUpload} />
              </Grid>
              <Grid item>
                <Button variant="contained">Spremi naloge</Button>
              </Grid>
            </Grid>
          </Item>
        </Grid>
      </Grid>
    </>
  );
};
