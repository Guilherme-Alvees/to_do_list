import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Switch, Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link as RouterLink, useLocation } from 'react-router-dom';

function Navbar({ theme, toggleTheme }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const ChangeScreen = () => {
    return location.pathname === "/profile" ? "/crud" : "/profile";
  };

  const handleLogout = () => {
    console.log("Usuário saiu.");
    setAnchorEl(null);
    // Lógica de logout (limpar tokens, etc.)
  };

  // Condicional para o texto do MenuItem
  const getMenuItemText = () => {
    return location.pathname === "/profile" ? "Home" : "Perfil";
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          To do List
        </Typography>
        <Switch checked={theme === 'dark'} onChange={toggleTheme} />
        <IconButton
          edge="end"
          color="inherit"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
        >
          <AccountCircle />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={handleClose}
            component={RouterLink}
            to={ChangeScreen()}
          >
            {getMenuItemText()}
          </MenuItem>
          <MenuItem
            component={RouterLink}
            to="/"
            onClick={handleLogout}
          >
            Sair
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
