import React from "react";

export default function Header() {
  return (
    <div
      style={{
        height: 50,
        display: "flex",
        alignItems: "center",
        paddingLeft: 10,
        borderBottom: "1px solid #ddd",
        backgroundColor: "#fafafa",
      }}
    >
      <div
        style={{
          fontSize: "20px",
          fontWeight: "600",
          color: "#1976d2",
        }}
      >
        CRF Review
      </div>
    </div>
  );
}

