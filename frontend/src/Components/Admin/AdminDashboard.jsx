import React, { useState, useEffect, useContext } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, CssBaseline, Box, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faGem, faBoxOpen, faClipboardList, faComments, faShoppingCart, faSignOutAlt, faHeadset, faRing, faTruck } from '@fortawesome/free-solid-svg-icons';

const drawerWidth = 240;

function AdminDashboard() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const [currentTab, setCurrentTab] = useState('');
  const [showSampleButton, setShowSampleButton] = useState(false);
  const [showEmployeeButton, setShowEmployeeButton] = useState(false); // State for Employee Management button

  const menuItems = [
    { text: 'Dashboard', icon: <FontAwesomeIcon icon={faTachometerAlt} />, path: '/admindashboard' },
    { text: 'User Management', icon: <FontAwesomeIcon icon={faUsers} />, path: '/admindashboard/user-management' },
    { text: 'Jewellery Management', icon: <FontAwesomeIcon icon={faRing} />, path: '/admindashboard/jewellery-management' },
    { text: 'Gem Management', icon: <FontAwesomeIcon icon={faGem} />, path: '/admindashboard/gem-management' },
    { text: 'Inventory Management', icon: <FontAwesomeIcon icon={faBoxOpen} />, path: '/admindashboard/inventory-management' },
    { text: 'Employee Management', icon: <FontAwesomeIcon icon={faUsers} />, path: '/admindashboard/employee-management' },
    { text: 'Supplier Management', icon: <FontAwesomeIcon icon={faTruck} />, path: '/admindashboard/supplier-management' },
    { text: 'Appointment Management', icon: <FontAwesomeIcon icon={faClipboardList} />, path: '/admindashboard/appointment-management' },
    { text: 'Order Management', icon: <FontAwesomeIcon icon={faShoppingCart} />, path: '/admindashboard/order-management' },
    { text: 'Feedback Management', icon: <FontAwesomeIcon icon={faComments} />, path: '/admindashboard/feedback-management' },
    { text: 'Support Management', icon: <FontAwesomeIcon icon={faHeadset} />, path: '/admindashboard/support-management' },
  ];

  useEffect(() => {
    const currentPath = location.pathname;
    const currentItem = menuItems.find(item => item.path === currentPath);
    if (currentItem) {
      setCurrentTab(currentItem.text);
      setShowSampleButton(currentItem.text === 'Jewellery Management'); // Show button only for Jewellery Management
      setShowEmployeeButton(currentItem.text === 'Employee Management'); // Show button only for Employee Management
    }
  }, [location.pathname]);

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleSampleButtonClick = () => {
    navigate('/admindashboard/jewellery-details'); // Navigate to the Jewellery Details page
  };

  const handleEmployeeButtonClick = () => {
    navigate('/admindashboard/employee-details'); // Navigate to the Employee Details page
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
              <Button variant="contained" color="secondary" sx={{ marginLeft: 2 }} onClick={handleSampleButtonClick}>
                View Jewellery Details
              </Button>
            )}
            {showEmployeeButton && ( // New button for Employee Management
              <Button variant="contained" color="secondary" sx={{ marginLeft: 2 }} onClick={handleEmployeeButtonClick}>
                View Employee Details
              </Button>
            )}
            <Button variant="outlined" onClick={handleLogout} sx={{ marginLeft: 2, color: 'white', borderColor: 'white' }}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </Button>
          </div>
        </Box>
        <Outlet /> {/* Render nested routes */}
      </Box>
    </Box>
  );
}

export default AdminDashboard;
