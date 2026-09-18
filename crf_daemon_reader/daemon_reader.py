#!/usr/bin/env python3
import os
import time

STATUS_DIR = "/home/rahul/crf_daemon/status"

def read_status(job_id):
    status_file = f"{STATUS_DIR}/{job_id}.status"
    if not os.path.exists(status_file):
        return None

    try:
        with open(status_file, "r") as f:
            return f.read().strip()
    except:
        return None

def reader_loop():
    print("CRF-Edge Reader Daemon Running...")

    last_status = {}

    while True:
        # Scan all status files
        for filename in os.listdir(STATUS_DIR):
            if filename.endswith(".status"):
                job_id = filename.replace(".status", "")
                status = read_status(job_id)

                # Only print when status changes
                if status and last_status.get(job_id) != status:
                    print(f"[{job_id}] STATUS: {status}")
                    last_status[job_id] = status

        time.sleep(0.5)

if __name__ == "__main__":
    reader_loop()
