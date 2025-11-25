import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const PORT = Number(process.env.REACT_APP_PORT || process.env.PORT || 3000);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: PORT,
    strictPort: true,
  },
  preview: {
    host: "0.0.0.0",
    port: PORT,
    strictPort: true,
  }
});
