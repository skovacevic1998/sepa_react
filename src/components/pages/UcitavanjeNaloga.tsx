import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { UcitaniNaloziTbl } from "../utilities/ucitavanje/UcitaniNaloziTbl";
import { KonsigTable } from "../utilities/konsignacija/KonsigTable";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../redux/store";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

interface UcitavanjeNalogaProps {
  Item: any;
}

export const UcitavanjeNaloga: React.FC<UcitavanjeNalogaProps> = ({ Item }) => {
  const currentNalogList = useSelector(
    (state: RootState) => state.unosNaloga.unosNalogaList
  );

  const handleFileUpload = (file: File) => {
    console.log("Uploading file:", file);
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    if (selectedFile) {
      handleFileUpload(selectedFile);
      setSelectedFile(null);
    }
  };

  return (
    <>
      <Grid container justifyContent={"center"}>
        <Grid item xs={12}>
          <Item>
            <Typography
              variant="h2"
              fontWeight="bold"
              style={{ margin: "1rem" }}
            >
              DATOTEČNO UČITAVANJE NALOGA
            </Typography>
          </Item>
        </Grid>
        <Grid item xs={12} sx={{ marginTop: -5, marginBottom: -5 }}>
          <Item>
            <Grid container justifyContent={"center"}>
              <Grid item xs={10}>
                <Item>
                  <Typography
                    variant="h5"
                    textAlign={"center"}
                    marginBottom={1}
                  >
                    Učitani nalozi
                  </Typography>
                  <UcitaniNaloziTbl />
                </Item>
              </Grid>

              <Grid item xs={10}>
                <Item>
                  <Typography
                    variant="h5"
                    textAlign={"center"}
                    marginBottom={1}
                  >
                    Konsignacija
                  </Typography>
                  <KonsigTable nalogList={currentNalogList} />
                </Item>
              </Grid>
            </Grid>
          </Item>
        </Grid>
        <Grid item xs={12}>
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
                    <Box>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                        id="fileInput"
                      />
                      <label htmlFor="fileInput">
                        <Button
                          variant="contained"
                          color="primary"
                          component="span"
                          startIcon={<CloudUploadIcon />}
                        >
                          Učitaj datoteku
                        </Button>
                      </label>
                      {selectedFile && (
                        <Box mt={2}>
                          <Typography variant="body1">
                            Odabrana datoteka: {selectedFile.name}
                          </Typography>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleUploadClick}
                          >
                            Učitaj
                          </Button>
                        </Box>
                      )}
                    </Box>
                  </Grid>
                  <Grid item>
                    <Button variant="contained">Spremi naloge</Button>
                  </Grid>
                </Grid>
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
