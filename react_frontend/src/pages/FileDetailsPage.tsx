import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFileDetails } from "../api/client";
import { cardStyle } from "../theme";

export default function FileDetailsPage() {
  const { id = "" } = useParams();
  const [data, setData] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    getFileDetails(id)
      .then((d) => mounted && setData(d))
      .catch((e) => mounted && setErr(String(e?.message || e)))
      .finally(() => {});
    return () => {
      mounted = false;
    };
  }, [id]);

  if (err) return <div style={{ color: "var(--color-error)" }}>{err}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <section style={{ display: "grid", gap: "1rem" }}>
      <h2 style={{ margin: 0 }}>File Details</h2>
      <div style={{ ...cardStyle, padding: "1rem" }}>
        <div><strong>ID:</strong> {data.id}</div>
        <div><strong>Name:</strong> {data.name}</div>
        {data.size != null && <div><strong>Size:</strong> {data.size}</div>}
        {data.createdAt && <div><strong>Created:</strong> {new Date(data.createdAt).toLocaleString()}</div>}
        {data.status && <div><strong>Status:</strong> {data.status}</div>}
        {data.notes && <div><strong>Notes:</strong> {data.notes}</div>}
      </div>
    </section>
  );
}
