import React, { useState, FormEvent } from "react";

export default function UploadForm({ onSubmit }: { onSubmit: (fd: FormData) => Promise<void> }) {
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!file) {
      setError("Please choose a .ts file to upload.");
      return;
    }
    if (!file.name.toLowerCase().endsWith(".ts")) {
      setError("Only .ts files are supported.");
      return;
    }
    setBusy(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      await onSubmit(fd);
      setFile(null);
    } catch (err: any) {
      setError(err?.message || "Upload failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: ".75rem" }}>
      <div>
        <input
          type="file"
          accept=".ts,video/mp2t"
          onChange={(e) => setFile(e.target.files?.[0] ?? null)}
        />
      </div>
      {error && <div style={{ color: "var(--color-error)" }}>{error}</div>}
      <div>
        <button className="btn primary" disabled={busy} type="submit">
          {busy ? "Uploading..." : "Upload .ts"}
        </button>
      </div>
    </form>
  );
}
