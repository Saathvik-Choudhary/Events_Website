import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Badge,
  Menu,
  MenuItem,
  Avatar,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search,
  Sports,
  Event,
  LocationOn,
  Person,
  Notifications,
  Close,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/events?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navigationItems = [
    { label: 'Home', path: '/', icon: <Sports /> },
    { label: 'Events', path: '/events', icon: <Event /> },
    { label: 'Venues', path: '/venues', icon: <LocationOn /> },
    { label: 'Categories', path: '/categories', icon: <Sports /> },
  ];

  const drawer = (
    <Box sx={{ width: 250 }}>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h6" color="primary" fontWeight="bold">
          🏃‍♂️ SportsEvents
        </Typography>
        <IconButton onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>
      <List>
        {navigationItems.map((item) => (
          <ListItem
            key={item.path}
            component="button"
            onClick={() => {
              navigate(item.path);
              setMobileOpen(false);
            }}
            sx={{
              bgcolor: location.pathname === item.path ? 'primary.50' : 'transparent',
              '&:hover': {
                bgcolor: 'primary.50',
              },
              cursor: 'pointer',
              border: 'none',
              background: 'none',
              width: '100%',
              textAlign: 'left',
            }}
          >
            <ListItemIcon sx={{ color: location.pathname === item.path ? 'primary.main' : 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.label}
              sx={{
                color: location.pathname === item.path ? 'primary.main' : 'inherit',
                fontWeight: location.pathname === item.path ? 600 : 400,
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'white',
          borderBottom: '1px solid',
          borderColor: 'grey.200',
          color: 'text.primary',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              🏃‍♂️ SportsEvents
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              {navigationItems.map((item) => (
                <Button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  sx={{
                    color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                    fontWeight: location.pathname === item.path ? 600 : 400,
                    textTransform: 'none',
                    '&:hover': {
                      color: 'primary.main',
                      bgcolor: 'primary.50',
                    },
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </Box>
          )}

          {/* Search Bar */}
          {!isMobile && (
            <Box component="form" onSubmit={handleSearch} sx={{ flexGrow: 1, maxWidth: 400, mx: 4 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search events, venues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: 'grey.500' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'grey.50',
                    '&:hover': {
                      bgcolor: 'grey.100',
                    },
                    '&.Mui-focused': {
                      bgcolor: 'white',
                    },
                  },
                }}
              />
            </Box>
          )}

          {/* Right Side Actions */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ color: 'text.primary' }}
              >
                <MenuIcon />
              </IconButton>
            )}

            {!isMobile && (
              <>
                <IconButton sx={{ color: 'text.secondary' }}>
                  <Badge badgeContent={3} color="secondary">
                    <Notifications />
                  </Badge>
                </IconButton>
                
                <IconButton
                  onClick={handleProfileMenuOpen}
                  sx={{ p: 0, ml: 1 }}
                >
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                    <Person />
                  </Avatar>
                </IconButton>
              </>
            )}
          </Box>
        </Toolbar>

        {/* Mobile Search */}
        {isMobile && (
          <Box sx={{ px: 2, pb: 2 }}>
            <Box component="form" onSubmit={handleSearch}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search events, venues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: 'grey.500' }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    bgcolor: 'grey.50',
                    '&:hover': {
                      bgcolor: 'grey.100',
                    },
                    '&.Mui-focused': {
                      bgcolor: 'white',
                    },
                  },
                }}
              />
            </Box>
          </Box>
        )}
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 250,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleProfileMenuClose}
        onClick={handleProfileMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleProfileMenuClose}>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>
          <Avatar /> My Events
        </MenuItem>
        <MenuItem onClick={handleProfileMenuClose}>
          <Avatar /> Settings
        </MenuItem>
      </Menu>
    </>
  );
};

export default Navigation;
