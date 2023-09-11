import React, { useState, useEffect } from "react";
import { Alert, Button, Grid, Snackbar, Typography } from "@mui/material";
import { KonsigTable } from "../utilities/konsignacija/KonsigTable";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import {
  addUnosNaloga,
  updateGrupaNaloga,
  updateUnosNalogaList,
} from "../../redux/slice";
import { clearGrupaNaloga } from "../../redux/slice";
import { clearUnosNalogaList } from "../../redux/slice";
import axios from "axios";
import { replaceUnosNalogaList } from "../../redux/slice";

interface ThemeProp {
  Item: any;
}

interface UnosNaloga {
  id: string;
  brRac: string;
  iznUpl: number;
  iznIspl: number;
  date: string;
  pnb: string;
  naknada: number;
  sifOpisPlac: number;
  sifNamjene: string;
  status: string;
}

export const Konsignacija: React.FC<ThemeProp> = ({ Item }) => {
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);
  const [successAlertOpenEnd, setSuccessAlertOpenEnd] = useState(false);
  const [successAlertOpenError, setSuccessAlertOpenError] = useState(false);
  const [successAlertOpenEndError, setSuccessAlertOpenEndError] =
    useState(false);

  const handleSuccessAlertClose = () => {
    setSuccessAlertOpen(false);
    setSuccessAlertOpenEnd(false);
    setSuccessAlertOpenEndError(false);
    setSuccessAlertOpenError(false);
  };

  const currentGrupa = useSelector(
    (state: RootState) => state.grupaNaloga.currentGrupaNaloga
  );

  const currentNalogList = useSelector(
    (state: RootState) => state.unosNaloga.unosNalogaList
  );

  const currentUser = useSelector((state: RootState) => state.user.currentUser);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchNalogList();
  }, []);

  const fetchNalogList = async () => {
    const storedTipGrupeNaloga = localStorage.getItem("tipGrupeNaloga");
    const userId = currentUser?.id;
    const idGrupeNaloga = currentGrupa?.id;

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
        // Handle Axios-specific error
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

  const handleStatusChange = async () => {
    console.log(currentGrupa?.sts_grupe);
    if (currentGrupa?.sts_grupe === "Aktivan") {
      const updatedUnosNalogaList = (currentNalogList || []).map(
        (item, index) => {
          return {
            ...item,
            status: "Izvršen",
            rbr: index + 1,
          };
        }
      );

      dispatch(updateUnosNalogaList(updatedUnosNalogaList));
      dispatch(updateGrupaNaloga({ sts_grupe: "Izvršen" }));

      const idGrupeNaloga = currentGrupa.id;

      const response = await axios.post(
        "http://localhost:8080/api/updateStatus",
        {
          idGrupeNaloga,
        }
      );

      if (response.data && response.status === 200) {
        setSuccessAlertOpen(true);
      }
    } else {
      setSuccessAlertOpenError(true);
    }
  };

  const handleEndConsignation = () => {
    if (currentGrupa?.sts_grupe === "Izvršen") {
      dispatch(clearUnosNalogaList());
      dispatch(clearGrupaNaloga());
      setSuccessAlertOpenEnd(true);
      localStorage.setItem("tipGrupeNaloga", "");
    } else {
      setSuccessAlertOpenEndError(true);
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
              KONSIGNACIJA UNESENIH NALOGA
            </Typography>
          </Item>
        </Grid>
        <Grid item sx={{ marginTop: -5, marginBottom: -5 }}>
          <Item>
            <KonsigTable nalogList={currentNalogList} />
          </Item>
        </Grid>
        <Grid item xs={12}>
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
                    <Button variant="contained" onClick={handleEndConsignation}>
                      Zatvori konsignaciju
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" onClick={handleStatusChange}>
                      Slanje na izvršenje
                    </Button>
                  </Grid>
                </Grid>
                <Snackbar
                  open={successAlertOpen}
                  autoHideDuration={5000}
                  onClose={handleSuccessAlertClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                  <Alert
                    onClose={handleSuccessAlertClose}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    Konsignacija poslana na izvršenje
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={successAlertOpenEnd}
                  autoHideDuration={5000}
                  onClose={handleSuccessAlertClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                  <Alert
                    onClose={handleSuccessAlertClose}
                    severity="success"
                    sx={{ width: "100%" }}
                  >
                    Konsignacija je uspješno zatvorena
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={successAlertOpenError}
                  autoHideDuration={5000}
                  onClose={handleSuccessAlertClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                  <Alert
                    onClose={handleSuccessAlertClose}
                    severity="error"
                    sx={{ width: "100%" }}
                  >
                    Nema aktivnih naloga
                  </Alert>
                </Snackbar>
                <Snackbar
                  open={successAlertOpenEndError}
                  autoHideDuration={5000}
                  onClose={handleSuccessAlertClose}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                  <Alert
                    onClose={handleSuccessAlertClose}
                    severity="error"
                    sx={{ width: "100%" }}
                  >
                    Nema aktivne konsignacije ili je status Astivan
                  </Alert>
                </Snackbar>
              </Item>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
