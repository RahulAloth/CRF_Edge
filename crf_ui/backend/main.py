from fastapi import FastAPI, HTTPException, UploadFile, File, Body
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
import json
import os

app = FastAPI()

# ---------------------------------------------------------
# CORS (Frontend Access)
# ---------------------------------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# File paths
JSON_PATH = "sample.json"
PDF_PATH = "sample.pdf"


# ---------------------------------------------------------
# 1️⃣ Load CRF JSON
# ---------------------------------------------------------
@app.get("/api/crf")
async def get_crf_data():
    if not os.path.exists(JSON_PATH):
        return []

    try:
        with open(JSON_PATH, "r") as f:
            data = json.load(f)
        return JSONResponse(content=data)
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid JSON format")


# ---------------------------------------------------------
# 2️⃣ Save CRF JSON (merge edited rows)
# ---------------------------------------------------------
@app.post("/api/crf/save")
async def save_crf_data(data: list = Body(...)):
    print("\n🔥 SAVE ENDPOINT HIT 🔥")
    print("\n--- Incoming Edited Rows ---")
    print(json.dumps(data, indent=4))

    try:
        # Load existing JSON
        if os.path.exists(JSON_PATH):
            with open(JSON_PATH, "r") as f:
                full_data = json.load(f)
        else:
            full_data = []

        print("\n--- Existing Full JSON ---")
        print(json.dumps(full_data, indent=4))

        # ⭐ Correct merge logic: match by page + raw_text
        merged = []
        for row in full_data:
            match = next(
                (e for e in data if e["page"] == row["page"] and e["raw_text"] == row["raw_text"]),
                None
            )
            merged.append(match if match else row)

        print("\n--- Merged JSON (Final Saved Version) ---")
        print(json.dumps(merged, indent=4))

        # Save merged file
        with open(JSON_PATH, "w") as f:
            json.dump(merged, f, indent=4)

        return {"message": "Data saved successfully", "saved": len(data)}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving data: {e}")


# ---------------------------------------------------------
# 3️⃣ Serve PDF file
# ---------------------------------------------------------
@app.get("/api/pdf")
async def get_pdf_file():
    if not os.path.exists(PDF_PATH):
        raise HTTPException(status_code=404, detail="PDF not found")
    return FileResponse(path=PDF_PATH, media_type="application/pdf")


# ---------------------------------------------------------
# 4️⃣ Upload a NEW JSON file
# ---------------------------------------------------------
@app.post("/api/upload-json")
async def upload_json(file: UploadFile = File(...)):
    try:
        content = await file.read()
        data = json.loads(content)

        with open(JSON_PATH, "w") as f:
            json.dump(data, f, indent=4)

        return {"message": "JSON uploaded successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid JSON file: {e}")


# ---------------------------------------------------------
# 5️⃣ Upload a NEW PDF file
# ---------------------------------------------------------
@app.post("/api/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    try:
        with open(PDF_PATH, "wb") as f:
            f.write(await file.read())

        return {"message": "PDF uploaded successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error saving PDF: {e}")


# ---------------------------------------------------------
# 6️⃣ Health Check
# ---------------------------------------------------------
@app.get("/api/health")
async def health_check():
    return {"status": "ok"}

# ---------------------------------------------------------
# 7️⃣ Upload Input CRF (PDF only)
# ---------------------------------------------------------
INPUT_CRF_DIR = "input_crf"
os.makedirs(INPUT_CRF_DIR, exist_ok=True)

@app.post("/api/upload/input-crf")
async def upload_input_crf(file: UploadFile = File(...)):
    # Validate file type
    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are allowed")

    save_path = os.path.join(INPUT_CRF_DIR, file.filename)

    try:
        with open(save_path, "wb") as buffer:
            buffer.write(await file.read())

        return {
            "message": "Input CRF PDF uploaded successfully",
            "filename": file.filename,
            "saved_to": save_path
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving Input CRF: {e}")


