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
    | "brGrupeNaloga"
    | "izn"
    | "racPlatitelja"
    | "racPrimatelja"
    | "datIzvrsenja"
    | "status";
  label: string;
  minWidth?: number;
  align?: "left";
  format?: (value: number) => string;
}

function createData(
  rbr: number,
  brGrupeNaloga: number,
  izn: number,
  racPlatitelja: string,
  racPrimatelja: string,
  datIzvrsenja: string,
  status: string
) {
  return {
    rbr,
    brGrupeNaloga,
    izn,
    racPlatitelja,
    racPrimatelja,
    datIzvrsenja,
    status,
  };
}

const rows = [
  createData(
    1,
    5243,
    10000.0,
    "HR4423400094459531757",
    "HR8023400095688623153",
    "2023-08-14",
    "Aktivan"
  ),
  createData(
    2,
    5243,
    10000.0,
    "HR4423400094459531757",
    "HR8023400095688623153",
    "2023-08-14",
    "Aktivan"
  ),
  createData(
    3,
    5243,
    10000.0,
    "HR4423400094459531757",
    "HR8023400095688623153",
    "2023-08-14",
    "Aktivan"
  ),
  createData(
    4,
    5243,
    10000.0,
    "HR4423400094459531757",
    "HR8023400095688623153",
    "2023-08-14",
    "Aktivan"
  ),
];

const columns: readonly Column[] = [
  { id: "rbr", label: "Rbr", minWidth: 70 },
  { id: "brGrupeNaloga", label: "Broj grupe naloga", minWidth: 100 },
  {
    id: "izn",
    label: "Iznos naloga",
    minWidth: 120,
    align: "left",
  },
  {
    id: "racPlatitelja",
    label: "Račun platitelja",
    minWidth: 170,
    align: "left",
  },
  {
    id: "racPrimatelja",
    label: "Račun primatelja",
    minWidth: 170,
    align: "left",
  },
  {
    id: "datIzvrsenja",
    label: "Datum izvršenja",
    minWidth: 170,
    align: "left",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
    align: "left",
  },
];

export function UcitaniNaloziTbl() {
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
    <Paper sx={{ overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 640 }}>
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
