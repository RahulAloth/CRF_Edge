from fastapi import FastAPI, UploadFile, File
import requests
import os

app = FastAPI(title="Host App")

EDGE_IP = "192.168.178.112"
EDGE_PORT = 8001

UPLOAD_DIR = "host_received"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@app.get("/")
def root():
    return {"system": "HOST"}


@app.post("/send_to_edge")
def send_to_edge():

    filepath = "test123.txt"

    if not os.path.exists(filepath):
        return {"error": f"{filepath} not found"}

    with open(filepath, "rb") as f:

        files = {
            "file": (
                os.path.basename(filepath),
                f,
                "text/plain"
            )
        }

        response = requests.post(
            f"http://{EDGE_IP}:{EDGE_PORT}/receive_file",
            files=files,
            timeout=30
        )

    return {
        "status_code": response.status_code,
        "response": response.json()
    }


@app.post("/receive_from_edge")
async def receive_from_edge(
    file: UploadFile = File(...)
):

    save_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(save_path, "wb") as f:
        f.write(await file.read())

    print(f"[HOST] Received file: {save_path}")

    return {
        "status": "success",
        "saved_to": save_path
    }
