import React, { useState } from "react";
import Modal from "../components/Modal";

export default function ManagePage() {
  const [open, setOpen] = useState(false);
  return (
    <section style={{ display: "grid", gap: "1rem" }}>
      <h2 style={{ margin: 0 }}>Manage Files</h2>
      <p style={{ color: "#6b7280" }}>
        Placeholder for bulk actions, tagging, or processing workflows.
      </p>
      <div>
        <button className="btn primary" onClick={() => setOpen(true)}>
          Open Action Modal
        </button>
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="Bulk Action">
        <p>Coming soon. Connect your backend to enable management operations.</p>
      </Modal>
    </section>
  );
}
