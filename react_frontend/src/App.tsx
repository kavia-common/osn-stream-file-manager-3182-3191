import React from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

export default function App() {
  const location = useLocation();
  return (
    <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", minHeight: "100vh" }}>
      <aside style={{ padding: "1rem", borderRight: "1px solid rgba(0,0,0,.06)" }}>
        <div style={{ marginBottom: "1rem", fontWeight: 700, fontSize: "1.1rem" }}>
          <span className="badge">Ocean Professional</span>
        </div>
        <Sidebar currentPath={location.pathname} />
      </aside>
      <main style={{ display: "grid", gridTemplateRows: "auto 1fr" }}>
        <Header />
        <div style={{ padding: "1rem" }}>
          <div className="app-surface" style={{ padding: "1rem" }}>
            <Outlet />
          </div>
          <div style={{ marginTop: "1rem", fontSize: ".85rem", color: "#6b7280" }}>
            Need a backend? Set <code>REACT_APP_API_BASE</code> in <code>.env</code>.{" "}
            <Link to="/list_uploaded_files">View files</Link>
          </div>
        </div>
      </main>
    </div>
  );
}
