import { DataGrid, GridColDef } from "@mui/x-data-grid";

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

export const KonsigTable: React.FC<KonsigTableProps> = ({ nalogList }) => {
  return (
    <div>
      <DataGrid
        rows={nalogList}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection={false}
        disableColumnSelector
        disableDensitySelector
        disableRowSelectionOnClick
      />
    </div>
  );
};
