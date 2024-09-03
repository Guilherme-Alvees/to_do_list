import { db_crud } from "../db_crud.js";

export const getUsers = (_, res) => {
  const q = "SELECT id FROM users WHERE name = 'Guilherme Alves'";

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
