# ==========================================================
# IMPORTS
# ==========================================================

import os
import json
import uuid
import shutil

from datetime import datetime
from typing import List
import asyncio

from fastapi import (
    FastAPI,
    HTTPException,
    UploadFile,
    File,
    Form,
    Body,
    WebSocket,
    WebSocketDisconnect
)

from fastapi.responses import (
    JSONResponse,
    FileResponse
)

from fastapi.middleware.cors import CORSMiddleware

import crf_connect


# ==========================================================
# FASTAPI APPLICATION
# ==========================================================

app = FastAPI(
    title="CRF Host Backend"
)

# ==========================================================
# EDGE STARTUP CONNECTION
# ==========================================================

try:
    crf_connect.init_connection()
    print("[HOST] Connected to Edge API")
except Exception as e:
    print(
        f"[WARNING] Could not connect to Edge API: {e}"
    )


# ==========================================================
# WEBSOCKET MANAGER
# ==========================================================

connected_clients: List[WebSocket] = []

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):

    await websocket.accept()
    connected_clients.append(websocket)

    try:

        while True:
            await asyncio.sleep(30)

    except WebSocketDisconnect:

        pass

    finally:

        if websocket in connected_clients:
            connected_clients.remove(websocket)


async def notify_job_completed( job_id: str ):
    payload = json.dumps(
        {
            "type": "completed",
            "job_id": job_id
        }
    )

    stale_clients = []

    for ws in connected_clients:

        try:
            await ws.send_text(payload)

        except Exception:
            stale_clients.append(ws)

    for ws in stale_clients:

        if ws in connected_clients:
            connected_clients.remove(ws)


# ==========================================================
# CORS
# ==========================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================================
# APPLICATION DIRECTORIES
# ==========================================================

BASE_DIR = "application"

UPLOAD_DIR = os.path.join(
    BASE_DIR,
    "uploads"
)

STATUS_DIR = os.path.join(
    BASE_DIR,
    "status"
)

COMPLETED_DIR = os.path.join(
    BASE_DIR,
    "completed"
)

for directory in [
    UPLOAD_DIR,
    STATUS_DIR,
    COMPLETED_DIR]:
    
        os.makedirs(
            directory,
            exist_ok=True
        )


# ==========================================================
# HELPERS
# ==========================================================

def update_status(
    job_id: str,
    status: str
):
    """
    Write status file.
    """

    path = os.path.join(
        STATUS_DIR,
        f"{job_id}.status"
    )

    with open(path, "w") as f:
        f.write(status)


def read_status(
    job_id: str
):

    path = os.path.join(
        STATUS_DIR,
        f"{job_id}.status"
    )

    if not os.path.exists(path):
        return None

    with open(path, "r") as f:
        return f.read().strip()


def get_job_folder(
    job_id: str
):

    return os.path.join(
        COMPLETED_DIR,
        job_id
    )


def save_upload_file(
    upload: UploadFile,
    target_path: str
):

    with open(
        target_path,
        "wb"
    ) as output:

        shutil.copyfileobj(
            upload.file,
            output
        )


def write_metadata(
    job_id: str,
    files_saved: list
):

    metadata = {
        "job_id": job_id,
        "completed_at":
            datetime.utcnow().isoformat(),
        "files": files_saved
    }

    metadata_file = os.path.join(
        get_job_folder(job_id),
        "metadata.json"
    )

    with open(
        metadata_file,
        "w"
    ) as f:

        json.dump(
            metadata,
            f,
            indent=4
        )


def find_artifact(
    job_id: str,
    extension: str
):

    job_dir = get_job_folder(job_id)

    if not os.path.exists(job_dir):
        return None

    for file in os.listdir(job_dir):

        if file.endswith(extension):
            return os.path.join(
                job_dir,
                file
            )

    return None


# ==========================================================
# HEALTH CHECK
# ==========================================================

@app.get("/api/health")
async def health():

    return {
        "status": "ok"
    }


# ==========================================================
# UPLOAD INPUT CRF
# ==========================================================

@app.post("/api/upload/input-crf")
async def upload_input_crf(
    file: UploadFile = File(...)
):

    save_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    save_upload_file(
        file,
        save_path
    )

    print(
        f"[UPLOAD] Saved {file.filename}"
    )

    return {
        "status": "success",
        "filename": file.filename
    }


# ==========================================================
# CREATE JOB
# ==========================================================

@app.post("/api/job/create")
async def create_job(
    data: dict = Body(...)
):

    filename = data.get(
        "filename"
    )

    if not filename:

        raise HTTPException(
            status_code=400,
            detail="filename missing"
        )

    pdf_path = os.path.join(
        UPLOAD_DIR,
        filename
    )

    if not os.path.exists(pdf_path):

        raise HTTPException(
            status_code=404,
            detail="PDF not found"
        )

    job_id = str(
        uuid.uuid4()
    )

    update_status(
        job_id,
        "created"
    )

    try:

        crf_connect.submit_job(
            local_pdf_path=pdf_path,
            job_id=job_id,
            extra_metadata={
                "filename": filename
            }
        )

        update_status(
            job_id,
            "processing"
        )

        print(
            f"[JOB] Submitted "
            f"{job_id}"
        )

    except Exception as e:

        update_status(
            job_id,
            "error"
        )

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    return {
        "job_id": job_id,
        "status": "processing"
    }


# ==========================================================
# EDGE WEBHOOK
# ==========================================================

@app.post("/api/job/push_completed")
async def push_completed(
    job_id: str = Form(...),
    json_file: UploadFile = File(None),
    pdf_file: UploadFile = File(None),
    zip_file: UploadFile = File(None)
):
    """
    Edge pushes completed artifacts here.
    """

    try:

        job_dir = get_job_folder(
            job_id
        )

        os.makedirs(
            job_dir,
            exist_ok=True
        )

        files_saved = []

        uploads = [
            json_file,
            pdf_file,
            zip_file
        ]

        for upload in uploads:

            if upload is None:
                continue

            target_path = os.path.join(
                job_dir,
                upload.filename
            )

            save_upload_file(
                upload,
                target_path
            )

            files_saved.append(
                upload.filename
            )

            print(
                f"[WEBHOOK] Saved "
                f"{upload.filename}"
            )

        if not files_saved:

            raise RuntimeError(
                "No artifacts received"
            )

        write_metadata(
            job_id,
            files_saved
        )

        update_status(
            job_id,
            "completed"
        )
        await notify_job_completed(job_id)
        print(
            f"[COMPLETE] {job_id}"
        )

        return {
            "status": "success",
            "job_id": job_id,
            "files": files_saved
        }

    except Exception as e:

        update_status(
            job_id,
            "error"
        )

        print(
            f"[ERROR] {job_id}: {e}"
        )

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


# ==========================================================
# GET STATUS
# ==========================================================

@app.get("/api/job/status/{job_id}")
async def get_status(
    job_id: str
):

    status = read_status(
        job_id
    )

    if status is None:

        raise HTTPException(
            status_code=404,
            detail="Job not found"
        )

    return {
        "job_id": job_id,
        "status": status
    }


# ==========================================================
# GET JSON OUTPUT
# ==========================================================

@app.get("/api/job/output/{job_id}")
async def get_output_json(
    job_id: str
):

    job_dir = get_job_folder(job_id)

    if not os.path.exists(job_dir):

        raise HTTPException(
            status_code=404,
            detail="Job folder not found"
        )

    json_path = None

    for filename in os.listdir(job_dir):

        if (
            filename.endswith(".json")
            and filename != "metadata.json"
        ):

            json_path = os.path.join(
                job_dir,
                filename
            )

            break

    if json_path is None:

        raise HTTPException(
            status_code=404,
            detail="Output JSON not found"
        )

    with open(
        json_path,
        "r"
    ) as f:

        data = json.load(f)

    return JSONResponse(
        content=data
    )


# ==========================================================
# GET PDF OUTPUT
# ==========================================================

@app.get("/api/job/pdf/{job_id}")
async def get_output_pdf(
    job_id: str
):

    pdf_path = find_artifact(
        job_id,
        ".pdf"
    )

    if pdf_path is None:
        raise HTTPException(
            status_code=404,
            detail="PDF not found"
        )

    return FileResponse(
        pdf_path,
        media_type="application/pdf",
        filename=os.path.basename(
            pdf_path
        )
    )


# ==========================================================
# GET ZIP OUTPUT
# ==========================================================

@app.get("/api/job/zip/{job_id}")
async def get_output_zip(
    job_id: str
):

    zip_path = find_artifact(
        job_id,
        ".zip"
    )

    if zip_path is None:

        raise HTTPException(
            status_code=404,
            detail="ZIP not found"
        )

    return FileResponse(
        zip_path,
        media_type="application/zip",
        filename=os.path.basename(
            zip_path
        )
    )


# ==========================================================
# MAIN
# ==========================================================

if __name__ == "__main__":

    import uvicorn

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000
    )