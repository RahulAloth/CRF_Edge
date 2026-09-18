#!/usr/bin/env python3
import os
import time
import json
import shutil

QUEUE_DIR = "/home/rahul/crf_daemon/queue"
STATUS_DIR = "/home/rahul/crf_daemon/status"
COMPLETED_DIR = "/home/rahul/crf_daemon/completed"

os.makedirs(QUEUE_DIR, exist_ok=True)
os.makedirs(STATUS_DIR, exist_ok=True)
os.makedirs(COMPLETED_DIR, exist_ok=True)

def write_status(job_id, msg):
    with open(f"{STATUS_DIR}/{job_id}.status", "w") as f:
        f.write(msg)

def process_job(job_file):
    job_path = os.path.join(QUEUE_DIR, job_file)
    with open(job_path, "r") as f:
        job = json.load(f)

    job_id = job["job_id"]

    # Status simulation only
    write_status(job_id, "Job_Start_Received")
    time.sleep(1)

    write_status(job_id, "Job_Split_as_Images")
    time.sleep(1)

    write_status(job_id, "Inference_Start")
    time.sleep(1)

    write_status(job_id, "FAISS_Correction")
    time.sleep(1)

    write_status(job_id, "CRF_JSON_Generation")
    time.sleep(1)

    write_status(job_id, "Stitching_PDF")
    time.sleep(1)

    write_status(job_id, "CRF_Successful")
    time.sleep(1)

    shutil.move(job_path, os.path.join(COMPLETED_DIR, job_file))

def daemon_loop():
    print("CRF-Edge Test Daemon Running (Status Simulator)...")

    while True:
        jobs = sorted(os.listdir(QUEUE_DIR))
        if jobs:
            process_job(jobs[0])
        time.sleep(0.5)

#!/usr/bin/env python3
import json
import random
import os

if __name__ == "__main__":


    QUEUE_DIR = "/home/rahul/crf_daemon/queue"

    job_id = f"job_{random.randint(10000,99999)}"
    job_file = f"{QUEUE_DIR}/{job_id}.json"

    with open(job_file, "w") as f:
        json.dump({"job_id": job_id}, f)

    print(f"Created job: {job_file}")

    daemon_loop()
