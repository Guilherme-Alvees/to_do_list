import React, { useState, useEffect } from "react";
import {
  createTask,
  getTasksByUsers,
  deleteTask,
  editTask,
} from "../../axios.js";
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
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [checked, setChecked] = useState([]);
  const [tasks, setTasks] = useState([]);
  const userId_registered = localStorage.getItem("userId");

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
      id_user: userId_registered,
    };

    try {
      const response = await createTask(taskData);
      console.log("Resposta do servidor:", response.data);
      fetchTasks(); // Atualizar a lista de tarefas após adicionar uma nova
      setAlertType("success");
      setAlertMessage("Tarefa adicionada com sucesso!");
      setOpen(true);
    } catch (error) {
      console.error("Erro ao adicionar a tarefa:", error);
      setAlertType("error");
      setAlertMessage("Erro ao adicionar tarefa. Tente novamente.");
      setOpen(true);
    }
  };

  // Função para buscar todas as tarefas do usuário
  const fetchTasks = async () => {
    try {
      const response = await getTasksByUsers(userId_registered);
      console.log("Tarefas recebidas:", response.data);
      if (response.data && Array.isArray(response.data)) {
        setTasks(response.data);
      } else {
        console.error("Formato de resposta inesperado:", response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar as tarefas:", error);
    }
  };

  // useEffect para buscar tarefas ao montar o componente
  useEffect(() => {
    fetchTasks();
  }, []);

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
          <List>
            {tasks.map((task, index) => {
              const isChecked = checked.includes(task.task_title); // Usando o título como referência temporária

              return (
                <ListItem key={index} disablePadding>
                  <ListItemButton
                    role={undefined}
                    onClick={handleToggle(task.task_title)}
                  >
                    <ListItemIcon>
                      <Checkbox checked={isChecked} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography
                          sx={{
                            textDecoration: isChecked ? "line-through" : "none",
                          }}
                        >
                          {task.task_title || "Tarefa sem título"}
                        </Typography>
                      }
                      secondary={task.task_description || "Sem descrição"}
                    />
                  </ListItemButton>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton edge="end" aria-label="edit">
                    <EditIcon />
                  </IconButton>
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
