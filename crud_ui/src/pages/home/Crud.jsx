import React, { useState } from "react";
import { createTask } from "../../axios.js";
import Colors from "../../utils/colors";

import { TextField, Button, Typography, Box, Container } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Crud() {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [open, setOpen] = useState(false); // Controle de abertura do Snackbar
  const [alertType, setAlertType] = useState("success"); // Tipo de alerta (sucesso ou erro)
  const [alertMessage, setAlertMessage] = useState(""); // Mensagem do alerta

  // Função para fechar o Snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Função para criar tarefa
  const PostTasks = async () => {
    const taskData = {
      task_title: taskTitle,
      task_description: taskDescription,
      id_user: 1,
    };

    try {
      const response = await createTask(taskData);
      console.log("Resposta do servidor:", response.data);

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
          e.preventDefault();
          PostTasks();
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

          {/* Apenas um Snackbar controlado pelo estado */}
          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={alertType} // Controla se será 'success' ou 'error'
              variant="filled"
              sx={{ width: "100%" }}
            >
              {alertMessage} {/* Mensagem personalizada */}
            </Alert>
          </Snackbar>
        </Box>
        <Box>
          <List
            sx={{
              width: "100%",
              maxHeight: 400,
              bgcolor: "background.paper",
              marginTop: "5px",
              overflow: "auto",
              position: "relative",
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((value) => (
              <ListItem
                key={value}
                disableGutters
                secondaryAction={
                  <Box>
                    <IconButton aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit">
                      <EditIcon />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemText
                  primary={`Titulo ${value}`}
                  secondary={`Descrição ${value}`}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Container>
  );
}

export default Crud;
