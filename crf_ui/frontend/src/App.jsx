import React, { useState } from "react";
import MainLayout from "./layouts/MainLayout";
import PdfViewer from "./components/PdfViewer";
import CrfViewer from "./components/CrfViewer";

export default function App() {
  const [view, setView] = useState("pdfViewer");

  const handleSave = () => {
    console.log("Save clicked");
  };

  return (
    <MainLayout onSelectView={setView} onSave={handleSave}>
      {view === "pdfViewer" && <PdfViewer />}
      {view === "crfViewer" && <CrfViewer />}
    </MainLayout>
  );
}

