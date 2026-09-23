import React, { useState, useRef, useEffect } from "react";
import MainLayout from "./layouts/MainLayout";

import PDFInputViewer from "./components/PDFInputViewer";
import PdfViewer from "./components/PdfViewer";
import CrfViewer from "./components/CrfViewer";
import JobStatusPanel from "./components/JobStatusPanel";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import { createJob, getJobStatus } from "./api/backend";

export default function App() {
  const [view, setView] = useState("crfInputViewer");

  const [inputPdfFile, setInputPdfFile] = useState(null);
  const [filename, setFilename] = useState("");

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

    try {
      const data = await createJob(filename);
      console.log("Job created:", data);
      setJobId(data.job_id);
    } catch (err) {
      console.error("Job creation failed:", err);
      alert("Job creation failed");
    }
  };

  // ---------------------------------------------------------
  // POLLING JOB STATUS WITH TIMEOUT
  // ---------------------------------------------------------
  useEffect(() => {
    if (!jobId) return;

    let pollCount = 0;
    const MAX_POLLS = 10; // ~200 seconds at 2s interval

    const interval = setInterval(async () => {
      try {
        pollCount++;

        // Timeout protection
        if (pollCount > MAX_POLLS) {
          console.error("Polling timeout reached. Setting job to error.");

          setJobStatus("error");
          setJobMessage("Timeout: No response from Edge daemon");
          clearInterval(interval);
          return;
        }

        const data = await getJobStatus(jobId);
        console.log("Job status:", data);

        setJobStatus(data.status);
        setJobMessage(data.message);

        if (data.status === "completed" || data.status === "error") {
          clearInterval(interval);
        }
      } catch (err) {
        console.error("Status polling failed:", err);
        clearInterval(interval);
        setJobStatus("error");
        setJobMessage("Polling failed: backend unreachable");
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [jobId]);

  // ---------------------------------------------------------
  // HANDLE PDF UPLOAD RESULT FROM MainLayout
  // ---------------------------------------------------------
  const handlePdfUploaded = (result) => {
    console.log("PDF upload result:", result);
    if (!result.filename) {
      alert("Backend did not return filename!");
      console.log("Upload result:", result);
      return;
    }

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
        onPdfUploaded={handlePdfUploaded}
      >
        {view === "crfInputViewer" && <PDFInputViewer file={inputPdfFile} />}
        {view === "crfOutputViewer" && <PdfViewer />}
        {view === "crfSdtmMap" && <CrfViewer ref={crfRef} />}
      </MainLayout>

      {/* ⭐ Professional Job Status Panel */}
      <JobStatusPanel
        jobId={jobId}
        jobStatus={jobStatus}
        jobMessage={jobMessage}
      />

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
