import React, { useState, useEffect } from "react";
import { createTask, getTasksByUsers } from "../../axios.js";
import Colors from "../../utils/colors";
import Navbar from "../../components/Navbar.jsx";

import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Snackbar,
  Alert,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Crud() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [open, setOpen] = useState(false); // Controle de abertura do Snackbar
  const [alertType, setAlertType] = useState("success"); // Tipo de alerta (sucesso ou erro)
  const [alertMessage, setAlertMessage] = useState(""); // Mensagem do alerta
  const [checked, setChecked] = useState([]); // Estado dos checkboxes
  const [tasks, setTasks] = useState([]); // Estado para armazenar as tarefas
  const id_user = 5; // ID do usuário (pode ser dinâmico)

  // Função para fechar o Snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Checkbox das tarefas
  const handleToggle = (taskId) => () => {
    const currentIndex = checked.indexOf(taskId);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(taskId);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  // Requisição para adicionar tarefas
  const postTasks = async () => {
    const taskData = {
      task_title: taskTitle,
      task_description: taskDescription,
      id_user: id_user,
    };

    try {
      const response = await createTask(taskData);
      console.log("Resposta do servidor:", response.data);

      // Atualizar a lista de tarefas após adicionar uma nova
      fetchTasks();

      // Mostra o Snackbar de sucesso
      setAlertType("success");
      setAlertMessage("Tarefa adicionada com sucesso!");
      setOpen(true);
    } catch (error) {
      console.error("Erro ao adicionar a tarefa:", error);

      // Mostra o Snackbar de erro
      setAlertType("error");
      setAlertMessage("Erro ao adicionar tarefa. Tente novamente.");
      setOpen(true);
    }
  };

  // Função para buscar todas as tarefas do usuário
  const fetchTasks = async () => {
    try {
      const response = await getTasksByUsers(id_user);
      console.log("Tarefas recebidas:", response.data); // Adicione este log
      setTasks(response.data); // Armazenar as tarefas no estado
    } catch (error) {
      console.error("Erro ao buscar as tarefas:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Navbar />
      <Box mt={5}>
        <Typography variant="h4" component="h1" align="center">
          Gerenciador
        </Typography>
      </Box>
      <Box
        mt={4}
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          postTasks();
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
          <Button variant="contained" color="primary" fullWidth type="submit">
            Adicionar tarefa
          </Button>

          {/* Snackbar controlado pelo estado */}
          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={alertType}
              variant="filled"
              sx={{ width: "100%" }}
            >
              {alertMessage}
            </Alert>
          </Snackbar>
        </Box>
        <Box>
          <List
            sx={{
              width: "100%",
              marginTop: "10px",
              bgcolor: "background.paper",
              overflow: "auto",
              maxHeight: 300,
            }}
          >
            {tasks.map((task) => {
              const labelId = `checkbox-list-label-${task.id}`;
              const isChecked = checked.includes(task.id); // Verifica se a tarefa está marcada

              return (
                <ListItem
                  key={task.id}
                  secondaryAction={
                    <Box>
                      <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                      <IconButton edge="end" aria-label="edit">
                        <EditIcon />
                      </IconButton>
                    </Box>
                  }
                  disablePadding
                >
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggle(task.id)}
                  >
                    <ListItemIcon>
                      <Checkbox checked={isChecked} />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={
                        <Typography
                          sx={{
                            textDecoration: isChecked ? "line-through" : "none",
                          }}
                        >
                          {task.task_title}
                        </Typography>
                      }
                      secondary={task.task_description}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Box>
    </Container>
  );
}

export default Crud;
