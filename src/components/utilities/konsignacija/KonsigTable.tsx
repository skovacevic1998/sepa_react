import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { v4 as uuidv4 } from "uuid";

const columns: GridColDef[] = [
  { field: "rbr", headerName: "Rbr", type: "number", width: 70 },
  { field: "brRac", headerName: "Broj računa", type: "string", width: 130 },
  { field: "iznUpl", headerName: "Iznos uplate", type: "number", width: 130 },
  {
    field: "iznIspl",
    headerName: "Iznos isplate",
    type: "number",
    width: 90,
  },
  {
    field: "date",
    headerName: "Datum izvršenja",
    type: "string",
    width: 160,
  },
  {
    field: "pnb",
    headerName: "Poziv na broj",
    type: "string",
    width: 160,
  },
  {
    field: "naknada",
    headerName: "Naknada",
    type: "string",
    width: 160,
  },
  {
    field: "sifOpisPlac",
    headerName: "Šifra opisa plaćanja",
    type: "number",
    width: 160,
  },
  {
    field: "sifNamjene",
    headerName: "Šifra namjene",
    type: "string",
    width: 160,
  },
  {
    field: "status",
    headerName: "Status",
    type: "string",
    width: 160,
  },
];

const rows = [
  {
    id: uuidv4(),
    rbr: 1,
    brRac: "HR8023400095688623153",
    iznUpl: 1000.01,
    iznIspl: 0,
    date: "2023-08-14",
    pnb: "23400095688623153",
    naknada: 0.5,
    sifOpisPlac: 2,
    sifNamjene: "DCDC",
    status: "Aktivan",
  },
  {
    id: uuidv4(),
    rbr: 2,
    brRac: "HR8023400095688623153",
    iznUpl: 1000.01,
    iznIspl: 0,
    date: "2023-08-14",
    pnb: "23400095688623153",
    naknada: 0.5,
    sifOpisPlac: 2,
    sifNamjene: "DCDC",
    status: "Aktivan",
  },
  {
    id: uuidv4(),
    rbr: 3,
    brRac: "HR8023400095688623153",
    iznUpl: 1000.01,
    iznIspl: 0,
    date: "2023-08-14",
    pnb: "23400095688623153",
    naknada: 0.5,
    sifOpisPlac: 2,
    sifNamjene: "DCDC",
    status: "Aktivan",
  },
  {
    id: uuidv4(),
    rbr: 4,
    brRac: "HR8023400095688623153",
    iznUpl: 1000.01,
    iznIspl: 0,
    date: "2023-08-14",
    pnb: "23400095688623153",
    naknada: 0.5,
    sifOpisPlac: 2,
    sifNamjene: "DCDC",
    status: "Aktivan",
  },
  {
    id: uuidv4(),
    rbr: 5,
    brRac: "HR8023400095688623153",
    iznUpl: 1000.01,
    iznIspl: 0,
    date: "2023-08-14",
    pnb: "23400095688623153",
    naknada: 0.5,
    sifOpisPlac: 2,
    sifNamjene: "DCDC",
    status: "Aktivan",
  },
  {
    id: uuidv4(),
    rbr: 6,
    brRac: "HR8023400095688623153",
    iznUpl: 1000.01,
    iznIspl: 0,
    date: "2023-08-14",
    pnb: "23400095688623153",
    naknada: 0.5,
    sifOpisPlac: 2,
    sifNamjene: "DCDC",
    status: "Deaktiviran",
  },
  {
    id: uuidv4(),
    rbr: 7,
    brRac: "HR8023400095688623153",
    iznUpl: 1000.01,
    iznIspl: 0,
    date: "2023-08-14",
    pnb: "23400095688623153",
    naknada: 0.5,
    sifOpisPlac: 2,
    sifNamjene: "DCDC",
    status: "Odbijen",
  },
  {
    id: uuidv4(),
    rbr: 8,
    brRac: "HR8023400095688623153",
    iznUpl: 1000.01,
    iznIspl: 0,
    date: "2023-08-14",
    pnb: "23400095688623153",
    naknada: 0.5,
    sifOpisPlac: 2,
    sifNamjene: "DCDC",
    status: "Aktivan",
  },
];

export const KonsigTable = ({ enableCheckboxSelection = false }) => {
  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={enableCheckboxSelection}
      />
    </div>
  );
};
