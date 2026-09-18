#!/usr/bin/env python3
import os
import time
import json
import shutil

QUEUE_DIR = "/home/rahul/crf_daemon/queue"
STATUS_DIR = "/home/rahul/crf_daemon/status"
OUTPUT_DIR = "/home/rahul/crf_daemon/output"
ERROR_DIR = "/home/rahul/crf_daemon/error"
COMPLETED_DIR = "/home/rahul/crf_daemon/completed"

os.makedirs(QUEUE_DIR, exist_ok=True)
os.makedirs(STATUS_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(ERROR_DIR, exist_ok=True)
os.makedirs(COMPLETED_DIR, exist_ok=True)

def write_status(job_id, msg):
    with open(f"{STATUS_DIR}/{job_id}.status", "w") as f:
        f.write(msg)

def write_error(job_id, error_id, msg):
    with open(f"{ERROR_DIR}/{job_id}.error", "w") as f:
        f.write(f"{error_id}: {msg}")

def check_scp_success(job):
    pdf_path = job["input_pdf"]
    return os.path.exists(pdf_path) and os.path.getsize(pdf_path) > 0

def split_pdf(job_id):
    time.sleep(1)
    return True

def run_inference(job_id):
    time.sleep(1)
    return True

def run_faiss(job_id):
    time.sleep(1)
    return True

def generate_crf_json(job_id):
    output_path = f"{OUTPUT_DIR}/{job_id}.json"
    data = {
        "job_id": job_id,
        "confidence": 0.98,
        "sequence": "CRF Sequencing Done"
    }
    with open(output_path, "w") as f:
        json.dump(data, f)
    return True

def stitch_pdf(job_id):
    time.sleep(1)
    return True

def process_job(job_file):
    job_path = os.path.join(QUEUE_DIR, job_file)
    with open(job_path, "r") as f:
        job = json.load(f)

    job_id = job["job_id"]

    write_status(job_id, "Job_Start_Received")

    if not check_scp_success(job):
        write_error(job_id, "ERR_SCP_001", "SCP data missing or corrupted")
        write_status(job_id, "Error_SCP_Failed")
        return

    write_status(job_id, "Job_Split_as_Images")
    if not split_pdf(job_id):
        write_error(job_id, "ERR_SPLIT_002", "PDF split failed")
        return

    write_status(job_id, "Inference_Start")
    if not run_inference(job_id):
        write_error(job_id, "ERR_INF_003", "Inference failed")
        return

    write_status(job_id, "FAISS_Correction")
    if not run_faiss(job_id):
        write_error(job_id, "ERR_FAISS_004", "FAISS correction failed")
        return

    write_status(job_id, "CRF_JSON_Generation")
    generate_crf_json(job_id)

    write_status(job_id, "Stitching_PDF")
    stitch_pdf(job_id)

    write_status(job_id, "CRF_Successful")

    shutil.move(job_path, os.path.join(COMPLETED_DIR, job_file))

def daemon_loop():
    print("CRF-Edge Daemon Running...")
    while True:
        jobs = sorted(os.listdir(QUEUE_DIR))
        if jobs:
            process_job(jobs[0])
        time.sleep(0.5)

if __name__ == "__main__":
    daemon_loop()
