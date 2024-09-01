// src/pages/authentication/RegisterForm.jsx
import React from 'react';
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

const RegisterForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
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
      
      <Box component="form" mt={8} sx={{ backgroundColor: Colors.White_Light, padding: '10%', borderRadius: '12px' }}>
        <Typography variant="h6" sx={{ color: Colors.Blue_Primary }}>
          Cadastro
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          <TextField 
            fullWidth 
            id="input-with-sx" 
            label="Email" 
            variant="standard"
            type='email'
          />
        </Box>
        <FormControl fullWidth variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Senha</InputLabel>
          <Input
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
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 4 }}
        >
          Cadastrar
        </Button>
        <Box sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center', mt: 2 }}>
          <Typography variant="body2" sx={{ mr: 1, color: Colors.Black_Dark }}>
            Já tem conta?
          </Typography>
          <Link 
            to="/"
            sx={{ fontStyle: 'italic', color: Colors.Blue_Primary }}
          >
            Conectar-se
          </Link>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterForm;
