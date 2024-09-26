import { db_crud } from "../db_crud.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import dotenv from "dotenv";

dotenv.config({ path: "./crud_api/secrets/.env" });
const JWT_SECRET = process.env.JWT_SECRET_KEY || "default_secret_key";

// Autenticação de Usuários
export const loginUser = (req, res) => {
  const q =
    "SELECT id, email, phone, name, password FROM users WHERE email = ?";

  const { email, password } = req.body;

  // Executa a consulta SQL
  db_crud.query(q, [email], async (err, data) => {
    if (err) {
      console.error("Erro na consulta:", err);
      return res.status(500).json({ message: "Erro no servidor" });
    }

    // Verifica se o usuário foi encontrado
    if (data.length === 0) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const user = data[0];

    // Comparação de senha usando bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    // Geração do token JWT
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

    // Autenticação bem-sucedida
    return res.status(200).json({
      message: "Credenciais válidas",
      token,
      user: {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
      },
    });
  });
};

// Middleware para validação
export const validateRegister = [
  body("email").isEmail().withMessage("Email inválido"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("A senha deve ter pelo menos 6 caracteres"),
];

// Função que registra um novo usuário ao DB
export const registerUser = async (req, res) => {
  // Verifica se há erros de validação
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, phone, email, password, adm_user } = req.body;

  try {
    // Hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const q = `
      INSERT INTO users (name, phone, email, password, adm_user)
      VALUES (?, ?, ?, ?, ?)
    `;

    // Executa a query para inserir o usuário
    db_crud.query(
      q,
      [name, phone, email, hashedPassword, adm_user],
      (err, result) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ error: "Erro ao inserir usuário no banco de dados" });
        }

        return res.status(201).json({
          message: "Usuário adicionado com sucesso",
          userId: result.insertId,
        });
      }
    );
  } catch (error) {
    console.error("Erro ao registrar o usuário:", error);
    return res.status(500).json({ error: "Erro no servidor" });
  }
};

// Função para obter perfil do usuário
export const getUserProfile = (req, res) => {
  const q = "SELECT id, name, email, phone FROM users WHERE id = ?";

  db_crud.query(q, [req.user.id], (err, data) => {
    if (err) {
      console.error("Erro na consulta:", err);
      return res.status(500).json({ message: "Erro no servidor" });
    }

    // Verifica se o usuário foi encontrado
    if (data.length === 0) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    const user = data[0];

    res.json({
      msg: "Perfil do usuário",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
    });
  });
};

export const getUsers = (_, res) => {
  const q = "SELECT * FROM users";

  db_crud.query(q, (err, data) => {
    if (err) return res.json(err);
    else return res.status(200).json(data);
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
