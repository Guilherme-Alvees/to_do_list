import jwt from "jsonwebtoken";
import dotenv from "dotenv"; // Importa dotenv diretamente, não o diretório

dotenv.config({ path: "./crud_api/secrets/.env" }); // Especifica o caminho correto do arquivo .env
const JWT_SECRET = process.env.JWT_SECRET_KEY || "default_secret_key"; // A mesma chave secreta usada no controlador

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // O token deve ser passado no cabeçalho

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido" });
    }

    req.user = user; // Salva o usuário decodificado no objeto da requisição
    next(); // Chama o próximo middleware ou rota
  });
};
