import os
import json
import sys
from fastapi import FastAPI, UploadFile, File, Form, HTTPException

sys.path.append(os.path.abspath(".."))
from crf_pdf_process.crf_split_into_images import pdf_to_images


##sys.path.append(parent)
## print(sys.path)


import uvicorn

app = FastAPI(title="CRF Daemon API")

# Directories
BASE_DIR = os.path.expanduser("~/crf_job_daemon")
INPUT_DIR = os.path.join(BASE_DIR, "crf_input")
FIFO_PATH = os.path.join(BASE_DIR, "crf_job_queue.fifo")
IMAGE_DIR = os.path.join(BASE_DIR, "crf_images")

os.makedirs(BASE_DIR, exist_ok=True)
os.makedirs(INPUT_DIR, exist_ok=True)
os.makedirs(IMAGE_DIR, exist_ok=True)

print(f"[Daemon] Base Directory: {BASE_DIR}")
print(f"[Daemon] Input Directory: {INPUT_DIR}")
print(f"[Daemon] FIFO Path: {FIFO_PATH}")
print(f"[Daemon] Image Directory: {IMAGE_DIR}")

# Create FIFO if it doesn't exist
if not os.path.exists(FIFO_PATH):
    os.mkfifo(FIFO_PATH)


def enqueue_job(json_path: str) -> bool:
    """
    Push a JSON file path into the FIFO queue.
    """

    try:
        fd = os.open(FIFO_PATH, os.O_WRONLY | os.O_NONBLOCK)

        with os.fdopen(fd, "w") as fifo:
            fifo.write(json_path + "\n")
            fifo.flush()

        print(f"[Daemon] Queued: {json_path}")
        return True

    except OSError as e:
        print(f"[Daemon] FIFO Error: {e}")
        return False


@app.post("/submit_job")
async def submit_job(
    job_id: str = Form(...),
    metadata: str = Form(...),
    file: UploadFile = File(...)
):
    try:
        # Save PDF
        pdf_path = os.path.join(INPUT_DIR, f"{job_id}.pdf")
        with open(pdf_path, "wb") as f:
            f.write(await file.read())

        # Save JSON
        json_path = os.path.join(INPUT_DIR, f"{job_id}.json")

        try:
            json_data = json.loads(metadata)
        except json.JSONDecodeError:
            raise HTTPException(
                status_code=400,
                detail="metadata must be valid JSON"
            )

        json_data["job_id"] = job_id
        json_data["pdf_path"] = pdf_path
        json_data["status"] = "uploaded"

        with open(json_path, "w") as f:
            json.dump(json_data, f, indent=4)

        print(f"[Daemon] Saved PDF : {pdf_path}")
        print(f"[Daemon] Saved JSON: {json_path}")

        # Process PDF to images
        updated_json_data = pdf_to_images(
            pdf_path=pdf_path,
            output_dir=IMAGE_DIR,
            job_json=json_data
        )

        # Persist updated JSON dictionary back to file if returned by pdf_to_images
        if updated_json_data:
            with open(json_path, "w") as f:
                json.dump(updated_json_data, f, indent=4)

        # Push JSON file path string into FIFO
        enqueue_job(json_path)

        return {
            "status": "success",
            "pdf_path": pdf_path,
            "json_path": json_path
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )


if __name__ == "__main__":
    print(f"[Daemon] FIFO Path: {FIFO_PATH}")

    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000
    )