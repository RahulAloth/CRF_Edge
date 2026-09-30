from fastapi import FastAPI, HTTPException, UploadFile, File, Body
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import json
import os
import uuid

import crf_connect

# Initialize and test connection to Edge HTTP API on startup
try:
    crf_connect.init_connection()
except Exception as e:
    print(f"[WARNING] Could not connect to Edge API on startup: {e}")

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
# CREATE JOB
# ---------------------------------------------------------
@app.post("/api/job/create")
async def create_job(data: dict = Body(...)):
    filename = data.get("filename")
    if not filename:
        raise HTTPException(status_code=400, detail="Filename missing in request body")

    local_pdf_path = os.path.join(INPUT_CRF_DIR, filename)

    if not os.path.exists(local_pdf_path):
        raise HTTPException(status_code=404, detail="PDF not found")

    job_id = str(uuid.uuid4())

    # Write initial status
    status_path = os.path.join(STATUS_DIR, f"{job_id}.status")
    with open(status_path, "w") as f:
        f.write("created")

    # Send PDF + Metadata to Edge via single HTTP request
    try:
        crf_connect.submit_job(
            local_pdf_path=local_pdf_path,
            job_id=job_id,
            extra_metadata={"filename": filename}
        )
    except Exception as e:
        # Update local status to error if submission fails
        with open(status_path, "w") as f:
            f.write("error")
        raise HTTPException(status_code=500, detail=f"Failed to submit job to Edge: {str(e)}")

    return {
        "job_id": job_id,
        "status": "created",
        "message": "job_sent_to_edge",
    }


# ---------------------------------------------------------
# JOB STATUS
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

    # If completed file is not local yet, pull it over HTTP from Edge
    if not os.path.exists(completed_file):
        try:
            crf_connect.pull_completed(job_id, COMPLETED_DIR)
        except Exception as e:
            raise HTTPException(
                status_code=404, 
                detail=f"Completed output not available or download failed: {str(e)}"
            )

    with open(completed_file, "r") as f:
        return JSONResponse(content=json.load(f))


# ---------------------------------------------------------
# HEALTH CHECK
# ---------------------------------------------------------
@app.get("/api/health")
async def health_check():
    return {"status": "ok"}