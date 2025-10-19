import axios from "axios";

// Axios interceptor
const axiosInstance = axios.create({ baseURL: "http://localhost:5004" });

axiosInstance.interceptors.request.use((req) => {
  if (localStorage.getItem("token")) {
    req.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }

  return req;
});

export default axiosInstance;
