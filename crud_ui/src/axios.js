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
//Users
export const authUser = (userData) => axiosInstance.post("/login", userData);

export const getUsers = (userData) => axiosInstance.get("/users", userData);

export const createUser = (userData) => axiosInstance.post("/users", userData);

//Tasks

export const getTask = (userData) => axiosInstance.get("/tasks", userData);

export const createTask = (userData) => axiosInstance.post("/tasks", userData);

export const editTask = (userData) => axiosInstance.put("/tasks/:id", userData);

export const deleteTask = (userData) =>
  axiosInstance.delete("/tasks", userData);

export const getTasksByUsers = (userData) =>
  axiosInstance.get("/tasks/:id", userData);
