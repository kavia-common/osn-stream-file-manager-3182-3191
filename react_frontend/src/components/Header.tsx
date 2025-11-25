import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();
  const titleMap: Record<string, string> = {
    "/": "Upload TS Files",
    "/upload_ts_files": "Upload TS Files",
    "/list_uploaded_files": "Uploaded Files",
    "/manage_files": "Manage Files",
  };
  const title =
    titleMap[pathname] ||
    (pathname.startsWith("/view_file_details") ? "File Details" : "OSN Stream File Manager");

  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
        background: "linear-gradient(135deg, rgba(37,99,235,.08), rgba(243,244,246,1))",
        borderBottom: "1px solid rgba(0,0,0,.06)",
      }}
    >
      <div style={{ fontWeight: 800, color: "var(--color-primary)" }}>{title}</div>
      <div style={{ marginLeft: "auto", display: "flex", gap: ".5rem" }}>
        <Link className="btn" to="/list_uploaded_files">Files</Link>
        <Link className="btn primary" to="/upload_ts_files">Upload</Link>
      </div>
    </header>
  );
}
