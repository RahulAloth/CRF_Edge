from fastapi import FastAPI, UploadFile, File
import requests
import os

app = FastAPI(title="Edge App")

HOST_IP = "192.168.178.24"
HOST_PORT = 8004

UPLOAD_DIR = "edge_received"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@app.get("/")
def root():
    return {"system": "EDGE"}


@app.post("/receive_file")
async def receive_file(
    file: UploadFile = File(...)
):

    save_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(save_path, "wb") as f:
        f.write(await file.read())

    print(f"[EDGE] Received file: {save_path}")

    return {
        "status": "received",
        "filename": file.filename
    }


@app.post("/send_back")
def send_back():

    filepath = "edge_test.txt"

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
            f"http://{HOST_IP}:{HOST_PORT}/receive_from_edge",
            files=files,
            timeout=30
        )
    return {
        "status": response.status_code,
        "response": response.text
    }
