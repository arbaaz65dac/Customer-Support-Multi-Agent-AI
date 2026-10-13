const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

async function request(path, options = {}) {
  if (!API_BASE_URL) {
    throw new Error("VITE_API_BASE_URL is not configured.");
  }

  const { headers, ...rest } = options;
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(
      `API request failed (${response.status} ${response.statusText || "Error"}).`,
    );
  }

  return response.json();
}

export function getHealth({ signal } = {}) {
  return request("/health", { method: "GET", signal });
}
