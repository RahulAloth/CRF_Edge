# CRF UI

# 📘 Module Purpose

The CRF Frontend Module provides the user‑facing interface for all interactions with the CRF‑Edge system. It enables users to import CRF documents, visualize AI‑extracted annotations, perform Human‑in‑the‑Loop (HITL) corrections, and export final metadata and templates. This module acts as the operational bridge between Statistical Programmers, Clinical Data Managers, and the underlying Edge AI Processing Engine.

It ensures that all CRF processing remains local, secure, offline, and compliant with clinical‑data privacy requirements.

# 🧩 Module Responsibilities

## 1. CRF Import & Pre‑Processing Interface

The module allows users to upload CRF documents PDF and initiates page normalization.

Traceability:
    “The system shall allow users to import CRF documents in PDF format.” (FR‑001)
    “The system shall normalize page orientation, resolution, and layout before AI processing.” (FR‑002)

## 2. Visualization of AI‑Extracted Annotations

The module displays extracted annotations, bounding boxes, variable names, domains, and CT values.

Traceability: 
    “System displays AI‑extracted annotations with confidence scores.” (UC‑08)

## 3. Human‑in‑the‑Loop (HITL) Review

Users can validate, correct, or approve AI‑generated metadata.

Traceability: 
    “The system shall allow users to manually correct variable names, labels, domains, and CT values.” (FR‑081)
    “System logs all changes for audit purposes.” (UC‑08)

## 4. Processing Status & Error Feedback

The module provides progress indicators, error messages, and validation warnings.

Traceability: 
    “The system shall display progress indicators during CRF processing.” (FR‑061)
    “The system shall provide clear error messages for invalid CRFs or processing failures.” (FR‑063)

## 5. Export of Metadata & Templates

Users can export JSON metadata, SDTM templates, ADaM templates, and version‑comparison reports.

Traceability: 
    “The system shall allow users to export metadata and templates to local storage.” (FR‑062)

## 6. Batch Processing Interface

The module supports selection and processing of multiple CRFs.

    “The system shall support batch processing of multiple CRFs.” (FR‑070)

## 7. Version Comparison UI

The module provides a UI for comparing two CRF versions and visualizing differences.

Traceability: 
    “System identifies added, removed, or modified fields.” (UC‑07)



# Non‑Functional Requirements Covered by This Module
## Security

    “The system shall operate fully offline with no dependency on cloud services.” (NFR‑010)

## Usability

    “The system shall provide a minimal UI that can be used without specialized training.” (NFR‑030)

## Maintainability

    “The system shall follow clean coding standards to ensure maintainability.” (NFR‑043)

## Portability

    “The system shall optionally support Docker‑based deployment for portability.” (NFR‑053)

## Module Description

The CRF Frontend Module provides the user interface for all interactions with the CRF‑Edge system. It enables users to import CRF documents, visualize AI‑extracted annotations, perform Human‑in‑the‑Loop (HITL) corrections, monitor processing status, and export metadata and programming templates. The module supports single‑CRF and batch workflows, version comparison, and audit‑compliant review processes. It operates entirely offline and communicates with the CRF Ingestion Module, Edge AI Processing Engine, and Template Generation Module through structured metadata pipelines. The frontend is implemented using React + Vite and deployed via a Dockerized NGINX container for portability, maintainability, and secure on‑premise operation.

# 📘 CRF Annotation — Human‑in‑the‑Loop System


A modular **React + Vite + FastAPI** application for reviewing, editing, and annotating CRF (Case Report Form) data.

The system includes:

- 📄 PDF Viewer (loads CRF PDFs from backend)
- 📑 CRF Viewer (JSON → DataGrid)
- ✏️ Editable fields
- 💾 Save changes to backend
- 🧱 Modular layout with sidebar navigation

---

# 🚀 Features Implemented So Far

| Feature | Status |
|--------|--------|
| React + Vite frontend | ✅ Done |
| FastAPI backend | ✅ Done |
| PDF Viewer module | ✅ Done |
| CRF JSON Viewer module | ✅ Done |
| Auto‑generated DataGrid columns | ✅ Done |
| Editable DataGrid | ✅ Done |
| Save edited rows to backend | ✅ Done |
| Modular MainLayout with sidebar | ✅ Done |

---

# 🛠️ Installation & Setup

## 1️⃣ Clone the repository

```code
    git clone <CRF_Edge>
    cd /crf_ui
```
---

# ⚙️ Backend Setup (FastAPI)

## 2️⃣ Install Python dependencies

```code
    pip install fastapi uvicorn python-multipart
```

## 3️⃣ Backend folder structure

```code
    backend/
     ├── main.py
     ├── sample.pdf
     └── crf.json
```
---

## 4️⃣ Backend API Endpoints

### 📄 Serve PDF

```code
    @app.get("/api/pdf")
    def get_pdf():
        return FileResponse("sample.pdf", media_type="application/pdf")
```

### 📑 Serve CRF JSON

```code
    @app.get("/api/crf")
    def get_crf():
        with open("crf.json") as f:
            return json.load(f)
```
### 💾 Save CRF edits

```code
    @app.post("/api/save_crf")
    def save_crf(data: list):
        print("Received edited rows:", data)
        return {"status": "success", "received": data}
```
---

## 5️⃣ Start backend

```code
    uvicorn main:app --reload
```

Backend runs at:

```code
    http://127.0.0.1:8000
```

---

# 🖥️ Frontend Setup (React + Vite)

## 6️⃣ Install dependencies

    npm install

## 7️⃣ Install Material UI DataGrid

```code
    npm install @mui/material @mui/x-data-grid @emotion/react @emotion/styled
```

## 8️⃣ Start frontend

```code
    npm run dev
```

Frontend runs at:

```code
    http://localhost:5173
```

---

# 🧱 Frontend Architecture
```code
    src/
     ├── components/
     │    ├── PdfViewer.jsx
     │    ├── CrfViewer.jsx
     │    └── JsonViewer.jsx (optional)
     ├── layouts/
     │    └── MainLayout.jsx
     ├── App.jsx
     └── main.jsx
```
---

# 📄 PDF Viewer Module

Loads PDF from backend using iframe:
```code
    <iframe src="http://127.0.0.1:8000/api/pdf" />
```

---

# 📑 CRF Viewer Module (JSON → DataGrid)

- Fetches JSON from /api/crf  
- Auto‑generates DataGrid columns  
- Editable fields  
- Tracks edited rows  
- Exposes saveChanges() to App.jsx  

---

# 💾 Edit + Save Workflow

### Editing
- User edits any DataGrid cell  
- Changes stored in editedRows  

### Saving
- User clicks Save in sidebar  
- App.jsx calls crfRef.current.saveChanges()  
- Edited rows sent to backend /api/save_crf  

---

# 🧭 MainLayout (Sidebar Navigation)

Modules available:

- PDF Viewer  
- CRF Viewer  

Sidebar buttons:

```code
    <ListItemButton onClick={() => onSelectView("pdfViewer")}>
    <ListItemButton onClick={() => onSelectView("crfViewer")}>
```
---

# 🔗 App.jsx (Module Router)
```code
    {view === "pdfViewer" && <PdfViewer />}
    {view === "crfViewer" && <CrfViewer ref={crfRef} />}
```
---

# 📌 Next Enhancements (TODO)

- Status badges (Pending / Approved / Rejected)
- Row‑level Approve/Reject buttons
- Auto‑save on edit
- PDF + CRF split‑screen mode
- Audit log module
- Study metadata module

---

# 🏁 Summary

Working Modules:

- PDF Viewer  
- CRF JSON Viewer  
- Editable DataGrid  
- Save‑to‑backend workflow  
- Modular layout with navigation  


