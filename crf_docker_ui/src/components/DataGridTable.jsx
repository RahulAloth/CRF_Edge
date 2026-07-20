import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

export default function DataGridTable() {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const url = "http://127.0.0.1:8000/api/crf";

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Backend error");
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          setError(true);
          return;
        }

        // Auto-generate columns
        const cols = Object.keys(data[0] || {}).map((key) => ({
          field: key,
          headerName: key,
          width: 200,
        }));

        // Add id field if missing
        const rowsWithId = data.map((row, index) => ({
          id: index + 1,
          ...row,
        }));

        setColumns(cols);
        setRows(rowsWithId);
      })
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <div
        style={{
          padding: 20,
          fontSize: 18,
          color: "#444",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        No JSON available from backend.
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div
        style={{
          padding: 20,
          fontSize: 18,
          color: "#666",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        Loading JSON…
      </div>
    );
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid rows={rows} columns={columns} />
    </div>
  );
}

