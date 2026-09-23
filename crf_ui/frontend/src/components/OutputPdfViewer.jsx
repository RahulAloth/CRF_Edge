import React from "react";

export default function OutputPdfViewer({ jobId }) {
  if (!jobId) return null;

  const pdfUrl = `http://127.0.0.1:8000/api/job/output/${jobId}.pdf`;

  return (
    <iframe
      src={pdfUrl}
      title="Processed PDF Viewer"
      style={{ width: "100%", height: "100%", border: "none" }}
    />
  );
}

