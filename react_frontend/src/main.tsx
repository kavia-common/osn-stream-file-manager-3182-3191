import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import UploadPage from "./pages/UploadPage";
import ListPage from "./pages/ListPage";
import ManagePage from "./pages/ManagePage";
import FileDetailsPage from "./pages/FileDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <UploadPage /> },
      { path: "upload_ts_files", element: <UploadPage /> },
      { path: "list_uploaded_files", element: <ListPage /> },
      { path: "manage_files", element: <ManagePage /> },
      { path: "view_file_details/:id", element: <FileDetailsPage /> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
