import React from "react";
import UploadForm from "../components/UploadForm";
import { uploadFile } from "../api/client";

export default function UploadPage() {
  return (
    <section style={{ display: "grid", gap: "1rem" }}>
      <h2 style={{ margin: 0 }}>Upload TS Files</h2>
      <p style={{ color: "#6b7280", marginTop: "-.25rem" }}>
        Upload .ts files (MPEG-TS) for OSN set-top box streaming.
      </p>
      <UploadForm
        onSubmit={async (fd) => {
          const res = await uploadFile(fd);
          console.log("Uploaded:", res);
          alert(`Uploaded ${res.name}`);
        }}
      />
    </section>
  );
}
