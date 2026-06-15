import React, { useEffect, useState } from "react";

export default function PDFInputViewer({ file }) {
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    if (file) {
      const localUrl = URL.createObjectURL(file);
      setPdfUrl(localUrl);

      return () => URL.revokeObjectURL(localUrl);
    }
  }, [file]);

  if (!file) {
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
        No PDF selected. Please upload a CRF PDF from the left panel.
      </div>
    );
  }

  return (
    <iframe
      src={pdfUrl}
      title="CRF Input Viewer"
      style={{
        width: "100%",
        height: "100%",
        border: "none",
      }}
    />
  );
}

