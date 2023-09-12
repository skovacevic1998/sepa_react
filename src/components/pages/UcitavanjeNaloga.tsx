import React, { useEffect, useState } from "react";
import { Alert, Box, Button, Grid, Snackbar, Typography } from "@mui/material";
import { KonsigTable } from "../utilities/konsignacija/KonsigTable";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { useDispatch } from "react-redux";
import { replaceUnosNalogaList, setGrupaNaloga } from "../../redux/slice";

interface UcitavanjeNalogaProps {
  Item: any;
}

export const UcitavanjeNaloga: React.FC<UcitavanjeNalogaProps> = ({ Item }) => {
  const [file, setFile] = useState<File | null>(null);
  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const dispatch = useDispatch();

  const currentNalogList = useSelector(
    (state: RootState) => state.unosNaloga.unosNalogaList
  );
  const currentGrupaNaloga = useSelector(
    (state: RootState) => state.grupaNaloga.currentGrupaNaloga
  );

  const [alertOpenError, setAlertOpenError] = useState(false);

  const handleUcitavanjeNaloga = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      const userId = currentUser?.id;
      const brBlagajne = currentUser?.brBlagajne;

      const storedTipGrupeNaloga = localStorage.getItem("tipGrupeNaloga");
      if (storedTipGrupeNaloga !== "Datoteka" && currentGrupaNaloga !== null) {
        return;
      }

      localStorage.setItem("tipGrupeNaloga", "Datoteka");

      try {
        const response = await axios.post(
          "http://localhost:8080/api/sepaValidation?userId=" +
            userId +
            "&brBlagajne=" +
            brBlagajne,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.data && response.data !== "") {
          dispatch(setGrupaNaloga(response.data));
        } else {
          setAlertOpenError(true);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  useEffect(() => {
    if (file) {
      handleUcitavanjeNaloga();
    }
  }, [file]);

  useEffect(() => {
    fetchNalogList();
  }, [currentGrupaNaloga]);

  const handleAlertClose = () => {
    setAlertOpenError(false);
  };

  const fetchNalogList = async () => {
    const storedTipGrupeNaloga = localStorage.getItem("tipGrupeNaloga");
    const userId = currentUser?.id;
    const idGrupeNaloga = currentGrupaNaloga?.id;

    if (storedTipGrupeNaloga === "Datoteka") {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/getNalogList",
          {
            userId,
            idGrupeNaloga,
          }
        );

        console.log(currentNalogList);
        if (response.data) {
          dispatch(replaceUnosNalogaList(response.data));
        }
      } catch (error: any) {
        if (error.response) {
          console.error("Server responded with an error:", error.response.data);
        } else if (error.request) {
          console.error("No response received from the server.");
        } else {
          console.error("An error occurred:", error.message);
        }
      }
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
            <Grid item xs={12} md={8} lg={2} justifyContent="center">
              <Item>
                <Grid container justifyContent="space-evenly" spacing={2}>
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
                          disabled={currentGrupaNaloga !== null}
                        >
                          Učitaj datoteku
                        </Button>
                      </label>
                    </Box>
                  </Grid>
                </Grid>
              </Item>
            </Grid>
          </Grid>
        </Grid>
        <Snackbar
          open={alertOpenError}
          autoHideDuration={5000}
          onClose={handleAlertClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
          <Alert
            onClose={handleAlertClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            Desila se greška pri izvršenju akcije.
          </Alert>
        </Snackbar>
      </Grid>
    </>
  );
};
