import React from "react";
import { Link } from "react-router-dom";

export type FileRow = {
  id: string;
  name: string;
  size: number;
  createdAt: string;
  status?: string;
};

function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  const kb = n / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  if (mb < 1024) return `${mb.toFixed(1)} MB`;
  const gb = mb / 1024;
  return `${gb.toFixed(1)} GB`;
}

export default function FileTable({
  rows,
  onDelete,
}: {
  rows: FileRow[];
  onDelete?: (id: string) => void;
}) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0 }}>
        <thead>
          <tr style={{ textAlign: "left", color: "#6b7280" }}>
            <th style={{ padding: ".75rem" }}>Name</th>
            <th style={{ padding: ".75rem" }}>Size</th>
            <th style={{ padding: ".75rem" }}>Created</th>
            <th style={{ padding: ".75rem" }}>Status</th>
            <th style={{ padding: ".75rem", textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ padding: "1rem", color: "#6b7280" }}>
                No files found. Try uploading a .ts file.
              </td>
            </tr>
          ) : (
            rows.map((r, i) => (
              <tr key={r.id} style={{ background: i % 2 ? "transparent" : "rgba(0,0,0,.015)" }}>
                <td style={{ padding: ".75rem" }}>{r.name}</td>
                <td style={{ padding: ".75rem" }}>{formatBytes(r.size)}</td>
                <td style={{ padding: ".75rem" }}>{new Date(r.createdAt).toLocaleString()}</td>
                <td style={{ padding: ".75rem" }}>
                  <span className="badge" style={{ background: r.status === "processing" ? "rgba(245,158,11,.12)" : "rgba(37,99,235,.08)", color: r.status === "processing" ? "#b45309" : "var(--color-primary)" }}>
                    {r.status ?? "unknown"}
                  </span>
                </td>
                <td style={{ padding: ".75rem", textAlign: "right", display: "flex", gap: ".5rem", justifyContent: "flex-end" }}>
                  <Link className="btn" to={`/view_file_details/${r.id}`}>Details</Link>
                  <button className="btn" onClick={() => onDelete?.(r.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
