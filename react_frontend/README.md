# OSN Stream File Manager - React Frontend

This is a Vite + React + TypeScript app that provides a dashboard to upload and manage `.ts` files.

## Quick start

- Ensure Node.js 18+ is available.
- Install dependencies:

```bash
npm install
```

- Start the dev server (the preview system runs `npm start`):

```bash
npm start
```

It binds to `0.0.0.0:3000` by default (configurable via `REACT_APP_PORT`).

## Environment variables

Copy `.env.example` to `.env` and adjust as needed.

Important keys:
- `REACT_APP_API_BASE` (preferred)
- `REACT_APP_BACKEND_URL` (fallback)
- If neither is set, the app falls back to `window.location.origin` and uses mocked data.

Other optional keys:
`REACT_APP_FRONTEND_URL`, `REACT_APP_WS_URL`, `REACT_APP_NODE_ENV`, `REACT_APP_NEXT_TELEMETRY_DISABLED`, `REACT_APP_ENABLE_SOURCE_MAPS`, `REACT_APP_PORT`, `REACT_APP_TRUST_PROXY`, `REACT_APP_LOG_LEVEL`, `REACT_APP_HEALTHCHECK_PATH`, `REACT_APP_FEATURE_FLAGS`, `REACT_APP_EXPERIMENTS_ENABLED`.

## Pages / Routes

- Upload TS Files
- List Uploaded Files
- Manage Files
- View File Details

These currently use mocked data if the API is not reachable. Configure `REACT_APP_API_BASE` to integrate with the backend and update API paths in `src/api/client.ts`.
