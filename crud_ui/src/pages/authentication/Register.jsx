import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../axios";
import Colors from "../../utils/colors";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Link,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link as RouterLink } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Abre o Backdrop
      setOpenBackdrop(true);

      const response = await registerUser({
        name,
        phone,
        email,
        password,
      });
      console.log("Response:", response.data);

      // Exibe o Snackbar de sucesso
      handleClickRegister();

      // Aguarda 2 segundos e redireciona para a página de login
      setTimeout(() => {
        setOpenBackdrop(false); // Fecha o Backdrop
        navigate("/login"); // Redireciona para a tela de login
      }, 2000); // 2 segundos
    } catch (error) {
      console.error("Error:", error);

      // Fecha o Backdrop e exibe o Snackbar de erro
      setOpenBackdrop(false);
      handleClickError(); // Exibe o Snackbar de erro
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleClickRegister = () => setOpen(true);
  const handleClickError = () => setErrorOpen(true);
  const handleClose = () => {
    setOpen(false);
    setOpenBackdrop(false);
  };
  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") return;
    setErrorOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={5}>
        <Typography variant="h4" component="h1">
          <strong>To do List</strong>
        </Typography>
        <Typography
          variant="h6"
          component="h3"
          sx={{ color: Colors.Blue_Primary }}
        >
          Por Guilherme Alves
        </Typography>
      </Box>

      <Box
        component="form"
        mt={8}
        sx={{
          backgroundColor: Colors.White_Light,
          padding: "10%",
          borderRadius: "12px",
        }}
        onSubmit={handleSubmit}
      >
        <Box sx={{ mb: 3 }}>
          <TextField
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            label="Nome"
            variant="standard"
          />
        </Box>
        <Box sx={{ mb: 3 }}>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            id="input-with-sx"
            label="Email"
            variant="standard"
            type="email"
          />
        </Box>
        <Box sx={{ mb: 3 }}>
          <TextField
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            fullWidth
            label="Telefone"
            variant="standard"
          />
        </Box>
        <FormControl fullWidth variant="standard" sx={{ mb: 3 }}>
          <InputLabel htmlFor="standard-adornment-password">Senha</InputLabel>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>

        <Box>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Cadastrar
          </Button>

          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={openBackdrop}
          >
            <CircularProgress color="inherit" />
          </Backdrop>

          <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              variant="filled"
              sx={{ width: "100%" }}
            >
              Usuário cadastrado com sucesso!
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
              Erro ao cadastrar usuário!
            </Alert>
          </Snackbar>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "left",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Typography variant="body2" sx={{ mr: 1, color: Colors.Black_Dark }}>
            Já tem uma conta?
          </Typography>
          <Link
            component={RouterLink}
            to="/login"
            sx={{
              fontStyle: "italic",
              color: Colors.Blue_Primary,
              cursor: "pointer",
            }}
          >
            Conectar-se
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
