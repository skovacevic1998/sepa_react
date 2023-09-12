import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import TextField from "@mui/material/TextField";
import { Button, Grid } from "@mui/material";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { RootState } from "../../../redux/store";
import axios from "axios";

const initialRows: any[] | (() => any[]) = [];

function createData(
  idGrNal: number,
  tip: string,
  datum: string,
  stsGrupe: string,
  grNal: any[]
) {
  return {
    idGrNal,
    tip,
    datum,
    stsGrupe,
    grNal,
  };
}

function Row(props: { row: ReturnType<typeof createData> }) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.idGrNal}
        </TableCell>
        <TableCell align="left">{row.tip}</TableCell>
        <TableCell align="left">{row.datum}</TableCell>
        <TableCell align="left">{row.stsGrupe}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                GRUPA NALOGA: {row.idGrNal}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Račun primatelja</TableCell>
                    <TableCell>Informacije primatelja</TableCell>
                    <TableCell>Račun platitelja</TableCell>
                    <TableCell>Informacije platitelja</TableCell>
                    <TableCell>Šifra opisa plaćanja</TableCell>
                    <TableCell>Opis plaćanja</TableCell>
                    <TableCell>Šifra namjene</TableCell>
                    <TableCell>Iznos naloga</TableCell>
                    <TableCell>Iznos naknade</TableCell>
                    <TableCell>Status naloga</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.grNal.map((grNalRow) => (
                    <TableRow key={grNalRow.idGrNal}>
                      <TableCell>{grNalRow.racPrim}</TableCell>
                      <TableCell>{grNalRow.infoRacPrim}</TableCell>
                      <TableCell>{grNalRow.racPlat}</TableCell>
                      <TableCell>{grNalRow.infoRacPlat}</TableCell>
                      <TableCell>{grNalRow.sifOpisPlac}</TableCell>
                      <TableCell>{grNalRow.opisPlac}</TableCell>
                      <TableCell>{grNalRow.sifNamjene}</TableCell>
                      <TableCell>{grNalRow.iznosNal}</TableCell>
                      <TableCell>{grNalRow.iznosNaknade}</TableCell>
                      <TableCell>{grNalRow.stsNaloga}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export function PregledTable() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [usernameValue, setUsernameValue] = useState("");
  const [error, setError] = useState(false);

  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().substr(0, 10)
  );

  const [rows, setRows] = useState(initialRows);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleSearchClick = async () => {
    try {
      const usernameInput = document.getElementById(
        "username"
      ) as HTMLInputElement;
      let username = usernameInput.value;

      if (username === "") {
        username = currentUser?.username || "";
      }

      const response = await axios.post(
        "http://localhost:8080/api/getPregledNalogaList",
        {
          username,
        }
      );

      if (response.data && response.data !== "") {
        const filteredRows = response.data.filter(
          (row: any) => row.datum === selectedDate
        );

        setRows(filteredRows);
        setError(false);
      } else {
        setRows([]);
        setError(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const username = currentUser?.username;

        const response = await axios.post(
          "http://localhost:8080/api/getPregledNalogaList",
          {
            username,
          }
        );

        const filteredRows = response.data.filter(
          (row: any) => row.datum === selectedDate
        );

        setRows(filteredRows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Grid container alignItems={"center"}>
        <Grid item>
          <Typography variant="h5" fontWeight="bold" style={{ margin: "1rem" }}>
            PREGLED UNESENIH NALOGA PO ROLI: {currentUser?.roles}
          </Typography>
        </Grid>
        <Grid item marginRight={2}>
          <TextField
            id="date-picker"
            label="Datum izvršenja"
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginBottom: "1%" }}
          />
        </Grid>
        <Grid item xs={3} marginRight={2}>
          <TextField
            id="username"
            name="username"
            required
            fullWidth
            label="Korisničko ime"
            autoFocus
            error={error}
            disabled={currentUser?.roles !== "Admin"}
            value={usernameValue}
            onChange={(e) => setUsernameValue(e.target.value)}
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            disabled={currentUser?.roles !== "Admin"}
            onClick={handleSearchClick}
          >
            Pregled podataka
          </Button>
        </Grid>
        <Grid item xs={12} marginTop={2}>
          <TableContainer
            component={Paper}
            style={{ maxHeight: "400px", overflowY: "auto" }}
          >
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>ID GRUPE NALOGA</TableCell>
                  <TableCell align="left">TIP</TableCell>
                  <TableCell align="left">DATUM IZVRŠENJA</TableCell>
                  <TableCell align="left">STATUS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <Row key={row.idGrNal} row={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
}
