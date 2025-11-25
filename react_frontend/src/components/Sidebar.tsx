import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ currentPath }: { currentPath: string }) {
  const items = [
    { to: "/upload_ts_files", label: "Upload TS Files" },
    { to: "/list_uploaded_files", label: "Uploaded Files" },
    { to: "/manage_files", label: "Manage Files" },
  ];

  return (
    <nav style={{ display: "grid", gap: ".25rem" }}>
      {items.map((it) => {
        const active = currentPath === it.to || (it.to === "/upload_ts_files" && currentPath === "/");
        return (
          <Link key={it.to} to={it.to} className={`sidebar-link${active ? " active" : ""}`}>
            <span style={{ width: 8, height: 8, borderRadius: 9999, background: active ? "var(--color-primary)" : "rgba(0,0,0,.15)" }} />
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}
