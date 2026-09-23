import React, { useState, useEffect } from "react";
import MainLayout from "./layouts/MainLayout";

import PdfInputViewer from "./components/PdfInputViewer";
import OutputPdfViewer from "./components/OutputPdfViewer";
import OutputJsonViewer from "./components/OutputJsonViewer";
import JobStatusPanel from "./components/JobStatusPanel";

import { createJob, getJobStatus } from "./api/backend";

export default function App() {
  const [view, setView] = useState("input");   // input | outputPdf | outputJson

  const [inputPdfFile, setInputPdfFile] = useState(null);
  const [filename, setFilename] = useState("");

  const [jobId, setJobId] = useState(null);
  const [jobStatus, setJobStatus] = useState("");
  const [jobMessage, setJobMessage] = useState("");

  // ---------------------------------------------------------
  // GENERATE BUTTON HANDLER
  // ---------------------------------------------------------
  const handleGenerate = async () => {
    if (!filename) {
      alert("No uploaded filename found!");
      return;
    }

    try {
      const data = await createJob(filename);
      setJobId(data.job_id);
    } catch (err) {
      console.error("Job creation failed:", err);
      alert("Job creation failed");
    }
  };

  // ---------------------------------------------------------
  // POLLING JOB STATUS WITH TIMEOUT (FINAL VERSION)
  // ---------------------------------------------------------
  useEffect(() => {
    if (!jobId) return;

    const POLL_INTERVAL = 2000;     // 2 seconds
    const TIMEOUT_MS = 120000;      // 2 minutes
    const startTime = Date.now();

    const interval = setInterval(async () => {
      try {
        // Timeout reached?
        if (Date.now() - startTime > TIMEOUT_MS) {
          clearInterval(interval);
          setJobStatus("error");
          setJobMessage("Timeout: No response from Edge daemon");
          return;
        }

        const data = await getJobStatus(jobId);

        setJobStatus(data.status);
        setJobMessage(data.message);

        if (data.status === "completed") {
          clearInterval(interval);
          setView("outputPdf");   // auto-switch to processed PDF
        }

        if (data.status === "error") {
          clearInterval(interval);
        }
      } catch (err) {
        clearInterval(interval);
        setJobStatus("error");
        setJobMessage("Polling failed: backend unreachable");
      }
    }, POLL_INTERVAL);

    return () => clearInterval(interval);
  }, [jobId]);

  // ---------------------------------------------------------
  // HANDLE PDF UPLOAD RESULT
  // ---------------------------------------------------------
  const handlePdfUploaded = (result) => {
    if (!result.filename) {
      alert("Backend did not return filename!");
      return;
    }
    setFilename(result.filename);
  };

  return (
    <>
      <MainLayout
        onSelectView={setView}
        onGenerate={handleGenerate}
        currentView={view}
        setInputPdfFile={setInputPdfFile}
        inputPdfFile={inputPdfFile}
        onPdfUploaded={handlePdfUploaded}
      >
        {view === "input" && <PdfInputViewer file={inputPdfFile} />}
        {view === "outputPdf" && <OutputPdfViewer jobId={jobId} />}
        {view === "outputJson" && <OutputJsonViewer jobId={jobId} />}
      </MainLayout>

      <JobStatusPanel
        jobId={jobId}
        jobStatus={jobStatus}
        jobMessage={jobMessage}
      />
    </>
  );
}
