// Base URL comes from .env (VITE_API_URL). Falls back to the local dev
// server so this works out of the box with `npm run dev` on the backend.
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

class ApiClientError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    credentials: "include", // send/receive the httpOnly auth cookie
    ...options,
  });

  let body;
  try {
    body = await res.json();
  } catch {
    body = null;
  }

  if (!res.ok) {
    throw new ApiClientError(body?.message || `Request failed (${res.status})`, res.status);
  }

  return body;
}

function toQueryString(params = {}) {
  const entries = Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== "");
  if (entries.length === 0) return "";
  return `?${new URLSearchParams(entries).toString()}`;
}

export const api = {
  register: (payload) => request("/auth/register", { method: "POST", body: JSON.stringify(payload) }),
  login: (payload) => request("/auth/login", { method: "POST", body: JSON.stringify(payload) }),
  logout: () => request("/auth/logout", { method: "POST" }),
  getMe: () => request("/auth/me"),
  getDestinations: (params) => request(`/destinations${toQueryString(params)}`),
  getDestination: (slug) => request(`/destinations/${slug}`),
  getFoods: (params) => request(`/foods${toQueryString(params)}`),
  getFood: (slug) => request(`/foods/${slug}`),
  getFestivals: () => request("/festivals"),
  subscribeNewsletter: (email) =>
    request("/newsletter", { method: "POST", body: JSON.stringify({ email }) }),
  submitContact: (payload) =>
    request("/contact", { method: "POST", body: JSON.stringify(payload) }),
};

export { ApiClientError };
