import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import Navbar from '../../components/Navbar';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Profile() {
    const [theme, setTheme] = useState('light');
    const [userData, setUserData] = useState({
      name: '',
      email: '',
      password: '',
      phone: '',
    });

    useEffect(() => {
      const fetchedUserData = {
        name: 'John Doe',
        email: 'john@example.com',
        password: '********',
        phone: '123-456-7890',
      };
      setUserData(fetchedUserData);
    }, []);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setUserData({
        ...userData,
        [name]: value,
      });
    };

    const handleSave = () => {
      // Aqui você enviaria os dados atualizados para uma API ou salvaria no localStorage
      console.log('Dados atualizados:', userData);
    };

    const toggleTheme = () => {
      setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const muiTheme = createTheme({
      palette: {
        mode: theme,
      },
    });

return (
<ThemeProvider theme={muiTheme}>
    <Container maxWidth="sm">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <Box mt={5}>
            <Typography variant="h4" component="h1" align="center">
                Perfil do Usuário
            </Typography>
        </Box>
        <Box mt={4} component="form" sx={{ backgroundColor: '#f5f5f5', padding: '5%', borderRadius: '12px'}}>
            <TextField
                fullWidth
                label="Nome"
                name="name"
                variant="outlined"
                value={userData.name}
                onChange={handleChange}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="Email"
                name="email"
                variant="outlined"
                value={userData.email}
                onChange={handleChange}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="Telefone"
                name="phone"
                variant="outlined"
                value={userData.phone}
                onChange={handleChange}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="Senha"
                name="password"
                type="password"
                variant="outlined"
                value={userData.password}
                onChange={handleChange}
                sx={{ mb: 2 }}
            />
            <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSave}
            >
              Salvar Alterações
            </Button>
      </Box>
    </Container>
</ThemeProvider>
  );
}

export default Profile;
