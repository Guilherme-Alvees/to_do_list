import express from "express";
import {
  getUsers,
  postUsers,
  deleteUser,
  putUser,
  patchUser,
} from "../controllers/user.js";
import {
  postTask,
  getTasks,
  deleteTask,
  putTasks,
  patchTask,
} from "../controllers/task.js";

const router = express.Router();

// Users
router.get("/users", getUsers); // Rota para obter todos os usuários
router.post("/users", postUsers); // Rota para adicionar um novo usuário
router.put("/users/:id", putUser); // Rota para atualizar um usuário completamente
router.patch("/users/:id", patchUser); // Rota para atualizar parcialmente um usuário
router.delete("/users/:id", deleteUser); // Rota para deletar um usuário

// Tasks
router.get("/tasks", getTasks); // Rota para obter todas as tarefas
router.post("/tasks", postTask); // Rota para adicionar uma nova tarefa
router.put("/tasks/:id", putTasks); // Rota para atualizar um tarefa completamente
router.delete("/tasks/:id", deleteTask); // Rota para deletar uma tarefa
router.patch("/tasks/:id", patchTask);

export default router;
