import React, { useState } from "react";
import Colors from "../../utils/colors";
import { authUser } from "../../axios.js";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Link,
  Snackbar,
  Alert,
  IconButton,
  Input,
  InputLabel,
  InputAdornment,
  FormControl,
  Checkbox,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorOpen, setErrorOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleErrorClose = () => {
    setErrorOpen(false);
  };

  // Métodos
  const handleLogin = async (e) => {
    e.preventDefault();

    const authUserData = {
      email: email,
      password: password,
    };

    try {
      const response = await authUser(authUserData);
      console.log("Usuário autenticado com sucesso", response.data);
      // Redireciona para a rota principal após sucesso
      navigate("/");
    } catch (error) {
      console.error("Erro ao autenticar usuário:", error);
      // Ativa o estado de erro para os inputs e exibe o snackbar
      setError(true);
      setErrorOpen(true);
    }
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
        onSubmit={handleLogin}
        component="form"
        mt={8}
        sx={{
          backgroundColor: Colors.White_Light,
          padding: "10%",
          borderRadius: "12px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "flex-end" }}>
          <TextField
            error={error}
            sx={{ mb: 3 }}
            fullWidth
            id="email-input"
            label="Email"
            variant="standard"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <FormControl fullWidth variant="standard">
          <InputLabel error={error} htmlFor="standard-adornment-password">
            Senha
          </InputLabel>
          <Input
            error={error}
            fullWidth
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Checkbox defaultChecked size="small" />
            <Typography
              variant="body2"
              sx={{ marginLeft: "-5px", color: Colors.Black_Dark }}
            >
              Manter conectado
            </Typography>
          </Box>
          <Link
            href="/esqueceu-senha"
            sx={{ fontStyle: "italic", color: Colors.Blue_Primary }}
          >
            Esqueceu a senha?
          </Link>
        </Box>
        <Box>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 4 }}
            onClick={handleLogin}
          >
            Entrar
          </Button>
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
              Email ou senha não encontrados. Tente novamente
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
            Ainda não tem conta?
          </Typography>
          <Link
            component={RouterLink}
            to="/register"
            sx={{ fontStyle: "italic", color: Colors.Blue_Primary }}
          >
            Cadastrar-se
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
