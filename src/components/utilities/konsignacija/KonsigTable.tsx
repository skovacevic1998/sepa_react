import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

interface KonsigTableProps {
  nalogList: UnosNaloga[];
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

const columns = [
  { id: "rbr", label: "Rbr", minWidth: 70 },
  { id: "brRac", label: "Broj računa", minWidth: 130 },
  { id: "iznUpl", label: "Iznos uplate", minWidth: 130 },
  { id: "iznIspl", label: "Iznos isplate", minWidth: 90 },
  { id: "date", label: "Datum izvršenja", minWidth: 160 },
  { id: "pnb", label: "Poziv na broj", minWidth: 160 },
  { id: "naknada", label: "Naknada", minWidth: 160 },
  { id: "sifOpisPlac", label: "Šifra opisa plaćanja", minWidth: 160 },
  { id: "sifNamjene", label: "Šifra namjene", minWidth: 160 },
  { id: "status", label: "Status", minWidth: 160 },
];

export const KonsigTable: React.FC<KonsigTableProps> = ({ nalogList }) => {
  const tableContainerStyle: React.CSSProperties = {
    minHeight: "400px",
  };

  const [updatedUnosNalogaList, setUpdatedUnosNalogaList] = useState<
    UnosNaloga[]
  >([]);

  useEffect(() => {
    const updatedList = (nalogList || []).map((item, index) => ({
      ...item,
      rbr: index + 1,
    }));

    setUpdatedUnosNalogaList(updatedList);
  }, [nalogList]);

  return (
    <TableContainer component={Paper} style={tableContainerStyle}>
      <Table stickyHeader aria-label="konsig table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align="left"
                style={{ minWidth: column.minWidth }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {updatedUnosNalogaList.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <TableCell key={column.id} align="left">
                  {(row as any)[column.id]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
