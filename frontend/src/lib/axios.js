import axios from "axios";

// Allow explicit API URL via Vite env when frontend is hosted separately
const API_BASE =
  import.meta.env.VITE_API_URL?.trim() ||
  (import.meta.env.MODE === "development"
    ? "http://localhost:3000/api"
    : "/api");

export const axiosInstance = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
});
