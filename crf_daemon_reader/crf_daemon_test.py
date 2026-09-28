import json
import os
import time

DAEMON_WORK_DIR = os.path.expanduser("~/crf_job_daemon")
JOB_INPUT_DIR = os.path.join(DAEMON_WORK_DIR, "crf_input")


def submit_job(job_id):
    job_data = {
        "job_id": job_id,
        "input_crf_path": f"/home/rahul/Aswani/bewerbung/Ashokan_Zeugnis_30.04.2026.pdf",
        "job_status": "created",
    }

    # Write to a temporary file first, then rename (atomic creation)
    tmp_file = os.path.join(JOB_INPUT_DIR, f"{job_id}.tmp")
    json_file = os.path.join(JOB_INPUT_DIR, f"{job_id}.json")

    with open(tmp_file, "w") as f:
        json.dump(job_data, f, indent=2)

    os.rename(tmp_file, json_file)
    print(f"[Submitter] Queued new job file: {json_file}")


def main():
    os.makedirs(JOB_INPUT_DIR, exist_ok=True)
    print("[Submitter] Starting job queue simulator...")

    
    # Submit 3 test jobs with a time delay between them
    # for i in range(1, 4):
    #    job_id = f"CRF_JOB_10{i}"
    #    submit_job(job_id)

        # Simulate delay before next job arrives
    #    time.sleep(3)

    submit_job("CRF_JOB_101")
    print("[Submitter] All test jobs submitted.")


if __name__ == "__main__":
    main()