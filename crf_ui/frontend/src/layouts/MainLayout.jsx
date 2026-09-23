// src/layouts/MainLayout.jsx

import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Button,
  Divider,
} from "@mui/material";

import { uploadInputCRF } from "../api/backend";

const drawerWidth = 360;

export default function MainLayout({
  children,
  onSelectView,
  onSave,
  onGenerate,
  currentView,
  setInputPdfFile,
  inputPdfFile,
  onPdfUploaded,
}) {
  const handleInputCRFUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setInputPdfFile(file);

    try {
      const result = await uploadInputCRF(file);
      console.log("Uploaded to backend:", result);

      onPdfUploaded(result);

      alert("Input CRF uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to upload Input CRF");
    }
  };

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            padding: "20px 16px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            backgroundColor: "#0A3D91",
            color: "white",
          },
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          CRF Edge
          <br />
          HITL
        </Typography>

        <div
          onClick={() => document.getElementById("pdfInputFile").click()}
          style={{
            width: "100%",
            maxWidth: "260px",
            padding: "10px",
            margin: "0 auto",
            borderRadius: "6px",
            background: "white",
            color: "#0A3D91",
            textAlign: "center",
            cursor: "pointer",
            fontWeight: 600,
            border: "1px solid #0A3D91",
          }}
        >
          Load CRF Input
        </div>

        <input
          id="pdfInputFile"
          type="file"
          accept="application/pdf"
          style={{ display: "none" }}
          onChange={handleInputCRFUpload}
        />

        <Divider sx={{ borderColor: "rgba(255,255,255,0.3)" }} />

        <List sx={{ flexGrow: 1 }}>
          <ListItemButton
            selected={currentView === "crfInputViewer"}
            onClick={() => onSelectView("crfInputViewer")}
          >
            <ListItemText primary="CRF Input Viewer" />
          </ListItemButton>

          <ListItemButton
            selected={currentView === "crfOutputViewer"}
            onClick={() => onSelectView("crfOutputViewer")}
          >
            <ListItemText primary="CRF Output Viewer" />
          </ListItemButton>

          <ListItemButton
            selected={currentView === "crfSdtmMap"}
            onClick={() => onSelectView("crfSdtmMap")}
          >
            <ListItemText primary="CRF‑SDTM Map" />
          </ListItemButton>
        </List>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.3)" }} />

        <Button
          variant="contained"
          onClick={onGenerate}
          disabled={currentView !== "crfInputViewer" || !inputPdfFile}
          sx={{
            backgroundColor: "white",
            color: "#0A3D91",
            fontWeight: 600,
          }}
        >
          Generate
        </Button>

        <Button
          variant="contained"
          onClick={onSave}
          disabled={currentView !== "crfSdtmMap"}
          sx={{
            backgroundColor: "white",
            color: "#0A3D91",
            fontWeight: 600,
          }}
        >
          Save Changes
        </Button>
      </Drawer>

      <div
        style={{
          flexGrow: 1,
          height: "100vh",
          overflow: "hidden",
          padding: "10px",
          background: "#f5f6fa",
          display: "flex",
        }}
      >
        <div style={{ flexGrow: 1, overflow: "hidden" }}>{children}</div>
      </div>
    </div>
  );
}
