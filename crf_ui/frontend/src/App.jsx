import React, { useState, useRef } from "react";
import MainLayout from "./layouts/MainLayout";
import PdfViewer from "./components/PdfViewer";
import CrfViewer from "./components/CrfViewer";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function App() {
  const [view, setView] = useState("pdfViewer");

  // Toast state
  const [toastOpen, setToastOpen] = useState(false);

  // Reference to CrfViewer so we can call saveChanges()
  const crfRef = useRef();

  const handleSave = () => {
    if (crfRef.current) {
      crfRef.current.saveChanges().then((res) => {
        console.log("Saved:", res);
        setToastOpen(true);   // ⭐ Show toast instead of alert
      });
    }
  };

  return (
    <>
      <MainLayout
        onSelectView={setView}
        onSave={handleSave}
        currentView={view}
      >
        {view === "pdfViewer" && <PdfViewer />}
        {view === "crfViewer" && <CrfViewer ref={crfRef} />}
      </MainLayout>

      {/* ⭐ Toast Notification */}
      <Snackbar
        open={toastOpen}
        autoHideDuration={3000}
        onClose={() => setToastOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setToastOpen(false)}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          CRF changes saved!
        </Alert>
      </Snackbar>
    </>
  );
}

