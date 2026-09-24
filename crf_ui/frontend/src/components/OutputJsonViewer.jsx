import React, { useEffect, useState } from "react";

export default function OutputJsonViewer({ jobId }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!jobId) return;

    fetch(`http://127.0.0.1:8000/api/job/output/${jobId}`)
      .then((res) => res.json())
      .then(setData)
      .catch(() => setData(null));
  }, [jobId]);

  if (!jobId) return null;
  if (!data) return <div>Loading output JSON…</div>;

  return (
    <pre style={{
      background: "#f4f4f4",
      padding: "10px",
      borderRadius: "6px",
      height: "100%",
      overflow: "auto"
    }}>
      {JSON.stringify(data, null, 2)}
    </pre>
  );
}

