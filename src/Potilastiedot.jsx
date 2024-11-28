import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

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
        id: 2,
        Käynti: "Hammaslääkäri",
        Päivämäärä: "10.06.2023",
    },
    {
        id: 3,
        Käynti: "Ortopedia",
        Päivämäärä: "15.11.2024",
    },
    {
        id: 4,
        Käynti: "Ortopedia",
        Päivämäärä: "15.11.2024",
    },
    {
        id: 5,
        Käynti: "Ortopedia",
        Päivämäärä: "15.11.2024",
    },
    {
        id: 6,
        Käynti: "Ortopedia",
        Päivämäärä: "15.11.2024",
    },
    {
        id: 7,
        Käynti: "Ortopedia",
        Päivämäärä: "15.11.2024",
    },
];

function Potilastiedot() {
    const navigate = useNavigate();

    const handleRowClick = (rowData) => {
        // Siirrytään uuteen sivuun, jossa voidaan nähdä käynnin tiedot
        navigate(`/kaynti/${rowData.id}`);
    };

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
            <h1>Potilastiedot</h1>
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
                    onRowClick={(params) => handleRowClick(params.row)} // Käynnistää row click -toiminnon
                />
            </Box>
        </div>
    );
}

export default Potilastiedot;
