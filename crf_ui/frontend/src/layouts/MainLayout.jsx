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

export default function MainLayout({ children, onSelectView, onSave, currentView }) {
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
            backgroundColor: "#0A3D91",   // ⭐ Blue variant
            color: "white",
          },
        }}
      >
        {/* Title */}
        <Typography variant="h6" sx={{ fontWeight: 700 }}>
          CRF Annotation  
          <br />
          Human In Loop
        </Typography>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.3)" }} />

        {/* Navigation */}
        <List sx={{ flexGrow: 1 }}>
          <ListItemButton
            selected={currentView === "pdfViewer"}
            onClick={() => onSelectView("pdfViewer")}
            sx={{
              borderRadius: "6px",
              "&.Mui-selected": {
                backgroundColor: "rgba(255,255,255,0.2)",
              },
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.15)",
              },
            }}
          >
            <ListItemText primary="PDF Viewer" />
          </ListItemButton>

          <ListItemButton
            selected={currentView === "crfViewer"}
            onClick={() => onSelectView("crfViewer")}
            sx={{
              borderRadius: "6px",
              "&.Mui-selected": {
                backgroundColor: "rgba(255,255,255,0.2)",
              },
              "&:hover": {
                backgroundColor: "rgba(255,255,255,0.15)",
              },
            }}
          >
            <ListItemText primary="CRF Viewer" />
          </ListItemButton>
        </List>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.3)" }} />

        {/* Save Button */}
        <Button
          variant="contained"
          onClick={onSave}
          disabled={currentView !== "crfViewer"}
          sx={{
            backgroundColor: "white",
            color: "#0A3D91",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#e6e6e6",
            },
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

