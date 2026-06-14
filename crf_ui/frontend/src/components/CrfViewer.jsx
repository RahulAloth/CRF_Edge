import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { DataGrid } from "@mui/x-data-grid";

const CrfViewer = forwardRef((props, ref) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [editedRows, setEditedRows] = useState({});
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/crf")
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          setError(true);
          return;
        }

        // Auto-generate editable columns
        const cols = Object.keys(data[0] || {}).map((key) => ({
          field: key,
          headerName: key,
          width: 200,
          editable: true,
        }));

        setColumns(cols);
        setRows(data);   // ⭐ Use backend JSON EXACTLY
      })
      .catch(() => setError(true));
  }, []);

  // ⭐ Track edits
  const handleRowUpdate = (newRow, oldRow) => {
    setEditedRows((prev) => ({
      ...prev,
      [JSON.stringify(oldRow)]: newRow,   // ⭐ Use old row as key
    }));
    return newRow;
  };

  // ⭐ Expose saveChanges()
  useImperativeHandle(ref, () => ({
    saveChanges: async () => {
      const editedArray = Object.values(editedRows);

      if (editedArray.length === 0) {
        console.log("No changes to save");
        return { status: "no_changes" };
      }

      const response = await fetch("http://127.0.0.1:8000/api/crf/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedArray),
      });

      const result = await response.json();

      // Update UI
      setRows((prev) =>
        prev.map((row) => {
          const key = JSON.stringify(row);
          return editedRows[key] ? editedRows[key] : row;
        })
      );

      setEditedRows({});
      return result;
    },
  }));

  if (error) return <div>Error loading CRF JSON</div>;
  if (rows.length === 0) return <div>Loading…</div>;

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => JSON.stringify(row)}  // ⭐ Unique key without adding id
        processRowUpdate={handleRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </div>
  );
});

export default CrfViewer;

