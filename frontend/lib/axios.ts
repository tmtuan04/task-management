import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL === "development"
      ? "http://localhost:3000/api"
      : "/api",
});
