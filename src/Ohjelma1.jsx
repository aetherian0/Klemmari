import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "verikoe", headerName: "Verikoe", width: 140 },
    {
        field: "yksikkö",
        headerName: "Yksikkö",
        width: 140,
        editable: true,
    },
    {
        field: "mitattuArvo",
        headerName: "Mitattu arvo",
        type: "number",
        width: 140,
        editable: true,
    },
    {
        field: "viitearvo",
        headerName: "Viitearvo",
        width: 140,
        editable: true,
    },
];

const rows = [
    {
        id: 1,
        verikoe: "Hemoglobiini (Hb)",
        yksikkö: "g/l",
        mitattuArvo: 159,
        viitearvo: "Miehet: 134-170",
    },
    {
        id: 2,
        verikoe: "Hematokriitti (Hct)",
        yksikkö: "%",
        mitattuArvo: 45,
        viitearvo: "Miehet: 41-50",
    },
    {
        id: 3,
        verikoe: "Punasolut (RBC)",
        yksikkö: "x10^12/l",
        mitattuArvo: 5.2,
        viitearvo: "Miehet: 4.5-5.9",
    },
    {
        id: 4,
        verikoe: "Valkosolut (WBC)",
        yksikkö: "x10^9/l",
        mitattuArvo: 7.5,
        viitearvo: "Miehet: 4.0-10.0",
    },
];

function Ohjelma1() {
    return (
        <>
            <div>
                <h1>Veriarvot</h1>
            </div>

            <div>
                <Box
                    sx={{
                        height: 400,
                        width: "100%",
                    }}
                >
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 4,
                                },
                            },
                        }}
                        pageSizeOptions={[4]}
                        checkboxSelection
                        disableRowSelectionOnClick
                    />
                </Box>
            </div>
        </>
    );
}

export default Ohjelma1;
