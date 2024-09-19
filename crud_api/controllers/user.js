import { db_crud } from "../db_crud.js";

export const getUsers = (_, res) => {
  const q = "SELECT * FROM users";

  db_crud.query(q, (err, data) => {
    if (err) return res.json(err);
    else return res.status(200).json(data);
  });
};

export const postUsers = (req, res) => {
  const { name, phone, email, password, adm_user } = req.body;

  const q = `
        INSERT INTO users (name, phone, email, password, adm_user)
        VALUES (?, ?, ?, ?, ?)
    `;

  db_crud.query(q, [name, phone, email, password, adm_user], (err, result) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Erro ao inserir usuario no banco de dados" });
    }

    return res.status(201).json({
      message: "Usuário adicionado com sucesso",
      userId: result.insertId,
    });
  });
};

export const deleteUser = (req, res) => {
  const id = req.params.id; // Corrigido para obter o id da URL

  const q = "DELETE FROM users WHERE id = ?";

  db_crud.query(q, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao deletar o usuário" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json({ message: "Usuário deletado com sucesso" });
  });
};

// Método PUT para atualizar um usuário completamente
export const putUser = (req, res) => {
  const id = req.params.id; // Obtém o ID do usuário da URL
  const { name, phone, email, password, adm_user } = req.body;

  // Verifica se todos os dados necessários foram fornecidos
  if (!name || !phone || !email || !password || adm_user === undefined) {
    return res.status(400).json({ error: "Dados insuficientes fornecidos" });
  }

  const q = `
    UPDATE users 
    SET name = ?, phone = ?, email = ?, password = ?, adm_user = ?
    WHERE id = ?
  `;

  db_crud.query(
    q,
    [name, phone, email, password, adm_user, id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Erro ao atualizar o usuário" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      return res
        .status(200)
        .json({ message: "Usuário atualizado com sucesso" });
    }
  );
};

// Método PATCH para atualizar um usuário parcialmente
export const patchUser = (req, res) => {
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
  const q = `UPDATE users SET ${setClause.join(", ")} WHERE id = ?`;

  db_crud.query(q, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao atualizar o usuário" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    return res.status(200).json({ message: "Usuário atualizado com sucesso" });
  });
};
