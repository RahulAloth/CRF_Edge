import React, { useEffect, useState } from "react";

export default function PdfViewer() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const url = "http://127.0.0.1:8000/api/pdf";

    // Reliable check: GET without downloading full PDF
    fetch(url, { method: "GET" })
      .then((res) => {
        if (res.ok) {
          setPdfUrl(url);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <div
        style={{
          padding: 20,
          fontSize: 18,
          color: "#444",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        No PDF available from backend.
      </div>
    );
  }

  if (!pdfUrl) {
    return (
      <div
        style={{
          padding: 20,
          fontSize: 18,
          color: "#666",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        Loading PDF…
      </div>
    );
  }

  return (
    <iframe
      src={pdfUrl}
      title="PDF Viewer"
      style={{
        width: "100%",
        height: "100%",
        border: "none",
      }}
    />
  );
}

