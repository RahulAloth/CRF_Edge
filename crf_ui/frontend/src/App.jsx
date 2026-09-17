import React, { useState, useRef, useEffect } from "react";
import MainLayout from "./layouts/MainLayout";

import PDFInputViewer from "./components/PDFInputViewer";
import PdfViewer from "./components/PdfViewer";
import CrfViewer from "./components/CrfViewer";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function App() {
  const [view, setView] = useState("crfInputViewer");

  // ⭐ Stores uploaded CRF PDF (actual File object)
  const [inputPdfFile, setInputPdfFile] = useState(null);

  // ⭐ Stores filename returned by backend
  const [filename, setFilename] = useState("");

  // ⭐ Job tracking
  const [jobId, setJobId] = useState(null);
  const [jobStatus, setJobStatus] = useState("");
  const [jobMessage, setJobMessage] = useState("");

  const [toastOpen, setToastOpen] = useState(false);
  const crfRef = useRef();

  // ---------------------------------------------------------
  // SAVE BUTTON HANDLER
  // ---------------------------------------------------------
  const handleSave = () => {
    if (crfRef.current) {
      crfRef.current.saveChanges().then(() => {
        setToastOpen(true);
      });
    }
  };

  // ---------------------------------------------------------
  // GENERATE BUTTON HANDLER
  // ---------------------------------------------------------
  const handleGenerate = async () => {
    if (!filename) {
      alert("No uploaded filename found!");
      return;
    }

    console.log("Generating job for:", filename);

    const res = await fetch("http://localhost:8000/api/job/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename }),
    });

    const data = await res.json();
    console.log("Job created:", data);

    setJobId(data.job_id);
  };

  // ---------------------------------------------------------
  // POLLING JOB STATUS
  // ---------------------------------------------------------
  useEffect(() => {
    if (!jobId) return;

    const interval = setInterval(async () => {
      const res = await fetch(`http://localhost:8000/api/job/status/${jobId}`);
      const data = await res.json();

      console.log("Job status:", data);

      setJobStatus(data.status);
      setJobMessage(data.message);

      if (data.status === "completed" || data.status === "error") {
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [jobId]);

  // ---------------------------------------------------------
  // HANDLE PDF UPLOAD RESULT FROM MainLayout
  // ---------------------------------------------------------
  const handlePdfUploaded = (result) => {
    // result = { message, filename, saved_to }
    setFilename(result.filename);
  };

  return (
    <>
      <MainLayout
        onSelectView={setView}
        onSave={handleSave}
        onGenerate={handleGenerate}
        currentView={view}
        setInputPdfFile={setInputPdfFile}
        inputPdfFile={inputPdfFile}
        onPdfUploaded={handlePdfUploaded}   // ⭐ NEW
      >
        {/* ⭐ ROUTING */}
        {view === "crfInputViewer" && (
          <PDFInputViewer file={inputPdfFile} />
        )}

        {view === "crfOutputViewer" && <PdfViewer />}

        {view === "crfSdtmMap" && <CrfViewer ref={crfRef} />}
      </MainLayout>

      {/* ⭐ JOB STATUS DISPLAY */}
      {jobId && (
        <div style={{ padding: "10px", background: "#eef", margin: "10px" }}>
          <p><strong>Job ID:</strong> {jobId}</p>
          <p><strong>Status:</strong> {jobStatus}</p>
          <p><strong>Message:</strong> {jobMessage}</p>
        </div>
      )}

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
