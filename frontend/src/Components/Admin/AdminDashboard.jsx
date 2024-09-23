import React, { useState, useEffect, useContext } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Box, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import InventoryIcon from '@mui/icons-material/Inventory';
import BusinessIcon from '@mui/icons-material/Business';
import EventIcon from '@mui/icons-material/Event';
import FeedbackIcon from '@mui/icons-material/Feedback';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { AuthContext } from '../Auth/AuthContext'; // Import your AuthContext

const drawerWidth = 240;

function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext); // Access logout function from AuthContext

  const [currentTab, setCurrentTab] = useState('');
  const [showSampleButton, setShowSampleButton] = useState(false);

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admindashboard' },
    { text: 'User Management', icon: <PeopleIcon />, path: '/admindashboard/user-management' },
    { text: 'Jewellery Management', icon: <AssignmentIcon />, path: '/admindashboard/jewellery-management' },
    { text: 'Gem Management', icon: <AssignmentIcon />, path: '/admindashboard/gem-management' }, // Added Gem Management
    { text: 'Inventory Management', icon: <InventoryIcon />, path: '/admindashboard/inventory-management' },
    { text: 'Employee Management', icon: <PeopleIcon />, path: '/admindashboard/employee-management' },
    { text: 'Supplier Management', icon: <BusinessIcon />, path: '/admindashboard/supplier-management' },
    { text: 'Appointment Management', icon: <EventIcon />, path: '/admindashboard/appointment-management' },
    { text: 'Order Management', icon: <ShoppingCartIcon />, path: '/admindashboard/order-management' },
    { text: 'Feedback Management', icon: <FeedbackIcon />, path: '/admindashboard/feedback-management' },
    { text: 'Support Management', icon: <SupportAgentIcon />, path: '/admindashboard/support-management' },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = menuItems.find(item => item.path === currentPath);
    if (currentItem) {
      setCurrentTab(currentItem.text);
      setShowSampleButton(currentItem.text === 'Jewellery Management'); // Show button only for Jewellery Management
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout(); // Call logout function from AuthContext
    navigate('/login'); // Redirect to login page or home page
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index} onClick={() => handleMenuClick(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0, // Remove padding
          backgroundColor: '#f4f6f8',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1976d2', padding: '10px 20px', color: 'white', height: '60px' }}>
          <Typography variant="h5">{currentTab}</Typography>
          <div>
            {showSampleButton && (
              <Button variant="contained" color="secondary" sx={{ marginLeft: 2 }}>
                Sample Button
              </Button>
            )}
            <Button variant="outlined" onClick={handleLogout} sx={{ marginLeft: 2, color: 'white', borderColor: 'white' }}>
              Logout
            </Button>
          </div>
        </Box>
        <Outlet /> {/* Render nested routes */}
      </Box>
    </Box>
  );
}

export default AdminDashboard;
