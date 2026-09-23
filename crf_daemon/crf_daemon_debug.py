import os
import time
import json
import paramiko

# ---------------------------------------------------------
# DIRECTORIES (EDGE)
# ---------------------------------------------------------
QUEUE_DIR = "/home/nyra/crfedge/queue"
STATUS_DIR = "/home/nyra/crfedge/status"
COMPLETED_DIR = "/home/nyra/crfedge/completed"

# ---------------------------------------------------------
# DIRECTORIES (HOST)
# ---------------------------------------------------------
HOST_STATUS_DIR = "/home/rahul/GIT/CRF_Edge/crf_ui/backend/input_crf/crf_daemon/status"
HOST_COMPLETED_DIR = "/home/rahul/GIT/CRF_Edge/crf_ui/backend/input_crf/crf_daemon/completed"

# ---------------------------------------------------------
# HOST CONNECTION
# ---------------------------------------------------------
HOST_IP = "rishu"
HOST_USER = "rahul"
HOST_KEY = "/home/nyra/.ssh/id_ed25519_edge"



# ---------------------------------------------------------
# ENSURE DIRECTORIES EXIST
# ---------------------------------------------------------
def ensure_dirs():
    print("[TRACE] Ensuring directories exist...")
    os.makedirs(QUEUE_DIR, exist_ok=True)
    os.makedirs(STATUS_DIR, exist_ok=True)
    os.makedirs(COMPLETED_DIR, exist_ok=True)
    print("[TRACE] Directories ready.")

# ---------------------------------------------------------
# SSH CONNECTION TO HOST
# ---------------------------------------------------------
def ssh_connect():
    print(f"[TRACE] Connecting to HOST {HOST_IP} as {HOST_USER}...")
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    ssh.connect(HOST_IP, username=HOST_USER, key_filename=HOST_KEY)
    print("[TRACE] SSH connection established.")
    return ssh

# ---------------------------------------------------------
# SEND FILE TO HOST USING SFTP
# ---------------------------------------------------------
def send_to_host(local_path, remote_dir):
    print(f"[TRACE] Preparing to send file to HOST: {local_path}")
    ssh = ssh_connect()
    sftp = ssh.open_sftp()

    filename = os.path.basename(local_path)
    remote_path = os.path.join(remote_dir, filename)

    print(f"[TRACE] Uploading to HOST: {remote_path}")
    sftp.put(local_path, remote_path)

    sftp.close()
    ssh.close()
    print("[TRACE] File upload completed.")

# ---------------------------------------------------------
# WRITE STATUS LOCALLY + SEND TO HOST
# ---------------------------------------------------------
def write_status(job_id, status, message):
    status_file = os.path.join(STATUS_DIR, f"{job_id}.json")

    print(f"[TRACE] Writing status locally: {status_file}")
    with open(status_file, "w") as f:
        json.dump({"job_id": job_id, "status": status, "message": message}, f)

    print(f"[TRACE] Sending status to HOST: {HOST_STATUS_DIR}")
    send_to_host(status_file, HOST_STATUS_DIR)

# ---------------------------------------------------------
# PROCESS A SINGLE JOB
# ---------------------------------------------------------
def process_job(job_file):
    try:
        print(f"[TRACE] Reading job file: {job_file}")
        with open(job_file, "r") as f:
            job = json.load(f)

        job_id = job["job_id"]
        filename = job["filename"]

        print(f"[EDGE] Received job: {job_id} ({filename})")

        # Step 1: queued
        write_status(job_id, "queued", "Job received by Edge")
        time.sleep(2)

        # Step 2: processing
        write_status(job_id, "processing", "Edge is processing the job")
        time.sleep(5)

        # Step 3: completed
        write_status(job_id, "completed", "Job completed successfully")

        # Move job file to completed
        completed_file = os.path.join(COMPLETED_DIR, os.path.basename(job_file))
        print(f"[TRACE] Moving job file to completed: {completed_file}")
        os.rename(job_file, completed_file)

        # Send completed file to HOST
        print(f"[TRACE] Sending completed file to HOST: {HOST_COMPLETED_DIR}")
        send_to_host(completed_file, HOST_COMPLETED_DIR)

        print(f"[EDGE] Job completed and sent to HOST: {job_id}")

    except Exception as e:
        print(f"[EDGE] ERROR processing job: {e}")
        write_status(job_id, "error", f"Edge error: {e}")

# ---------------------------------------------------------
# MAIN QUEUE WATCHER
# ---------------------------------------------------------
def watch_queue():
    print("[EDGE] Daemon started. Watching queue...")
    ensure_dirs()

    while True:
        jobs = [f for f in os.listdir(QUEUE_DIR) if f.endswith(".json")]

        if jobs:
            print(f"[TRACE] Found {len(jobs)} job(s) in queue.")

        for job_file in jobs:
            full_path = os.path.join(QUEUE_DIR, job_file)
            process_job(full_path)

        time.sleep(1)

# ---------------------------------------------------------
# ENTRY POINT
# ---------------------------------------------------------
if __name__ == "__main__":
    watch_queue()

