import axios from "axios";

const headers: Record<string, string> = {
  "Content-Type": "application/json",
};

// Only add api-keys if it has a value
if (process.env.NEXT_PUBLIC_API_KEY) {
  headers["api-keys"] = process.env.NEXT_PUBLIC_API_KEY;
}

// Only add Authorization if it has a value
if (process.env.NEXT_PUBLIC_API_TOKEN) {
  headers["Authorization"] = `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`;
}

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:8081",
  headers,
});

export default axiosInstance;
