import React, { useEffect, useState } from "react";
import FileTable, { FileRow } from "../components/FileTable";
import { deleteFile, listFiles } from "../api/client";

export default function ListPage() {
  const [rows, setRows] = useState<FileRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    listFiles()
      .then((data) => {
        if (mounted) setRows(data);
      })
      .catch(() => {
        if (mounted) setRows([]);
      })
      .finally(() => mounted && setLoading(false));
    return () => {
      mounted = false;
    };
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this file?")) return;
    await deleteFile(id).catch(() => {});
    setRows((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <section style={{ display: "grid", gap: "1rem" }}>
      <h2 style={{ margin: 0 }}>Uploaded Files</h2>
      {loading ? <div>Loading...</div> : <FileTable rows={rows} onDelete={handleDelete} />}
    </section>
  );
}
