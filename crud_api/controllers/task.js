import { db_crud } from "../db_crud.js";

export const postTask = (req, res) => {
  const { task_title, task_description, id_user } = req.body;

  const q = `
        INSERT INTO tasks (task_title, task_description, id_user)
        VALUES (?, ?, ?)`;

  db_crud.query(q, [task_title, task_description, id_user], (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Erro ao inserir nova tarefa ao banco de dados" });
    }

    return res
      .status(201)
      .json({
        message: "Tarefa adicionada com sucesso",
        taskId: result.insertId,
      }); // Corrigido para "taskId"
  });
};
