import React from "react";

export default function Modal({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.35)",
        display: "grid",
        placeItems: "center",
        padding: "1rem",
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        className="app-surface"
        onClick={(e) => e.stopPropagation()}
        style={{ width: "min(560px, 96vw)", padding: "1rem" }}
      >
        <div style={{ fontWeight: 700, marginBottom: ".5rem" }}>{title}</div>
        <div>{children}</div>
        <div style={{ marginTop: "1rem", textAlign: "right" }}>
          <button className="btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
