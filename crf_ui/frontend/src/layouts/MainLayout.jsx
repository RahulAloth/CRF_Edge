import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";

const drawerWidth = 300;

export default function MainLayout({ children, onSelectView, onSave }) {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            background: "#0d1b2a",
            color: "white",
            padding: "16px 8px",
            boxSizing: "border-box",
            borderRight: "none",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            fontWeight: "bold",
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          CRF Annotation
          <br />
          Human In Loop
        </Typography>

        {/* Navigation */}
        <List sx={{ flexGrow: 1 }}>
          <ListItemButton onClick={() => onSelectView("pdfViewer")}>
            <ListItemText primary="PDF Viewer" />
          </ListItemButton>

          <ListItemButton onClick={() => onSelectView("crfViewer")}>
            <ListItemText primary="CRF Viewer" />
          </ListItemButton>

          {/* Add more modules here later */}
        </List>

        {/* Save Button */}
        <Button
          variant="contained"
          color="primary"
          sx={{ width: "100%", mb: 1 }}
          onClick={onSave}
        >
          Save Changes
        </Button>
      </Drawer>

      {/* Main Content Area */}
      <div
        style={{
          flexGrow: 1,
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            flexGrow: 1,
            minHeight: 0,
            overflow: "hidden",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

