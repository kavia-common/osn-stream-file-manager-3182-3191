type HttpMethod = "GET" | "POST" | "DELETE";

const env = {
  apiBase:
    (import.meta.env.VITE_REACT_APP_API_BASE as string) ||
    (import.meta.env.REACT_APP_API_BASE as string) ||
    (import.meta.env.VITE_API_BASE as string) ||
    (import.meta.env.REACT_APP_BACKEND_URL as string) ||
    (typeof window !== "undefined" ? window.location.origin : ""),
  logLevel:
    (import.meta.env.VITE_REACT_APP_LOG_LEVEL as string) ||
    (import.meta.env.REACT_APP_LOG_LEVEL as string) ||
    "info",
};

function logWarnOnce(message: string) {
  if ((window as any).__api_warned) return;
  console.warn(message);
  (window as any).__api_warned = true;
}

async function http<T>(path: string, method: HttpMethod, body?: BodyInit): Promise<T> {
  const base = env.apiBase?.trim();
  const url = `${base}${path}`;

  if (!base || base === "" || base === window.location.origin) {
    logWarnOnce(
      "[client] No REACT_APP_API_BASE configured; using mocked data. Set REACT_APP_API_BASE in .env",
    );
  }

  try {
    const res = await fetch(url, {
      method,
      body,
      headers: body instanceof FormData ? {} : { "Content-Type": "application/json" },
      mode: "cors",
      credentials: "omit",
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`Request failed ${res.status}: ${text}`);
    }
    // try to parse json, fallback to empty as any
    try {
      return (await res.json()) as T;
    } catch {
      return {} as T;
    }
  } catch (err) {
    // On error (e.g., no backend), return mocked data for GETs
    if (env.logLevel !== "silent") {
      console.warn("[client] Falling back to mocked response:", err);
    }
    throw err;
  }
}

// PUBLIC_INTERFACE
export async function listFiles(): Promise<
  Array<{ id: string; name: string; size: number; createdAt: string; status?: string }>
> {
  const base = env.apiBase?.trim();
  if (!base || base === "" || base === window.location.origin) {
    // mocked data
    return Promise.resolve([
      { id: "demo-1", name: "sample1.ts", size: 1048576, createdAt: new Date().toISOString(), status: "ready" },
      { id: "demo-2", name: "sample2.ts", size: 2097152, createdAt: new Date().toISOString(), status: "processing" },
    ]);
  }
  return http("/api/files", "GET");
}

// PUBLIC_INTERFACE
export async function uploadFile(formData: FormData): Promise<{ id: string; name: string }> {
  const base = env.apiBase?.trim();
  if (!base || base === "" || base === window.location.origin) {
    // pretend upload worked
    return Promise.resolve({ id: `mock-${Date.now()}`, name: String(formData.get("file") || "file.ts") });
  }
  return http("/api/files", "POST", formData);
}

// PUBLIC_INTERFACE
export async function getFileDetails(
  id: string,
): Promise<{ id: string; name: string; size?: number; createdAt?: string; status?: string; notes?: string }> {
  const base = env.apiBase?.trim();
  if (!base || base === "" || base === window.location.origin) {
    return Promise.resolve({
      id,
      name: "mocked.ts",
      size: 1234567,
      createdAt: new Date().toISOString(),
      status: "ready",
      notes: "Mocked file details. Configure REACT_APP_API_BASE to fetch real data.",
    });
  }
  return http(`/api/files/${id}`, "GET");
}

// PUBLIC_INTERFACE
export async function deleteFile(id: string): Promise<{ ok: true }> {
  const base = env.apiBase?.trim();
  if (!base || base === "" || base === window.location.origin) {
    return Promise.resolve({ ok: true });
  }
  return http(`/api/files/${id}`, "DELETE");
}
