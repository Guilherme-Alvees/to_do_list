import { db_crud } from "../db_crud.js";

export const getTasks = (_, res) => {
  const q = "SELECT * FROM tasks";

  db_crud.query(q, (err, data) => {
    if (err) return res.json(err);
    else return res.status(200).json(data);
  });
};

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

    return res.status(201).json({
      message: "Tarefa adicionada com sucesso",
      taskId: result.insertId,
    }); // Corrigido para "taskId"
  });
};

export const deleteTask = (req, res) => {
  const id = req.params.id; // Corrigido para obter o id da URL

  const q = "DELETE FROM tasks WHERE id = ?";

  db_crud.query(q, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao deletar o tarefa" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Tarefa não encontrado" });
    }

    return res.status(200).json({ message: "Tarefa deletada com sucesso" });
  });
};

// Método PUT para atualizar um usuário completamente
export const putTasks = (req, res) => {
  const id = req.params.id; // Obtém o ID da tarefa da URL
  const { task_title, task_description, id_user } = req.body;

  // Verifica se todos os dados necessários foram fornecidos
  if (!task_title || !task_description || id_user === undefined) {
    return res.status(400).json({ error: "Dados insuficientes fornecidos" });
  }

  const q = `
    UPDATE tasks 
    SET task_title = ?, task_description = ?, id_user = ?
    WHERE id = ?
  `;

  db_crud.query(
    q,
    [task_title, task_description, id_user, id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao atualizar a tarefa" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Tarefa não encontrada" });
      }

      return res.status(200).json({ message: "Tarefa atualizada com sucesso" });
    }
  );
};

export const patchTask = (req, res) => {
  const id = req.params.id; // Obtém o ID do usuário da URL
  const updates = req.body;

  // Constrói a consulta SQL dinamicamente com base nos campos fornecidos
  let setClause = [];
  let values = [];

  for (const [key, value] of Object.entries(updates)) {
    setClause.push(`${key} = ?`);
    values.push(value);
  }

  if (setClause.length === 0) {
    return res
      .status(400)
      .json({ error: "Nenhum dado para atualizar fornecido" });
  }

  values.push(id); // Adiciona o ID no final dos valores
  const q = `UPDATE tasks SET ${setClause.join(", ")} WHERE id = ?`;

  db_crud.query(q, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao atualizar o tarefa" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Tarefa não encontrado" });
    }

    return res.status(200).json({ message: "Tarefa atualizado com sucesso" });
  });
};
