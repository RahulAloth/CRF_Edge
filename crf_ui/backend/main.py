from fastapi import FastAPI, HTTPException, UploadFile, File, Body
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
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

# ---------------------------------------------------------
# DIRECTORIES
# ---------------------------------------------------------
INPUT_CRF_DIR = "input_crf"
STATUS_DIR = "input_crf/crf_daemon/status"
COMPLETED_DIR = "input_crf/crf_daemon/completed"

os.makedirs(INPUT_CRF_DIR, exist_ok=True)
os.makedirs(STATUS_DIR, exist_ok=True)
os.makedirs(COMPLETED_DIR, exist_ok=True)

# ---------------------------------------------------------
# UPLOAD INPUT CRF PDF
# ---------------------------------------------------------
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

# ---------------------------------------------------------
# CREATE JOB  (NO QUEUE FILE)
# ---------------------------------------------------------
@app.post("/api/job/create")
async def create_job(data: dict = Body(...)):
    filename = data["filename"]
    local_pdf_path = os.path.join(INPUT_CRF_DIR, filename)

    if not os.path.exists(local_pdf_path):
        raise HTTPException(status_code=404, detail="PDF not found")

    job_id = str(uuid.uuid4())

    # Write initial status
    status_path = os.path.join(STATUS_DIR, f"{job_id}.status")
    with open(status_path, "w") as f:
        f.write("created")

    # Send PDF + metadata to Edge
    crf_connect.send_pdf_file(local_pdf_path, job_id)
    crf_connect.send_job_metadata(job_id, filename)

    return {
        "job_id": job_id,
        "status": "created",
        "message": "job_sent_to_edge",
    }

# ---------------------------------------------------------
# JOB STATUS (ONLY STATUS FILE)
# Edge Daemon will update the status file in STATUS_DIR when it receives the job and when it completes processing.
# The status file will contain one of the following statuses: "created", "processing", "completed", "error"
# Example of status file content:
# write_status(job_id, "created")
# write_status(job_id, "processing")
# write_status(job_id, "completed")
# write_status(job_id, "error")

# ---------------------------------------------------------
@app.get("/api/job/status/{job_id}")
async def job_status(job_id: str):
    status_file = os.path.join(STATUS_DIR, f"{job_id}.status")

    if not os.path.exists(status_file):
        raise HTTPException(status_code=404, detail="Job not found")

    with open(status_file, "r") as f:
        status = f.read().strip()

    return {
        "job_id": job_id,
        "status": status,
        "message": status,
    }

# ---------------------------------------------------------
# GET COMPLETED OUTPUT JSON
# ---------------------------------------------------------
@app.get("/api/job/output/{job_id}")
async def job_output(job_id: str):
    completed_file = os.path.join(COMPLETED_DIR, f"{job_id}.json")

    if not os.path.exists(completed_file):
        raise HTTPException(status_code=404, detail="Completed output not found")

    with open(completed_file, "r") as f:
        return JSONResponse(content=json.load(f))

# ---------------------------------------------------------
# HEALTH CHECK
# ---------------------------------------------------------
@app.get("/api/health")
async def health_check():
    return {"status": "ok"}
