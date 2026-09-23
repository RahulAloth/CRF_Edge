from fastapi import FastAPI, HTTPException, UploadFile, File, Body
from fastapi.responses import JSONResponse, FileResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json
import os
import uuid

import crf_connect
crf_connect.init_connection()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

JSON_PATH = "sample.json"
PDF_PATH = "sample.pdf"

@app.get("/api/crf")
async def get_crf_data():
    if not os.path.exists(JSON_PATH):
        return []
    with open(JSON_PATH, "r") as f:
        return JSONResponse(content=json.load(f))

@app.post("/api/crf/save")
async def save_crf_data(data: list = Body(...)):
    if os.path.exists(JSON_PATH):
        with open(JSON_PATH, "r") as f:
            full_data = json.load(f)
    else:
        full_data = []

    merged = []
    for row in full_data:
        match = next((e for e in data if e["page"] == row["page"] and e["raw_text"] == row["raw_text"]), None)
        merged.append(match if match else row)

    with open(JSON_PATH, "w") as f:
        json.dump(merged, f, indent=4)

    return {"message": "Data saved successfully", "saved": len(data)}

@app.get("/api/pdf")
async def get_pdf_file():
    if not os.path.exists(PDF_PATH):
        raise HTTPException(status_code=404, detail="PDF not found")
    return FileResponse(path=PDF_PATH, media_type="application/pdf")

@app.post("/api/upload-json")
async def upload_json(file: UploadFile = File(...)):
    content = await file.read()
    data = json.loads(content)
    with open(JSON_PATH, "w") as f:
        json.dump(data, f, indent=4)
    return {"message": "JSON uploaded successfully"}

@app.post("/api/upload-pdf")
async def upload_pdf(file: UploadFile = File(...)):
    with open(PDF_PATH, "wb") as f:
        f.write(await file.read())
    return {"message": "PDF uploaded successfully"}

@app.get("/api/health")
async def health_check():
    return {"status": "ok"}

INPUT_CRF_DIR = "input_crf"
os.makedirs(INPUT_CRF_DIR, exist_ok=True)

@app.post("/api/upload/input-crf")
async def upload_input_crf(file: UploadFile = File(...)):
    save_path = os.path.join(INPUT_CRF_DIR, file.filename)
    with open(save_path, "wb") as buffer:
        buffer.write(await file.read())
    return {
        "message": "Input CRF PDF uploaded successfully",
        "filename": file.filename,
        "saved_to": save_path,
    }

QUEUE_DIR = "input_crf/crf_daemon/queue"
STATUS_DIR = "input_crf/crf_daemon/status"
COMPLETED_DIR = "input_crf/crf_daemon/completed"

os.makedirs(QUEUE_DIR, exist_ok=True)
os.makedirs(STATUS_DIR, exist_ok=True)
os.makedirs(COMPLETED_DIR, exist_ok=True)

def write_status(job_id: str, msg: str):
    with open(f"{STATUS_DIR}/{job_id}.status", "w") as f:
        f.write(msg)

# ⭐ FIXED ENDPOINT
class JobRequest(BaseModel):
    filename: str

@app.post("/api/job/create")
async def create_job(req: JobRequest):
    filename = req.filename

    local_path = os.path.join(INPUT_CRF_DIR, filename)
    if not os.path.exists(local_path):
        raise HTTPException(status_code=404, detail="PDF not found")

    job_id = str(uuid.uuid4())

    job_file = f"{QUEUE_DIR}/{job_id}.json"
    with open(job_file, "w") as f:
        json.dump({"job_id": job_id, "filename": filename}, f)

    write_status(job_id, "created")

    crf_connect.send_job_file(job_file, job_id)

    return {
        "job_id": job_id,
        "status": "created",
        "message": "job_sent_to_edge",
    }

@app.get("/api/job/status/{job_id}")
async def job_status(job_id: str):
    status_file = f"{STATUS_DIR}/{job_id}.status"
    queue_file = f"{QUEUE_DIR}/{job_id}.json"
    completed_file = f"{COMPLETED_DIR}/{job_id}.json"

    if os.path.exists(completed_file):
        msg = "completed"
        if os.path.exists(status_file):
            with open(status_file, "r") as f:
                msg = f.read().strip()
        return {"job_id": job_id, "status": "completed", "message": msg}

    if os.path.exists(queue_file):
        if os.path.exists(status_file):
            with open(status_file, "r") as f:
                msg = f.read().strip()
            status = "processing" if msg != "created" else "created"
            return {"job_id": job_id, "status": status, "message": msg}
        return {"job_id": job_id, "status": "queued", "message": "Job is waiting in queue"}

    raise HTTPException(status_code=404, detail="Job not found")
