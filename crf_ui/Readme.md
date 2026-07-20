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

You now have a fully working:

- PDF Viewer  
- CRF JSON Viewer  
- Editable DataGrid  
- Save‑to‑backend workflow  
- Modular layout with navigation  

This README is fully GitHub‑compatible and safe to paste directly.

