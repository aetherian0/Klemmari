import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import "./Veriarvot.css";

function Veriarvot({ language }) {
    const columns = [
        { field: "id", headerName: language === "fi" ? "ID" : "ID", width: 90 },
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
        {
            field: "päivämäärä",
            headerName: language === "fi" ? "Päivämäärä" : "Date",
            width: 250,
            editable: true,
        },
    ];

    const allRows = [
        {
            id: 1,
            verikoe:
                language === "fi" ? "Hemoglobiini (Hb)" : "Hemoglobin (Hb)",
            yksikkö: "g/l",
            mitattuArvo: 159,
            viitearvo: language === "fi" ? "Miehet: 134-170" : "Men: 134-170",
            päivämäärä: "12.12.2023",
        },
        {
            id: 2,
            verikoe:
                language === "fi" ? "Hematokriitti (Hct)" : "Hematocrit (Hct)",
            yksikkö: "%",
            mitattuArvo: 45,
            viitearvo: language === "fi" ? "Miehet: 41-50" : "Men: 41-50",
            päivämäärä: "12.12.2023",
        },
        {
            id: 3,
            verikoe:
                language === "fi" ? "Punasolut (RBC)" : "Red Blood Cells (RBC)",
            yksikkö: "x10^12/l",
            mitattuArvo: 5.2,
            viitearvo: language === "fi" ? "Miehet: 4.5-5.9" : "Men: 4.5-5.9",
            päivämäärä: "12.12.2023",
        },
        {
            id: 4,
            verikoe:
                language === "fi"
                    ? "Valkosolut (WBC)"
                    : "White Blood Cells (WBC)",
            yksikkö: "x10^9/l",
            mitattuArvo: 7.5,
            viitearvo: language === "fi" ? "Miehet: 4.0-10.0" : "Men: 4.0-10.0",
            päivämäärä: "12.12.2023",
        },
        {
            id: 5,
            verikoe:
                language === "fi" ? "Kokonaiskolesteroli" : "Total Cholesterol",
            yksikkö: "mmol/l",
            mitattuArvo: 4.8,
            viitearvo: language === "fi" ? "Alle 5.0" : "Less than 5.0",
            päivämäärä: "12.12.2023",
        },
        {
            id: 6,
            verikoe: language === "fi" ? "LDL-kolesteroli" : "LDL Cholesterol",
            yksikkö: "mmol/l",
            mitattuArvo: 2.8,
            viitearvo: language === "fi" ? "Alle 3.0" : "Less than 3.0",
            päivämäärä: "12.12.2023",
        },
        {
            id: 7,
            verikoe: language === "fi" ? "HDL-kolesteroli" : "HDL Cholesterol",
            yksikkö: "mmol/l",
            mitattuArvo: 1.2,
            viitearvo:
                language === "fi"
                    ? "Miehet: yli 1.0, Naiset: yli 1.2"
                    : "Men: above 1.0, Women: above 1.2",
            päivämäärä: "12.12.2023",
        },
        {
            id: 8,
            verikoe: language === "fi" ? "Triglyseridit" : "Triglycerides",
            yksikkö: "mmol/l",
            mitattuArvo: 1.2,
            viitearvo: language === "fi" ? "Alle 1.7" : "Less than 1.7",
            päivämäärä: "12.12.2023",
        },
        {
            id: 9,
            verikoe: language === "fi" ? "Kreatiniini" : "Creatinine",
            yksikkö: "µmol/l",
            mitattuArvo: 90,
            viitearvo:
                language === "fi"
                    ? "Miehet: 60-105, Naiset: 45-90"
                    : "Men: 60-105, Women: 45-90",
            päivämäärä: "12.12.2023",
        },
        {
            id: 10,
            verikoe:
                language === "fi" ? "Glukoosi (paasto)" : "Glucose (fasting)",
            yksikkö: "mmol/l",
            mitattuArvo: 5.3,
            viitearvo: language === "fi" ? "3.6-5.6" : "3.6-5.6",
            päivämäärä: "12.12.2023",
        },
        {
            id: 11,
            verikoe: language === "fi" ? "Ferritiini" : "Ferritin",
            yksikkö: "µg/l",
            mitattuArvo: 75,
            viitearvo:
                language === "fi"
                    ? "Miehet: 30-400, Naiset: 10-150"
                    : "Men: 30-400, Women: 10-150",
            päivämäärä: "12.12.2023",
        },
    ];

    const [rows, setRows] = useState(allRows);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        const filteredRows = allRows.filter((row) =>
            row.verikoe.toLowerCase().includes(value)
        );
        setRows(filteredRows);
    };

    return (
        <div className="veriarvot-container">
            <h1>{language === "fi" ? "Veriarvot" : "Blood Values"}</h1>
            <div className="text-field-container">
                <TextField
                    label={
                        language === "fi"
                            ? "Hae verikoetta"
                            : "Search Blood Test"
                    }
                    variant="outlined"
                    value={searchTerm}
                    onChange={handleSearch}
                    fullWidth
                />
            </div>
            <Box className="data-grid-container">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 8,
                            },
                        },
                    }}
                    pageSizeOptions={[8]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </div>
    );
}

export default Veriarvot;
