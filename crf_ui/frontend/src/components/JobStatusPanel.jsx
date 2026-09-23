import React from "react";
import { Card, CardContent, Typography, LinearProgress } from "@mui/material";

export default function JobStatusPanel({ jobId, jobStatus, jobMessage }) {
  if (!jobId) return null;

  const isProcessing =
    jobStatus === "processing" ||
    jobStatus === "queued" ||
    jobStatus === "created";

  const isCompleted = jobStatus === "completed";
  const isError = jobStatus === "error";

  const statusColor = isCompleted
    ? "#2e7d32" // green
    : isError
    ? "#d32f2f" // red
    : "#0A3D91"; // blue

  return (
    <Card
      sx={{
        marginTop: 2,
        background: "#f8f9fc",
        borderLeft: `6px solid ${statusColor}`,
        boxShadow: "0px 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          sx={{ fontWeight: 700, color: statusColor, marginBottom: 1 }}
        >
          Job Status
        </Typography>

        <Typography sx={{ marginTop: 1 }}>
          <strong>Job ID:</strong> {jobId}
        </Typography>

        <Typography sx={{ marginTop: 1 }}>
          <strong>Status:</strong> {jobStatus}
        </Typography>

        <Typography sx={{ marginTop: 1 }}>
          <strong>Message:</strong> {jobMessage}
        </Typography>

        {isProcessing && (
          <LinearProgress
            sx={{
              marginTop: 2,
              height: 8,
              borderRadius: 5,
            }}
          />
        )}

        {isCompleted && (
          <Typography
            sx={{
              marginTop: 2,
              fontWeight: 600,
              color: "#2e7d32",
            }}
          >
            ✔ Job completed successfully
          </Typography>
        )}

        {isError && (
          <Typography
            sx={{
              marginTop: 2,
              fontWeight: 600,
              color: "#d32f2f",
            }}
          >
            ⚠ Error occurred while processing job
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
