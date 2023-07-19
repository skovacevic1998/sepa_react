import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TablePagination } from "@mui/material";

interface Column {
  id:
    | "rbr"
    | "brojRacuna"
    | "iznosUplate"
    | "iznosIsplate"
    | "datum"
    | "pnb"
    | "naknada"
    | "sifOpisPlac"
    | "sifNamjene";
  label: string;
  minWidth?: number;
  align?: "left";
  format?: (value: number) => string;
}

function createData(
  rbr: number,
  brojRacuna: string,
  iznosUplate: number,
  iznosIsplate: number,
  datum: string,
  pnb: string,
  naknada: number,
  sifOpisPlac: number,
  sifNamjene: string
) {
  return {
    rbr,
    brojRacuna,
    iznosUplate,
    iznosIsplate,
    datum,
    pnb,
    naknada,
    sifOpisPlac,
    sifNamjene,
  };
}

const rows = [
  createData(
    1,
    "HR9423600001714884279",
    0,
    542.2,
    "2023-07-19",
    "23600001714884279",
    1.22,
    88,
    "CDCD"
  ),
  createData(
    2,
    "HR9423600001714884279",
    0,
    542.2,
    "2023-07-19",
    "23600001714884279",
    1.22,
    88,
    "CDCD"
  ),
  createData(
    3,
    "HR9423600001714884279",
    0,
    542.2,
    "2023-07-19",
    "23600001714884279",
    1.22,
    88,
    "CDCD"
  ),
  createData(
    4,
    "HR9423600001714884279",
    0,
    542.2,
    "2023-07-19",
    "23600001714884279",
    1.22,
    88,
    "CDCD"
  ),
  createData(
    5,
    "HR9423600001714884279",
    0,
    542.2,
    "2023-07-19",
    "23600001714884279",
    1.22,
    88,
    "CDCD"
  ),
  createData(
    6,
    "HR9423600001714884279",
    0,
    542.2,
    "2023-07-19",
    "23600001714884279",
    1.22,
    88,
    "CDCD"
  ),
  createData(
    7,
    "HR9423600001714884279",
    0,
    542.2,
    "2023-07-19",
    "23600001714884279",
    1.22,
    88,
    "CDCD"
  ),
  createData(
    8,
    "HR9423600001714884279",
    0,
    542.2,
    "2023-07-19",
    "23600001714884279",
    1.22,
    88,
    "CDCD"
  ),
  createData(
    9,
    "HR9423600001714884279",
    0,
    542.2,
    "2023-07-19",
    "23600001714884279",
    1.22,
    88,
    "CDCD"
  ),
];

const columns: readonly Column[] = [
  { id: "rbr", label: "Rbr", minWidth: 70 },
  { id: "brojRacuna", label: "Broj računa", minWidth: 100 },
  {
    id: "iznosUplate",
    label: "Iznos uplate",
    minWidth: 120,
    align: "left",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "iznosIsplate",
    label: "Iznos isplate",
    minWidth: 120,
    align: "left",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "datum",
    label: "Datum",
    minWidth: 100,
    align: "left",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "pnb",
    label: "PNB",
    minWidth: 170,
    align: "left",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "naknada",
    label: "Naknada",
    minWidth: 100,
    align: "left",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "sifOpisPlac",
    label: "Širfa opisa plaćanja",
    minWidth: 170,
    align: "left",
    format: (value: number) => value.toFixed(2),
  },
  {
    id: "sifNamjene",
    label: "Šifra namjene",
    minWidth: 130,
    align: "left",
    format: (value: number) => value.toFixed(2),
  },
];

export function KonsigTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 180 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.rbr}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
