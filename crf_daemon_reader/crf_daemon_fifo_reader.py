import glob
import os
import threading
import time

DAEMON_WORK_DIR = os.path.expanduser("~/crf_job_daemon")
JOB_STATUS_DIR = os.path.join(DAEMON_WORK_DIR, "crf_status")

ACTIVE_FIFOS = set()


def handle_job_fifo(fifo_path):
    """Connects to the FIFO pipe and writes progressive status updates."""
    job_id = os.path.basename(fifo_path).replace("_fifo", "")
    print(f"[Worker Sim][Job {job_id}] Connected to FIFO: {fifo_path}")

    # Simulated status updates
    workflow_steps = [
        "started",
        "splitting_pdf_pages",
        "running_crf_inference",
        "faiss_search_complete",
        "completed",  # Terminal status signal
    ]

    try:
        # Opening FIFO in 'w' mode unblocks the daemon thread's 'r' open call
        with open(fifo_path, "w") as fifo:
            for step in workflow_steps:
                time.sleep(1.5)  # Simulate processing time for each step
                print(f"[Worker Sim][Job {job_id}] Writing status -> '{step}'")

                fifo.write(f"{step}\n")
                fifo.flush()  # Ensure data is flushed to the pipe immediately

    except Exception as e:
        print(f"[Worker Sim][Job {job_id}] FIFO write error: {e}")
    finally:
        ACTIVE_FIFOS.discard(fifo_path)


def watch_and_drive_fifos():
    """Monitors JOB_STATUS_DIR for new FIFO pipes created by the daemon."""
    print(
        f"[Worker Sim] Monitoring '{JOB_STATUS_DIR}' for active job FIFOs..."
    )

    try:
        while True:
            fifo_files = glob.glob(os.path.join(JOB_STATUS_DIR, "*_fifo"))

            for fifo_path in fifo_files:
                if fifo_path not in ACTIVE_FIFOS:
                    ACTIVE_FIFOS.add(fifo_path)

                    # Handle each FIFO in a separate thread so multiple jobs can run concurrently
                    t = threading.Thread(
                        target=handle_job_fifo, args=(fifo_path,), daemon=True
                    )
                    t.start()

            time.sleep(0.5)

    except KeyboardInterrupt:
        print("\n[Worker Sim] Stopping worker simulator...")


if __name__ == "__main__":
    os.makedirs(JOB_STATUS_DIR, exist_ok=True)
    watch_and_drive_fifos()