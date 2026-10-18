import React, { useEffect, useState } from "react";

export default function OutputPdfViewer({ jobId }) {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    if (!jobId) return;

    let objectUrl = null;

    // Fetch the PDF from the backend as a blob
    fetch(`http://127.0.0.1:8000/api/job/pdf/${jobId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch PDF");
        return res.blob();
      })
      .then((blob) => {
        // Create a local object URL just like you did with the uploaded file
        objectUrl = URL.createObjectURL(blob);
        setPdfUrl(objectUrl);
      })
      .catch((err) => {
        console.error("Error loading PDF:", err);
      });

    // Cleanup the object URL when the component unmounts or jobId changes
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [jobId]);

  if (!jobId) {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "18px",
          color: "#666",
        }}
      >
        Waiting for processed PDF...
      </div>
    );
  }

  if (!pdfUrl) {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "18px",
          color: "#666",
        }}
      >
        Loading PDF viewer...
      </div>
    );
  }

  return (
    <iframe
      src={pdfUrl}
      title="CRF Output Viewer"
      style={{
        width: "100%",
        height: "100%",
        border: "none",
      }}
    />
  );
}