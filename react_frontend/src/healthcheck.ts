export function getHealthcheckPath() {
  const path =
    (import.meta.env.VITE_REACT_APP_HEALTHCHECK_PATH as string) ||
    (import.meta.env.REACT_APP_HEALTHCHECK_PATH as string) ||
    "/health";
  return path;
}
