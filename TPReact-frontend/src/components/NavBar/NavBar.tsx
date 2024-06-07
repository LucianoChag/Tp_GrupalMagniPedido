import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LunchDiningOutlinedIcon from '@mui/icons-material/LunchDiningOutlined';
import Divider from '@mui/material/Divider';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './NavBar.css';

interface NavBarProps {
  toggleCarrito: () => void;
  carritoVisible: boolean;
}

const NavBar: React.FC<NavBarProps> = ({ toggleCarrito, carritoVisible }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}><Person2OutlinedIcon sx={{ mr: 1 }} />Perfil</MenuItem>
      <MenuItem onClick={handleMenuClose}><SettingsOutlinedIcon sx={{ mr: 1 }} />Ajustes</MenuItem>
      <Divider />
      <MenuItem onClick={handleMenuClose}><LoginOutlinedIcon sx={{ mr: 1 }} />Cerrar Sesión</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="appbar">
        <Toolbar className="toolbar">
          <Typography
            variant="h6"
            noWrap
            component="div"
            className="logo"
            sx={{ flexGrow: 1 }}
          >
            <img src="/logo/buenSabor.png" alt="Logo de Buen Sabor" />
            <LunchDiningOutlinedIcon sx={{ color: '#FFFFBF', mr: 1 }} />
          </Typography>

          <IconButton
            size="large"
            aria-label="show carrito"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={toggleCarrito}
            color="inherit"
          >
            <ShoppingCartIcon />
          </IconButton>

          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <div className="navbar-spacer"></div>
    </Box>
  );
}

export default NavBar;
