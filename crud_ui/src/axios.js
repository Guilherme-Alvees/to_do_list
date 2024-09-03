import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8800/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erro na requisição:", error);
    return Promise.reject(error);
  }
);

export default axiosInstance;

export const getUsers = (userData) =>
  axiosInstance.get("/authentication", userData);

export const createUser = (userData) =>
  axiosInstance.post("/authentication", userData);

export const createTask = (userData) => axiosInstance.post("/tasks", userData);
