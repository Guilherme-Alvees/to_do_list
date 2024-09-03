import mysql from "mysql2";

export const db_crud = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "0902",
    database: "db_crud",
});

db_crud.connect((err) => {
    if (err) {
        console.error("Erro ao conectar ao banco de dados!", err.message);
        return;
    }
    console.log("Banco de dados conectado com sucesso!");
});
