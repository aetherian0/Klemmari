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
        width: 250,
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
    {
        id: 5,
        verikoe: "Kokonaiskolesteroli",
        yksikkö: "mmol/l",
        mitattuArvo: 4.8,
        viitearvo: "Alle 5.0",
    },
    {
        id: 6,
        verikoe: "LDL-kolesteroli",
        yksikkö: "mmol/l",
        mitattuArvo: 2.8,
        viitearvo: "Alle 3.0",
    },
    {
        id: 7,
        verikoe: "HDL-kolesteroli",
        yksikkö: "mmol/l",
        mitattuArvo: 1.2,
        viitearvo: "Miehet: yli 1.0, Naiset: yli 1.2",
    },
    {
        id: 8,
        verikoe: "Triglyseridit",
        yksikkö: "mmol/l",
        mitattuArvo: 1.2,
        viitearvo: "Alle 1.7",
    },
    {
        id: 9,
        verikoe: "Kreatiniini",
        yksikkö: "µmol/l",
        mitattuArvo: 90,
        viitearvo: "Miehet: 60-105, Naiset: 45-90",
    },
    {
        id: 10,
        verikoe: "Glukoosi (paasto)",
        yksikkö: "mmol/l",
        mitattuArvo: 5.3,
        viitearvo: "3.6-5.6",
    },
    {
        id: 11,
        verikoe: "Ferritiini",
        yksikkö: "µg/l",
        mitattuArvo: 75,
        viitearvo: "Miehet: 30-400, Naiset: 10-150",
    },
];

function Ohjelma1() {
    return (
        <>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    height: "100vh",
                    textAlign: "center",
                }}
            >
                <h1>Veriarvot</h1>

                <Box
                    sx={{
                        height: 400,
                        width: "80%",
                        backgroundColor: "white",
                    }}
                >
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        checkboxSelection
                        disableRowSelectionOnClick
                    />
                </Box>
            </div>
        </>
    );
}

export default Ohjelma1;
