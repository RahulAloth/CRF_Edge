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

const drawerWidth = 360;

export default function MainLayout({
  children,
  onSelectView,
  onSave,
  onGenerate,
  currentView,
  setInputPdfFile,
  inputPdfFile,   // ⭐ Needed to enable Generate
}) {
  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      
      {/* Sidebar */}
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
        {/* Title */}
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          CRF Edge
          <br />
          HITL
        </Typography>

        {/* ⭐ Load CRF Input (same size as buttons) */}
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

        {/* Hidden file input */}
        <input
          id="pdfInputFile"
          type="file"
          accept="application/pdf"
          onChange={(e) => setInputPdfFile(e.target.files[0])}
          style={{ display: "none" }}
        />

        <Divider sx={{ borderColor: "rgba(255,255,255,0.3)" }} />

        {/* Navigation */}
        <List sx={{ flexGrow: 1 }}>

          {/* ⭐ CRF INPUT VIEWER */}
          <ListItemButton
            selected={currentView === "crfInputViewer"}
            onClick={() => onSelectView("crfInputViewer")}
            sx={{
              borderRadius: "6px",
              "&.Mui-selected": { backgroundColor: "rgba(255,255,255,0.2)" },
              "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" },
            }}
          >
            <ListItemText primary="CRF Input Viewer" />
          </ListItemButton>

          {/* ⭐ CRF OUTPUT VIEWER */}
          <ListItemButton
            selected={currentView === "crfOutputViewer"}
            onClick={() => onSelectView("crfOutputViewer")}
            sx={{
              borderRadius: "6px",
              "&.Mui-selected": { backgroundColor: "rgba(255,255,255,0.2)" },
              "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" },
            }}
          >
            <ListItemText primary="CRF Output Viewer" />
          </ListItemButton>

          {/* ⭐ CRF‑SDTM MAP */}
          <ListItemButton
            selected={currentView === "crfSdtmMap"}
            onClick={() => onSelectView("crfSdtmMap")}
            sx={{
              borderRadius: "6px",
              "&.Mui-selected": { backgroundColor: "rgba(255,255,255,0.2)" },
              "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" },
            }}
          >
            <ListItemText primary="CRF‑SDTM Map" />
          </ListItemButton>
        </List>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.3)" }} />

        {/* ⭐ GENERATE BUTTON */}
        <Button
          variant="contained"
          onClick={onGenerate}
          disabled={currentView !== "crfInputViewer" || !inputPdfFile}
          sx={{
            backgroundColor: "white",
            color: "#0A3D91",
            fontWeight: 600,
            mb: 1,
            "&:hover": { backgroundColor: "#e6e6e6" },
            "&:disabled": {
              backgroundColor: "rgba(255,255,255,0.5)",
              color: "#0A3D91",
            },
          }}
        >
          Generate
        </Button>

        {/* Save Button */}
        <Button
          variant="contained"
          onClick={onSave}
          disabled={currentView !== "crfSdtmMap"}
          sx={{
            backgroundColor: "white",
            color: "#0A3D91",
            fontWeight: 600,
            "&:hover": { backgroundColor: "#e6e6e6" },
            "&:disabled": {
              backgroundColor: "rgba(255,255,255,0.5)",
              color: "#0A3D91",
            },
          }}
        >
          Save Changes
        </Button>
      </Drawer>

      {/* Main Content */}
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

