// src/utils/api.ts
// FastAPI API Client Helper for JWT Credentials Authentication

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function setAuthToken(token: string) {
  if (typeof window !== "undefined") {
    localStorage.setItem("auth_token", token);
  }
}

export function getAuthToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token");
  }
  return null;
}

export function clearAuthToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_role");
  }
}

async function request(path: string, options: RequestInit = {}) {
  const token = getAuthToken();
  const headers = new Headers(options.headers || {});
  
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }
  headers.set("Content-Type", "application/json");

  const response = await fetch(`${BACKEND_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.detail || "Request failed");
  }

  return response.json();
}

export const api = {
  async register(orgName: string, email: string, password: string, dpdpConsent: boolean) {
    const data = await request("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({
        org_name: orgName,
        email,
        password,
        dpdp_consent: dpdpConsent,
      }),
    });
    setAuthToken(data.access_token);
    if (typeof window !== "undefined") {
      localStorage.setItem("user_role", data.role);
    }
    return data;
  },

  async login(email: string, password: string) {
    const data = await request("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    setAuthToken(data.access_token);
    if (typeof window !== "undefined") {
      localStorage.setItem("user_role", data.role);
    }
    return data;
  },

  async checkHealth() {
    return request("/health");
  }
};
