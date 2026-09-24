#!/usr/bin/env python3
import os
import json
import paramiko

# ---------------------------------------------------------
# Configuration (MATCHES EDGE DAEMON PATHS)
# ---------------------------------------------------------
CONFIG = {
    "host": "ubuntu",                     # Edge PC hostname
    "username": "nyra",                   # Edge PC user
    "ssh_key": "/home/rahul/.ssh/id_ed25519",   # Host → Edge private key

    "remote_pdf_dir": "/home/nyra/crfedge/incoming_pdfs",
    "remote_job_dir": "/home/nyra/crfedge/jobs",
    "remote_status_dir": "/home/nyra/crfedge/status",
    "remote_completed_dir": "/home/nyra/crfedge/completed",
}

# ---------------------------------------------------------
# SSH Connection
# ---------------------------------------------------------
def ssh_connect():
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())

    try:
        pkey = paramiko.Ed25519Key.from_private_key_file(CONFIG["ssh_key"])
    except Exception:
        pkey = paramiko.RSAKey.from_private_key_file(CONFIG["ssh_key"])

    ssh.connect(
        hostname=CONFIG["host"],
        username=CONFIG["username"],
        pkey=pkey,
        look_for_keys=False,
        allow_agent=False,
        timeout=10,
    )
    return ssh

# ---------------------------------------------------------
# Generic SFTP Send
# ---------------------------------------------------------
def sftp_send(local_path: str, remote_path: str):
    ssh = ssh_connect()
    sftp = ssh.open_sftp()

    remote_dir = remote_path.rsplit("/", 1)[0]
    try:
        ssh.exec_command(f"mkdir -p {remote_dir}")
    except:
        pass

    sftp.put(local_path, remote_path)
    sftp.close()
    ssh.close()

# ---------------------------------------------------------
# Generic SFTP Receive
# ---------------------------------------------------------
def sftp_receive(remote_path: str, local_path: str):
    ssh = ssh_connect()
    sftp = ssh.open_sftp()

    local_dir = local_path.rsplit("/", 1)[0]
    os.makedirs(local_dir, exist_ok=True)

    sftp.get(remote_path, local_path)
    sftp.close()
    ssh.close()

# ---------------------------------------------------------
# Send PDF File to EDGE
# ---------------------------------------------------------
def send_pdf_file(local_pdf_file: str, job_id: str):
    remote_path = f"{CONFIG['remote_pdf_dir']}/{job_id}.pdf"
    print(f"[INFO] Sending PDF → {remote_path}")
    sftp_send(local_pdf_file, remote_path)
    print("[INFO] PDF sent successfully")

# ---------------------------------------------------------
# Send Job Metadata to EDGE
# ---------------------------------------------------------
def send_job_metadata(job_id: str, filename: str):
    metadata = {
        "job_id": job_id,
        "filename": filename
    }

    local_tmp = f"/tmp/{job_id}.json"
    with open(local_tmp, "w") as f:
        json.dump(metadata, f)

    remote_path = f"{CONFIG['remote_job_dir']}/{job_id}.json"
    print(f"[INFO] Sending job metadata → {remote_path}")
    sftp_send(local_tmp, remote_path)
    print("[INFO] Job metadata sent successfully")

    os.remove(local_tmp)

# ---------------------------------------------------------
# Pull Completed Results from EDGE
# ---------------------------------------------------------
def pull_completed(job_id: str, local_completed_dir: str):
    os.makedirs(local_completed_dir, exist_ok=True)

    remote_json = f"{CONFIG['remote_completed_dir']}/{job_id}.json"
    remote_pdf = f"{CONFIG['remote_completed_dir']}/{job_id}.pdf"

    local_json = os.path.join(local_completed_dir, f"{job_id}.json")
    local_pdf = os.path.join(local_completed_dir, f"{job_id}.pdf")

    print(f"[INFO] Pulling completed JSON → {remote_json}")
    sftp_receive(remote_json, local_json)

    print(f"[INFO] Pulling completed PDF → {remote_pdf}")
    sftp_receive(remote_pdf, local_pdf)

    print("[INFO] Completed results pulled successfully")

# ---------------------------------------------------------
# Connection Test
# ---------------------------------------------------------
def init_connection():
    try:
        ssh = ssh_connect()
        ssh.close()
    except Exception as e:
        raise Exception(f"SSH connection failed: {e}")

    print("[OK] SSH ready")
