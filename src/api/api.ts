import axios from "axios";

const api = axios.create({
  baseURL: "https://tech-test-backend.dwsbrazil.io",
});

export default api;
