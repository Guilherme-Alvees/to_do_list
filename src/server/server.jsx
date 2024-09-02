// index.js
const express = require('express');
const app = express();
const db = require('./db');
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Rota para criar uma nova tarefa
app.post('/tasks', (req, res) => {
  const { title, description } = req.body;
  const sql = 'INSERT INTO tasks (title, description) VALUES (?, ?)';
  
  db.query(sql, [title, description], (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao criar tarefa');
    }
    res.status(201).send(`Tarefa criada com ID: ${result.insertId}`);
  });
});

// Rota para listar todas as tarefas
app.get('/tasks', (req, res) => {
  const sql = 'SELECT * FROM tasks';
  
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).send('Erro ao buscar tarefas');
    }
    res.json(results);
  });
});

// Rota para atualizar uma tarefa
app.put('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const sql = 'UPDATE tasks SET title = ?, description = ? WHERE id = ?';
  
  db.query(sql, [title, description, id], (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao atualizar tarefa');
    }
    res.send('Tarefa atualizada com sucesso');
  });
});

// Rota para excluir uma tarefa
app.delete('/tasks/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM tasks WHERE id = ?';
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      return res.status(500).send('Erro ao excluir tarefa');
    }
    res.send('Tarefa excluída com sucesso');
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
