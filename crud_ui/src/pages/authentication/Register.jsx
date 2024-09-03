import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Adicione useNavigate
import { createUser } from '../../axios';
import Colors from '../../utils/colors';
import { 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Container, 
  Link 
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Link as RouterLink } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate(); // Use useNavigate para redirecionar

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createUser({
        name,
        phone,
        email,
        password,
      });
      console.log('Response:', response.data);
      handleClickRegister(); // Abre o Snackbar após sucesso

      setTimeout(() => {
        navigate('/'); // Redireciona para a tela de login após 3 segundos
      }, 3000);

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleClickRegister = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={5}>
        <Typography variant="h4" component="h1">
          <strong>To do List</strong>
        </Typography>
        <Typography variant="h6" component="h3" sx={{ color: Colors.Blue_Primary }}>
          Por Guilherme Alves
        </Typography>
      </Box>
      
      <Box 
        component="form" 
        mt={8} 
        sx={{ backgroundColor: Colors.White_Light, padding: '10%', borderRadius: '12px' }}
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
            type='email'
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
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Box>
          <Button
            type="submit" // Tipo do botão alterado para "submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 4 }}
          >
            Cadastrar
          </Button>
          <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="success"
              variant="filled"
              sx={{ width: '100%' }}
            >
              Usuário cadastrado com sucesso!
            </Alert>
          </Snackbar>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', mt: 2 }}>
          <Typography variant="body2" sx={{ mr: 1, color: Colors.Black_Dark }}>
            Já tem uma conta?
          </Typography>
          <Link
            component={RouterLink}
            to="/"
            sx={{ 
              fontStyle: 'italic', 
              color: Colors.Blue_Primary,
              cursor: 'pointer'
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
