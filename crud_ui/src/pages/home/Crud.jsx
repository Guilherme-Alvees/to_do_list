import React, { useState } from "react";
import { createTask } from "../../axios.js";
import Navbar from "../../components/Navbar";
import Colors from "../../utils/colors";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Crud() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [editingTaskIndex, setEditingTaskIndex] = useState(null);
  const [theme, setTheme] = useState("light");
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);

  const handleAddTask = async () => {
    if (editingTaskIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === editingTaskIndex
          ? {
              title: taskTitle,
              description: taskDescription,
              completed: task.completed,
            }
          : task
      );
      setTasks(updatedTasks);
      setEditingTaskIndex(null);
    } else {
      try {
        const userId = 1; // Hardcoded UserID for now
        const newTaskData = {
          title: taskTitle,
          description: taskDescription,
          userId: userId,
        };
        await createTask(newTaskData);
        setTasks([
          ...tasks,
          {
            title: taskTitle,
            description: taskDescription,
            completed: false,
          },
        ]);
        setOpen(true); // Show success Snackbar only after success
      } catch (error) {
        console.error("Error adding task:", error);
        handleClickError(); // Show error Snackbar
      }

      setTaskTitle("");
      setTaskDescription("");
    }
  };

  const handleClickError = () => {
    setErrorOpen(true); // Show error Snackbar
  };

  const handleErrorClose = () => {
    setErrorOpen(false); // Close error Snackbar
  };

  const handleDeleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleEditTask = (index) => {
    setTaskTitle(tasks[index].title);
    setTaskDescription(tasks[index].description);
    setEditingTaskIndex(index);
  };

  const handleToggleComplete = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const muiTheme = createTheme({
    palette: {
      mode: theme,
    },
  });

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Container maxWidth="sm">
        <Box mt={5}>
          <Typography variant="h4" component="h1" align="center">
            Gerenciador
          </Typography>
        </Box>
        <Box
          mt={4}
          component="form"
          onSubmit={(e) => e.preventDefault()}
          sx={{
            backgroundColor:
              theme === "light" ? Colors.White_Light : Colors.Dark_Light,
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
              onClick={handleAddTask}
            >
              {editingTaskIndex !== null ? "Salvar tarefa" : "Adicionar tarefa"}
            </Button>
            <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity="success"
                variant="filled"
                sx={{ width: "100%" }}
              >
                Tarefa adicionada com sucesso!
              </Alert>
            </Snackbar>
            <Snackbar
              open={errorOpen}
              autoHideDuration={4000}
              onClose={handleErrorClose}
            >
              <Alert
                onClose={handleErrorClose}
                severity="error"
                variant="filled"
                sx={{ width: "100%" }}
              >
                Erro ao adicionar tarefa!
              </Alert>
            </Snackbar>
          </Box>
        </Box>
        <List sx={{ mt: 4 }}>
          {tasks.map((task, index) => (
            <ListItem
              key={index}
              divider
              sx={{
                backgroundColor:
                  theme === "light" ? Colors.White_Light : Colors.Dark_Light,
                borderRadius: "12px",
              }}
            >
              <Checkbox
                checked={task.completed}
                onChange={() => handleToggleComplete(index)}
              />
              <ListItemText
                primary={task.title}
                secondary={task.description}
                sx={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              />
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleEditTask(index)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteTask(index)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </Container>
    </ThemeProvider>
  );
}

export default Crud;
