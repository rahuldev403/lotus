import axios from "axios";

// Allow explicit API URL via Vite env when frontend is hosted separately
// Fallback: dev -> localhost; prod -> same-origin /api (requires proxy or absolute env var in hosting)
const API_BASE =
  import.meta.env.VITE_API_URL?.trim() ||
  (import.meta.env.MODE === "development"
    ? "http://localhost:3000/api"
    : "/api");

export const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});
