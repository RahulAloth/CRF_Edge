from fastapi import FastAPI, HTTPException, UploadFile, File, Body
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
import json
import os

app = FastAPI()

# Allow frontend
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
# 1️⃣ Load CRF JSON (dynamic, raw JSON list)
# ---------------------------------------------------------
@app.get("/api/crf")
async def get_crf_data():
    if not os.path.exists(JSON_PATH):
        return []  # No file → return empty list

    try:
        with open(JSON_PATH, "r") as f:
            data = json.load(f)
        return JSONResponse(content=data)
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid JSON format")


# ---------------------------------------------------------
# 2️⃣ Save CRF JSON (accept raw JSON array)
# ---------------------------------------------------------
@app.post("/api/crf/save")
async def save_crf_data(data: list = Body(...)):
    """
    Accepts raw JSON list:
    [
      { "page": 1, "raw_text": "Hello" },
      { "page": 2, "raw_text": "World" }
    ]
    """
    try:
        with open(JSON_PATH, "w") as f:
            json.dump(data, f, indent=4)
        return {"message": "Data saved successfully"}
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

