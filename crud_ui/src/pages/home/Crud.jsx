import React, { useState } from "react";
import Colors from "../../utils/colors";
import { TextField, Button, Typography, Box, Container } from "@mui/material";
import { createTask } from "../../axios.js";

function Crud() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");

  const getTasks = () => {
    console.log("Título da Tarefa:", taskTitle);
    console.log("Descrição da Tarefa:", taskDescription);
  };

  // Função para postar a tarefa usando Axios
  const PostTasks = async () => {
    // Cria o objeto com os dados que serão enviados
    const taskData = {
      task_title: taskTitle,
      task_description: taskDescription,
      id_user: 1, // user_id sempre definido como 1
    };

    try {
      // Chama a função createTask para fazer a requisição
      const response = await createTask(taskData);
      console.log("Resposta do servidor:", response.data);
      alert("Tarefa adicionada com sucesso!");
    } catch (error) {
      console.error("Erro ao adicionar a tarefa:", error);
      alert("Erro ao adicionar tarefa. Tente novamente.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box mt={5}>
        <Typography variant="h4" component="h1" align="center">
          Gerenciador
        </Typography>
      </Box>
      <Box
        mt={4}
        component="form"
        onSubmit={(e) => {
          e.preventDefault(); // Previne o comportamento padrão de recarregar a página
          PostTasks(); // Chama a função PostTasks ao submeter o formulário
        }}
        sx={{
          backgroundColor: Colors.White_Light,
          padding: "5%",
          borderRadius: "12px",
        }}
      >
        <TextField
          fullWidth
          label="Titulo da tarefa"
          variant="outlined"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Descrição da tarefa"
          variant="outlined"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit" // Submete o formulário e chama PostTasks
            onClick={getTasks}
          >
            Adicionar tarefa
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Crud;
