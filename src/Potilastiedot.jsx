import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";

const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "Käynti", headerName: "Käynti", width: 450 },
  
    {
        field: "Päivämäärä",
        headerName: "Päivämäärä",
        type: "number",
        width: 140,
        editable: true,
    },
  
];

const rows = [
    {
        id: 1,
        Käynti: "Vastaanotto", 
        Päivämäärä: "10.07.2024",
    },
    {
        id:2,
        Käynti: "Hammaslääkäri",
        Päivämäärä: "10.06.2023"
        
    }
   
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