import React, { useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import { UcitaniNaloziTbl } from "../utilities/ucitavanje/UcitaniNaloziTbl";
import { KonsigTable } from "../utilities/konsignacija/KonsigTable";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../redux/store";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";

interface UcitavanjeNalogaProps {
  Item: any;
}

export const UcitavanjeNaloga: React.FC<UcitavanjeNalogaProps> = ({ Item }) => {
  const [file, setFile] = useState<File | null>(null);

  const currentNalogList = useSelector(
    (state: RootState) => state.unosNaloga.unosNalogaList
  );

  const handleUcitavanjeNaloga = () => {
    console.log("tu sam");
    if (file) {
      // Create a FormData object to handle file uploads
      const formData = new FormData();
      formData.append("file", file);

      console.log(formData);

      axios
        .post("http://localhost:8080/api/sepaValidation", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("File uploaded successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error uploading file:", error);
        });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      console.log(event.target.value);
      handleUcitavanjeNaloga();
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
                        accept=".xml"
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
                    </Box>
                  </Grid>
                  <Grid item>
                    <Button
                      variant="contained"
                      onClick={handleUcitavanjeNaloga}
                    >
                      Spremi naloge
                    </Button>
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
