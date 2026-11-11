/**
 * ============================================================
 * API Configuration (Axios)
 * ============================================================
 * This is the SINGLE place that knows the backend address.
 *
 * Real-life analogy:
 * Think of this file as the address book of the backend.
 * If you move the backend to a new server, you only change
 * the address here – nowhere else in the frontend.
 */

import axios from "axios";

// In development the backend runs on port 5050.
// You can override this with a .env file:
//   VITE_API_URL=https://your-backend.onrender.com
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5050";

/**
 * Pre-configured Axios instance
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// ------------------------------------------------------------
// URL Shortener
// ------------------------------------------------------------

/**
 * Create a short URL
 * POST /api/urls/save
 */
export async function createShortUrl(longUrl) {
  const response = await api.post("/api/urls/save", { longUrl });
  return response.data;
}

/**
 * Health check
 */
export async function checkBackendHealth() {
  const response = await api.get("/api/health");
  return response.data;
}

// ------------------------------------------------------------
// Authentication
// ------------------------------------------------------------

/**
 * Create a new account
 * POST /api/auth/signup
 *
 * @param {object} data - { name, email, password }
 */
export async function signupUser(data) {
  const response = await api.post("/api/auth/signup", data);
  return response.data;
}

/**
 * Log an existing user in
 * POST /api/auth/login
 *
 * @param {object} data - { email, password }
 */
export async function loginUser(data) {
  const response = await api.post("/api/auth/login", data);
  return response.data;
}

export default api;
