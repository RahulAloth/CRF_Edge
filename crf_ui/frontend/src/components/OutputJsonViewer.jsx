import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default function OutputJsonViewer({ jobId }) {
  const [flatRows, setFlatRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!jobId) return;

    let isMounted = true;
    setLoading(true);
    setError(null);

    fetch(`http://127.0.0.1:8000/api/job/output/${jobId}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch JSON output");
        }
        return res.json();
      })
      .then((jsonData) => {
        if (!isMounted) return;

        const allRows = [];
        const pages = jsonData.output || jsonData.pages || jsonData;

        Object.entries(pages).forEach(([pageKey, pageObj]) => {
          if (
            !pageObj ||
            typeof pageObj !== "object" ||
            !Array.isArray(pageObj.mapped_variables)
          ) {
            return;
          }

          const pageNumber =
            pageObj.page_number || pageKey.replace("page_", "");
          const activeDomain = pageObj.active_domain || "";

          pageObj.mapped_variables.forEach((variable, index) => {
            allRows.push({
              id: `${pageKey}-${index}`,
              sourceFile: variable.source_file || pageObj.source_file || "",
              pageNumber: variable.page_number || pageNumber,
              domain: variable.target_domain || variable.domain || activeDomain,
              variable: variable.target_variable || variable.variable || "",
              variableLabel: variable.variable_label || "",
              dataType: variable.data_type || "",
              sasLength: variable.sas_length || "",
              coreStatus: variable.core_status || "",
              role: variable.role || "",
              codelistCode: variable.codelist_code || "",
              rawToken: variable.raw_token || "",
              cleanedToken: variable.cleaned_token || "",
              confidence: variable.confidence ?? "",
            });
          });
        });

        setFlatRows(allRows);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        if (!isMounted) return;
        setError("Could not load output JSON.");
        setFlatRows([]);
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [jobId]);

  if (!jobId) return null;

  if (loading) {
    return (
      <Box p={3}>
        <Typography>Loading output JSON...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", p: 1 }}>
      <Typography variant="h6" sx={{ color: "#0A3D91", fontWeight: 600, mb: 1 }}>
        Mapped Variables Review ({flatRows.length} Total Items)
      </Typography>

      <TableContainer component={Paper} sx={{ flexGrow: 1, overflow: "auto" }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, backgroundColor: "#f0f2f5" }}>Page Number</TableCell>
              <TableCell sx={{ fontWeight: 700, backgroundColor: "#f0f2f5" }}>Domain</TableCell>
              <TableCell sx={{ fontWeight: 700, backgroundColor: "#f0f2f5" }}>Variable</TableCell>
              <TableCell sx={{ fontWeight: 700, backgroundColor: "#f0f2f5" }}>Variable Label</TableCell>
              <TableCell sx={{ fontWeight: 700, backgroundColor: "#f0f2f5" }}>Data Type</TableCell>
              <TableCell sx={{ fontWeight: 700, backgroundColor: "#f0f2f5" }}>SAS Length</TableCell>
              <TableCell sx={{ fontWeight: 700, backgroundColor: "#f0f2f5" }}>Core Status</TableCell>
              <TableCell sx={{ fontWeight: 700, backgroundColor: "#f0f2f5" }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 700, backgroundColor: "#f0f2f5" }}>Codelist Code</TableCell>
              <TableCell sx={{ fontWeight: 700, backgroundColor: "#f0f2f5" }}>Raw Token</TableCell>
              <TableCell sx={{ fontWeight: 700, backgroundColor: "#f0f2f5" }}>Cleaned Token</TableCell>
              <TableCell sx={{ fontWeight: 700, backgroundColor: "#f0f2f5" }}>Confidence</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {flatRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell sx={{ fontWeight: 600, color: "#0A3D91" }}>Page {row.pageNumber}</TableCell>
                <TableCell>{row.domain}</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>{row.variable}</TableCell>
                <TableCell>{row.variableLabel}</TableCell>
                <TableCell>{row.dataType}</TableCell>
                <TableCell>{row.sasLength}</TableCell>
                <TableCell>{row.coreStatus}</TableCell>
                <TableCell>{row.role}</TableCell>
                <TableCell>{row.codelistCode}</TableCell>
                <TableCell sx={{ fontSize: "0.85rem", color: "#444" }}>{row.rawToken}</TableCell>
                <TableCell sx={{ fontSize: "0.85rem", color: "#444" }}>{row.cleanedToken}</TableCell>
                <TableCell>{row.confidence}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}