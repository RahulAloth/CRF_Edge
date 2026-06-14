import React, { useState, useRef } from "react";
import MainLayout from "./layouts/MainLayout";

import PDFInputViewer from "./components/PDFInputViewer";
import PdfViewer from "./components/PdfViewer";
import CrfViewer from "./components/CrfViewer";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function App() {
  // Default view is CRF Input Viewer
  const [view, setView] = useState("crfInputViewer");

  // Stores uploaded CRF PDF
  const [inputPdfFile, setInputPdfFile] = useState(null);

  const [toastOpen, setToastOpen] = useState(false);
  const crfRef = useRef();

  const handleSave = () => {
    if (crfRef.current) {
      crfRef.current.saveChanges().then(() => {
        setToastOpen(true);
      });
    }
  };

  const handleGenerate = () => {
    if (!inputPdfFile) return;

    console.log("Generating from:", inputPdfFile.name);

    // TODO: Call backend here
  };

  return (
    <>
      <MainLayout
        onSelectView={setView}
        onSave={handleSave}
        onGenerate={handleGenerate}
        currentView={view}
        setInputPdfFile={setInputPdfFile}
        inputPdfFile={inputPdfFile}   // ⭐ CRITICAL FIX
      >
        {/* ⭐ ROUTING */}
        {view === "crfInputViewer" && (
          <PDFInputViewer file={inputPdfFile} />
        )}

        {view === "crfOutputViewer" && <PdfViewer />}

        {view === "crfSdtmMap" && <CrfViewer ref={crfRef} />}
      </MainLayout>

      {/* Toast */}
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

