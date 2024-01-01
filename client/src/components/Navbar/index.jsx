import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
import { setLocale } from '@containers/App/actions';
import logo from '@static/images/gelorasa-logo.png';
import { AppBar, Box, Button, Container, IconButton, Toolbar, Tooltip, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { actionLogoutUser } from '@containers/Client/actions';
import { selectLogin, selectUser } from '@containers/Client/selectors';
import classes from './style.module.scss';

const Navbar = ({ locale }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = useSelector(selectLogin);
  const user = useSelector(selectUser);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [menuPosition, setMenuPosition] = useState(null);
  const open = Boolean(menuPosition);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClick = (event) => {
    setMenuPosition(event.currentTarget);
  };

  const handleClose = () => {
    setMenuPosition(null);
  };

  const onSelectLang = (lang) => {
    if (lang !== locale) {
      dispatch(setLocale(lang));
    }
    handleClose();
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    dispatch(
      actionLogoutUser(() => {
        navigate('/login');
      })
    );
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#151422', overflow: 'hidden' }}>
      <Container maxWidth="xl" sx={{ py: 1 }}>
        <Toolbar disableGutters>
          {/* Logo and Text for Desktop View */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', flexGrow: 1 }}>
            <Avatar src={logo} sx={{ width: 40, height: 40, marginRight: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/home"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              GELORASA
            </Typography>
          </Box>

          {/* Conditional Menus based on login state */}
          {login && (
            <Box sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {user?.role === 1 && (
                  <MenuItem onClick={() => handleNavigate('/become-event-organizer')}>
                    <Typography textAlign="center">
                      <FormattedMessage id="app_menu_become_event_organizer" />
                    </Typography>
                  </MenuItem>
                )}
                {(user?.role === 1 || user?.role === 2) && (
                  <MenuItem onClick={() => handleNavigate('/streaming')}>
                    <Typography textAlign="center">
                      <FormattedMessage id="app_menu_streaming" />
                    </Typography>
                  </MenuItem>
                )}
              </Menu>
            </Box>
          )}
          {!login && (
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem onClick={() => navigate('/login')}>
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
              </Menu>
            </Box>
          )}

          {/* Logo for Mobile View */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'none', width: '100%' },
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '10px',
            }}
          >
            <IconButton size="large" edge="start" color="inherit" aria-label="logo" onClick={() => navigate('/home')}>
              <Avatar src={logo} sx={{ width: 30, height: 30 }} />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/home"
              sx={{
                display: { xs: 'block', md: 'none' },
                fontFamily: 'monospace',
                letterSpacing: '.1rem', // Reduced letter spacing
                color: 'inherit',
                textDecoration: 'none',
                fontSize: '0.75rem', // Further reduced font size for mobile
                overflow: 'hidden', // Hide overflow
                whiteSpace: 'nowrap', // Prevent wrapping
                textOverflow: 'ellipsis', // Use an ellipsis to indicate text overflow
                maxWidth: 'calc(100% - 48px)', // Max width to prevent overflow, 48px allows space for IconButton
              }}
            >
              Gelorasa
            </Typography>
          </Box>

          {login ? (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'end', gap: 8 } }}>
              {user?.role === 1 && (
                <Button
                  onClick={() => handleNavigate('/become-event-organizer')}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  <FormattedMessage id="app_menu_become_event_organizer" />
                </Button>
              )}
              {(user?.role === 1 || user?.role === 2) && (
                <Button onClick={() => handleNavigate('/streaming')} sx={{ my: 2, color: 'white', display: 'block' }}>
                  <FormattedMessage id="app_menu_streaming" />
                </Button>
              )}
            </Box>
          ) : (
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', justifyContent: 'end' } }}>
              <Button
                onClick={() => navigate('/login')}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  borderColor: 'white',
                  backgroundColor: '#007bff',
                  marginRight: 3,
                  '&:hover': {
                    backgroundColor: '#0069d9',
                  },
                }}
              >
                <FormattedMessage id="app_menu_login" />
              </Button>
            </Box>
          )}

          {/* Language and User Menu */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1,
              marginRight: '5px',
            }}
            onClick={handleClick}
          >
            <Avatar
              className={classes.avatar}
              src={locale === 'id' ? '/id.png' : '/en.png'}
              sx={{ width: 20, height: 20 }}
            />
            <div className={classes.lang}>{locale}</div>
            <ExpandMoreIcon />
          </Box>

          <Menu open={open} anchorEl={menuPosition} onClose={handleClose}>
            <MenuItem onClick={() => onSelectLang('id')} selected={locale === 'id'}>
              <div className={classes.menu}>
                <Avatar className={classes.menuAvatar} src="/id.png" sx={{ width: 20, height: 20 }} />
                <div className={classes.menuLang}>
                  <FormattedMessage id="app_lang_id" />
                </div>
              </div>
            </MenuItem>
            <MenuItem onClick={() => onSelectLang('en')} selected={locale === 'en'}>
              <div className={classes.menu}>
                <Avatar className={classes.menuAvatar} src="/en.png" sx={{ width: 20, height: 20 }} />
                <div className={classes.menuLang}>
                  <FormattedMessage id="app_lang_en" />
                </div>
              </div>
            </MenuItem>
          </Menu>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar src="" alt="Avatar" sx={{ width: 40, height: 40 }} />
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {login && (
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography onClick={() => handleNavigate('/dashboard')} textAlign="center">
                    <FormattedMessage id="app_menu_dashboard" />
                  </Typography>
                </MenuItem>
              )}
              {login && (
                <MenuItem onClick={handleLogout}>
                  <Typography textAlign="center">
                    <FormattedMessage id="app_menu_logout" />
                  </Typography>
                </MenuItem>
              )}
              {!login && (
                <MenuItem onClick={() => navigate('/login')}>
                  <Typography textAlign="center">
                    <FormattedMessage id="app_menu_login" />
                  </Typography>
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

Navbar.propTypes = {
  locale: PropTypes.string.isRequired,
};

export default Navbar;
