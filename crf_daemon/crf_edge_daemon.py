import json
import os
import sys
import threading
import time
from watchdog.events import FileSystemEventHandler
from watchdog.observers import Observer

DAEMON_WORK_DIR = os.path.expanduser("~/crf_job_daemon")

JOB_INPUT_DIR = os.path.join(DAEMON_WORK_DIR, "crf_input")
COMPLETED_DIR = os.path.join(DAEMON_WORK_DIR, "completed")
JOB_STATUS_DIR = os.path.join(DAEMON_WORK_DIR, "crf_status")

# Thread safety tracking to avoid duplicate execution on watchdog events
ACTIVE_JOBS = set()
ACTIVE_JOBS_LOCK = threading.Lock()


def drive_jobs(job_id):
    """Listens on a dedicated FIFO pipe for job status updates until completion or error."""
    FIFO_PATH = os.path.join(JOB_STATUS_DIR, f"{job_id}_fifo")

    if not os.path.exists(FIFO_PATH):
        try:
            os.mkfifo(FIFO_PATH)
        except OSError as e:
            print(f"[Reader][Job {job_id}] Failed to create FIFO: {e}")
            return

    print(f"[Reader][Job {job_id}] Listening on pipe: {FIFO_PATH}")

    try:
        while True:
            # Opening blocks until a writer opens the pipe
            with open(FIFO_PATH, "r") as fifo:
                for line in fifo:
                    data = line.strip()
                    if data:
                        print(f"[Reader][Job {job_id}] Received status: {data}")

                    if data == "completed":
                        print(
                            f"[Reader][Job {job_id}] Completed signal received. Stopping listener."
                        )
                        return
                    if data == "error":
                        print(
                            f"[Reader][Job {job_id}] Error signal received. Stopping listener."
                        )
                        return
    finally:
        # Clean up FIFO pipe from filesystem when finished
        if os.path.exists(FIFO_PATH):
            try:
                os.remove(FIFO_PATH)
                print(f"[Reader][Job {job_id}] Removed FIFO pipe from disk.")
            except OSError as e:
                print(
                    f"[Reader][Job {job_id}] Failed removing FIFO {FIFO_PATH}: {e}"
                )


def process_job(job_data):
    """Process a CRF job in its own execution context."""
    job_id = job_data.get("job_id")
    input_crf_path = job_data.get("input_crf_path")
    job_status = job_data.get("job_status")

    print(f"[Daemon] Processing Job: {job_id}")
    print(f"[Daemon] Input CRF Path: {input_crf_path}")
    print(f"[Daemon] Current Status: {job_status}")

    try:
        # 1. Read CRF PDF from input_crf_path
        # 2. Split PDF into page images
        # 3. Run CRF inference
        # 4. Run FAISS search
        # 5. Send results to HOST PC
        time.sleep(2)

        # Blocks ONLY this worker thread until job signals 'completed' or 'error'
        drive_jobs(job_id)

        completed_file_path = os.path.join(COMPLETED_DIR, f"{job_id}.txt")

        with open(completed_file_path, "w") as f:
            f.write(
                f"Job {job_id} successfully processed.\n"
                f"Input CRF: {input_crf_path}\n"
            )

        print(
            f"[Daemon] Job {job_id}: Completed output created at {completed_file_path}"
        )

    except Exception as e:
        print(f"[Daemon] Failed to process job {job_id}: {e}")


def dispatch_job(job_data):
    """Spawns a background thread for a job to prevent blocking main daemon loops."""
    job_id = job_data.get("job_id")

    with ACTIVE_JOBS_LOCK:
        if job_id in ACTIVE_JOBS:
            return  # Already being processed by another thread
        ACTIVE_JOBS.add(job_id)

    def _worker():
        try:
            process_job(job_data)
        finally:
            with ACTIVE_JOBS_LOCK:
                ACTIVE_JOBS.discard(job_id)

    thread = threading.Thread(
        target=_worker, name=f"JobWorker-{job_id}", daemon=True
    )
    thread.start()


class JobInputHandler(FileSystemEventHandler):
    """Detects new JSON job files arriving in JOB_INPUT_DIR."""

    def _handle_event(self, src_path):
        if not src_path.endswith(".json"):
            return

        time.sleep(0.5)  # Brief delay to allow writer to flush contents

        try:
            with open(src_path, "r") as f:
                job_data = json.load(f)

            job_id = job_data.get("job_id")
            job_status = job_data.get("job_status")

            if not job_id:
                print(f"[Daemon] Invalid job file (missing job_id): {src_path}")
                return

            if job_status == "created":
                dispatch_job(job_data)

        except json.JSONDecodeError:
            pass  # File may still be writing
        except FileNotFoundError:
            pass
        except Exception as e:
            print(f"[Daemon] Error processing {src_path}: {e}")

    def on_created(self, event):
        if not event.is_directory:
            self._handle_event(event.src_path)

    def on_modified(self, event):
        if not event.is_directory:
            self._handle_event(event.src_path)


def drain_existing_jobs():
    """Process any jobs that arrived while daemon was offline."""
    print("[Daemon] Checking for queued jobs...")
    if not os.path.exists(JOB_INPUT_DIR):
        return

    for filename in os.listdir(JOB_INPUT_DIR):
        if not filename.endswith(".json"):
            continue

        json_file = os.path.join(JOB_INPUT_DIR, filename)
        try:
            with open(json_file, "r") as f:
                job_data = json.load(f)

            if job_data.get("job_status") == "created":
                dispatch_job(job_data)

        except Exception as e:
            print(f"[Daemon] Failed reading {json_file}: {e}")


def run_daemon():
    print("[crf_daemon] Starting CRF daemon...")

    # Non-blocking startup drain
    drain_existing_jobs()

    event_handler = JobInputHandler()
    observer = Observer()
    observer.schedule(event_handler, path=JOB_INPUT_DIR, recursive=False)
    observer.start()

    print(f"[crf_daemon] Monitoring '{JOB_INPUT_DIR}' for job JSON files.")

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\n[crf_daemon] Stopping observer...")
        observer.stop()

    observer.join()
    print("[crf_daemon] Daemon shut down cleanly.")


if __name__ == "__main__":
    os.makedirs(JOB_INPUT_DIR, exist_ok=True)
    os.makedirs(COMPLETED_DIR, exist_ok=True)
    os.makedirs(JOB_STATUS_DIR, exist_ok=True)

    run_daemon()