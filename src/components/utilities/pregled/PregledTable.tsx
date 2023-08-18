import React, { useState } from "react";
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

function createData(
  idGrNal: number,
  iznos: number,
  tip: string,
  datum: string,
  stsGrupe: string
) {
  return {
    idGrNal,
    iznos,
    tip,
    datum,
    stsGrupe,
    grNal: [
      {
        racPrim: "HR1323600001294255616",
        racPlat: "HR6524020066926635483",
        opisPlac: "Uplata bezgotovinskog novca",
        iznosNal: 122.25,
        stsNaloga: "Aktivan",
      },
      {
        racPrim: "HR1323600001294255616",
        racPlat: "HR6524020066926635483",
        opisPlac: "Uplata bezgotovinskog novca",
        iznosNal: 352.2,
        stsNaloga: "Aktivan",
      },
    ],
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
        <TableCell align="left">{row.iznos}</TableCell>
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
                    <TableCell>Račun platitelja</TableCell>
                    <TableCell>Opis plaćanja</TableCell>
                    <TableCell>Iznos naloga</TableCell>
                    <TableCell>Status naloga</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.grNal.map((grNalRow) => (
                    <TableRow key={grNalRow.racPlat}>
                      <TableCell>{grNalRow.racPrim}</TableCell>
                      <TableCell>{grNalRow.racPlat}</TableCell>
                      <TableCell>{grNalRow.opisPlac}</TableCell>
                      <TableCell>{grNalRow.iznosNal}</TableCell>
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

const rows = [
  createData(1, 10400, "Uplata", "2023-08-16", "Aktivan"),
  createData(2, 10400, "Uplata", "2023-08-17", "Aktivan"),
  createData(3, 10400, "Uplata", "2023-08-18", "Aktivan"),
  createData(4, 10400, "Uplata", "2023-08-19", "Aktivan"),
];

export function PregledTable() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().substr(0, 10)
  );

  const handleDateChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSelectedDate(event.target.value);
  };

  const filteredRows = selectedDate
    ? rows.filter((row) => row.datum === selectedDate)
    : rows;

  return (
    <div>
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
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>ID GRUPE NALOGA</TableCell>
              <TableCell align="left">IZNOS GRUPE NALOGA</TableCell>
              <TableCell align="left">TIP</TableCell>
              <TableCell align="left">DATUM IZVRŠENJA</TableCell>
              <TableCell align="left">STATUS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows.map((row) => (
              <Row key={row.idGrNal} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
