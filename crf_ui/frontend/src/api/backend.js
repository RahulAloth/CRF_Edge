// src/api/backend.js

const BASE_URL = "http://localhost:8000";

// ---------------------------------------------------------
// Upload Input CRF PDF
// ---------------------------------------------------------
export async function uploadInputCRF(file) {
  const fd = new FormData();
  fd.append("file", file);

  const res = await fetch(`${BASE_URL}/api/upload/input-crf`, {
    method: "POST",
    body: fd,
  });

  if (!res.ok) {
    throw new Error("Failed to upload Input CRF");
  }

  return await res.json(); // { message, filename, saved_to }
}

// ---------------------------------------------------------
// Create Job
// ---------------------------------------------------------
export async function createJob(filename) {
  const res = await fetch(`${BASE_URL}/api/job/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ filename }),
  });

  if (!res.ok) {
    throw new Error("Failed to create job");
  }

  return await res.json(); // { job_id, status, message }
}

// ---------------------------------------------------------
// Poll Job Status
// ---------------------------------------------------------
export async function getJobStatus(jobId) {
  const res = await fetch(`${BASE_URL}/api/job/status/${jobId}`);

  if (!res.ok) {
    throw new Error("Failed to get job status");
  }

  return await res.json(); // { job_id, status, message }
}
