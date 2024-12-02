import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

const columns = (language) => [
    { field: "id", headerName: "ID", width: 90 },
    {
        field: "verikoe",
        headerName: language === "fi" ? "Verikoe" : "Blood Test",
        width: 140,
    },
    {
        field: "yksikkö",
        headerName: language === "fi" ? "Yksikkö" : "Unit",
        width: 140,
        editable: true,
    },
    {
        field: "mitattuArvo",
        headerName: language === "fi" ? "Mitattu arvo" : "Measured Value",
        type: "number",
        width: 140,
        editable: true,
    },
    {
        field: "viitearvo",
        headerName: language === "fi" ? "Viitearvo" : "Reference Value",
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
    // ...other rows
];

function Veriarvot({ language }) {
    return (
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
            <h1>{language === "fi" ? "Veriarvot" : "Blood Values"}</h1>

            <Box
                sx={{
                    height: 400,
                    width: "80%",
                    backgroundColor: "white",
                }}
            >
                <DataGrid
                    rows={rows}
                    columns={columns(language)}
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
    );
}

export default Veriarvot;
