#!/usr/bin/env python3
import os
import json
import paramiko
from scp import SCPClient

# ---------------------------------------------------------
# Configuration (MATCHES EDGE DAEMON PATHS)
# ---------------------------------------------------------
CONFIG = {
    "host": "ubuntu",
    "username": "nyra",
    "ssh_key": "/home/rahul/.ssh/id_ed25519",

    "remote_queue_dir": "/home/nyra/crfedge/queue",
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
# Generic SSH Exec
# ---------------------------------------------------------
def ssh_exec(cmd: str) -> str:
    ssh = ssh_connect()
    try:
        stdin, stdout, stderr = ssh.exec_command(cmd)
        out = stdout.read().decode().strip()
        err = stderr.read().decode().strip()
        if err:
            print(f"[SSH STDERR] {err}")
        return out
    finally:
        ssh.close()

# ---------------------------------------------------------
# Generic SCP Send
# ---------------------------------------------------------
def scp_send(local_path: str, remote_path: str):
    ssh = ssh_connect()
    try:
        remote_dir = remote_path.rsplit("/", 1)[0]
        ssh.exec_command(f"mkdir -p {remote_dir}")

        with SCPClient(ssh.get_transport()) as scp:
            scp.put(local_path, remote_path)
    finally:
        ssh.close()

# ---------------------------------------------------------
# Generic SCP Receive
# ---------------------------------------------------------
def scp_receive(remote_path: str, local_path: str):
    ssh = ssh_connect()
    try:
        local_dir = local_path.rsplit("/", 1)[0]
        os.makedirs(local_dir, exist_ok=True)

        with SCPClient(ssh.get_transport()) as scp:
            scp.get(remote_path, local_path)
    finally:
        ssh.close()

# ---------------------------------------------------------
# Send Job JSON to EDGE
# ---------------------------------------------------------
def send_job_file(local_job_file: str, job_id: str):
    remote_path = f"{CONFIG['remote_queue_dir']}/{job_id}.json"
    print(f"[INFO] Sending job file → {remote_path}")
    scp_send(local_job_file, remote_path)
    print("[INFO] Job file sent successfully")

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
    scp_receive(remote_json, local_json)

    print(f"[INFO] Pulling completed PDF → {remote_pdf}")
    scp_receive(remote_pdf, local_pdf)

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
