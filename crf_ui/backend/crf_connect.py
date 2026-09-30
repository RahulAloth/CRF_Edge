#!/usr/bin/env python3
import os
import json
import requests

# ---------------------------------------------------------
# Configuration
# ---------------------------------------------------------
CONFIG = {
    "edge_ip": "192.168.178.112",
    "port": 8000,
    "timeout": 10,  # seconds
}

BASE_URL = f"http://{CONFIG['edge_ip']}:{CONFIG['port']}"


# ---------------------------------------------------------
# Connection Test / Health Check
# ---------------------------------------------------------
def init_connection():
    """Verifies that the HTTP server on EDGE is reachable."""
    try:
        response = requests.get(f"{BASE_URL}/docs", timeout=CONFIG["timeout"])
        response.raise_for_status()
        print("[OK] HTTP API ready")
    except Exception as e:
        raise RuntimeError(f"Failed to connect to Edge API at {BASE_URL}: {e}")


# ---------------------------------------------------------
# Submit Job (Replaces send_pdf_file + send_job_metadata)
# ---------------------------------------------------------
def submit_job(local_pdf_path: str, job_id: str, extra_metadata: dict = None):
    """Sends both the PDF file and metadata in a single HTTP POST request."""
    if not os.path.exists(local_pdf_path):
        raise FileNotFoundError(f"Local PDF file not found: {local_pdf_path}")

    metadata = {
        "job_id": job_id,
        "status": "new"
    }
    if extra_metadata:
        metadata.update(extra_metadata)

    filename = os.path.basename(local_pdf_path)

    with open(local_pdf_path, "rb") as pdf_file:
        files = {
            "file": (filename, pdf_file, "application/pdf")
        }
        data = {
            "job_id": job_id,
            "metadata": json.dumps(metadata)
        }

        print(f"[INFO] Submitting job '{job_id}' with file '{filename}' → {BASE_URL}/submit_job")
        
        response = requests.post(
            f"{BASE_URL}/submit_job",
            files=files,
            data=data,
            timeout=30
        )

    response.raise_for_status()
    print(f"[INFO] Job '{job_id}' submitted successfully (Status: {response.status_code})")
    return response.json() if response.headers.get("content-type") == "application/json" else response.text


# ---------------------------------------------------------
# Backwards-Compatibility Wrappers (If existing code calls these)
# ---------------------------------------------------------
def send_pdf_file(local_pdf_file: str, job_id: str):
    """Wrapper to submit PDF if called separately in your pipeline."""
    return submit_job(local_pdf_path=local_pdf_file, job_id=job_id)


def send_job_metadata(job_id: str, filename: str):
    """Metadata is now handled during submit_job; kept for interface compatibility."""
    print(f"[INFO] Metadata for job '{job_id}' is included automatically during PDF submission.")


# ---------------------------------------------------------
# Pull Completed Results from EDGE
# ---------------------------------------------------------
def pull_completed(job_id: str, local_completed_dir: str):
    """Downloads completed JSON and PDF result files from the EDGE backend."""
    os.makedirs(local_completed_dir, exist_ok=True)

    endpoints = {
        f"{job_id}.json": os.path.join(local_completed_dir, f"{job_id}.json"),
        f"{job_id}.pdf": os.path.join(local_completed_dir, f"{job_id}.pdf"),
    }

    for remote_filename, local_file_path in endpoints.items():
        download_url = f"{BASE_URL}/download_completed/{remote_filename}"
        print(f"[INFO] Pulling completed file → {download_url}")

        response = requests.get(download_url, stream=True, timeout=30)
        response.raise_for_status()

        with open(local_file_path, "wb") as f:
            for chunk in response.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)

        print(f"[INFO] Saved: {local_file_path}")

    print("[INFO] Completed results pulled successfully")