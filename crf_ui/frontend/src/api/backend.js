const API_BASE = "http://127.0.0.1:8000/api";

export async function fetchCRF() {
  const response = await fetch(`${API_BASE}/crf`);
  return response.json();
}

export async function saveCRF(rowsWithoutId) {
  const response = await fetch(`${API_BASE}/crf/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rowsWithoutId), // ⭐ plain list
  });

  return response.json();
}

export async function uploadInputCRF(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE}/upload/input-crf`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload Input CRF");
  }

  return response.json();
}

