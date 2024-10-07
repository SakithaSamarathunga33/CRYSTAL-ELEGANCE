import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGem, faUsers, faBoxOpen, faTruck, faShoppingCart, faComments, faRing } from '@fortawesome/free-solid-svg-icons';
import backgroundImage from '../Images/s2.jpg'; // Adjust the path to your local image



export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jewelleryCount: 0,
      gemCount: 0,
      employeeCount: 0,
      inventoryCount: 0, // Initialize inventory count to 0
      supplierCount: 0, // Fake data for suppliers
      orderCount: 1, // Fake data for orders
      feedbackCount: 0, // Fake data for feedback
      userCount: 0, // User count state
    };
  }

  componentDidMount() {
    this.fetchJewelleryCount(); // Fetch the real jewellery count
    this.fetchGemCount(); // Fetch the real gem count
    this.fetchUserCount(); // Fetch the real user count
    this.fetchEmployeeCount(); // Fetch the real employee count
    this.fetchInventoryCount(); // Fetch the real inventory count
    this.fetchSupplierCount(); // Fetch the fake supplier count
    this.fetchOrderCount(); // Fetch the fake order count
    this.fetchFeedbackCount(); // Fetch the fake feedback count

    // Simulate real-time updates (example, every 10 seconds)
    this.interval = setInterval(() => {
      this.simulateRealTimeUpdates();
      this.fetchGemCount(); // Refresh gem count
      this.fetchUserCount(); // Refresh user count
      this.fetchEmployeeCount(); // Refresh employee count
      this.fetchInventoryCount(); // Refresh inventory count
      this.fetchSupplierCount(); // Refresh supplier count
      this.fetchOrderCount(); // Refresh order count
      this.fetchFeedbackCount(); // Refresh feedback count
    }, 10000);
  }

  componentWillUnmount() {
    clearInterval(this.interval); // Clear interval on component unmount
  }

  // Fetch the jewellery count from the server
  fetchJewelleryCount = async () => {
    try {
      const response = await axios.get('http://localhost:4000/jewellery');
      this.setState({ jewelleryCount: response.data.length });
    } catch (error) {
      console.error("Error fetching jewellery count:", error);
    }
  };

  // Fetch the gem count from the server
  fetchGemCount = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/gems'); // Ensure this points to your gems endpoint
      this.setState({ gemCount: response.data.length });
    } catch (error) {
      console.error("Error fetching gem count:", error);
    }
  };

  // Fetch the user count from the server
  fetchUserCount = async () => {
    try {
      const response = await axios.get('http://localhost:4000/users'); // Ensure this points to your users endpoint
      this.setState({ userCount: response.data.length });
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  };

  // Fetch the employee count from the server
  fetchEmployeeCount = async () => {
    try {
      const response = await axios.get('http://localhost:4000/employees'); // Ensure this points to your employees endpoint
      this.setState({ employeeCount: response.data.length }); // Set the employee count based on the retrieved data
    } catch (error) {
      console.error("Error fetching employee count:", error);
    }
  };

  // Fetch the inventory count from the server
  fetchInventoryCount = async () => {
    try {
      const response = await axios.get('http://localhost:4000/inventory'); // Ensure this points to your inventory endpoint
      this.setState({ inventoryCount: response.data.length }); // Set the inventory count based on the retrieved data
    } catch (error) {
      console.error("Error fetching inventory count:", error);
    }
  };
  fetchSupplierCount = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/suppliers'); // Ensure this points to your suppliers endpoint
      this.setState({ supplierCount: response.data.length }); // Set the supplier count based on the retrieved data
    } catch (error) {
      console.error("Error fetching supplier count:", error);
    }
  };
  fetchOrderCount = async () => {
    try {
      const response = await axios.get('http://localhost:4000/orders'); // Ensure this points to your orders endpoint
      this.setState({ orderCount: response.data.length }); // Set the order count based on the retrieved data
    } catch (error) {
      console.error("Error fetching order count:", error);
    }
  };
  fetchFeedbackCount = async () => {
    try {
      const response = await axios.get('http://localhost:4000/feedback'); // Ensure this points to your feedbacks endpoint
      this.setState({ feedbackCount: response.data.length }); // Set the feedback count based on the retrieved data
    } catch (error) {
      console.error("Error fetching feedback count:", error);
    }
  };

  // Simulate real-time updates for other counts (fake example)
  simulateRealTimeUpdates = () => {
    this.setState((prevState) => ({
      supplierCount: prevState.supplierCount + Math.floor(Math.random() * 1),
      orderCount: prevState.orderCount + Math.floor(Math.random() * 4),
      feedbackCount: prevState.feedbackCount + Math.floor(Math.random() * 1),
    }));
  };

  render() {
    const {
      jewelleryCount,
      gemCount,
      employeeCount,
      inventoryCount,
      supplierCount,
      orderCount,
      feedbackCount,
      userCount,
    } = this.state;

    return (
      <Box 
        sx={{
          padding: 4,
          minHeight: '100vh',
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: 'bold', color: '#333', textShadow: '1px 1px 3px rgba(255, 255, 255, 0.7)' }}>Admin Dashboard</Typography>
        <Grid container spacing={3}>
          {/* User Count */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#bbdefb', boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <FontAwesomeIcon icon={faUsers} size="3x" color="#1976d2" />
                <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold' }}>Users</Typography>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1976d2' }}>{userCount}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Jewellery Items */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#f9c2ff', boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <FontAwesomeIcon icon={faRing} size="3x" color="#6a1b9a" />
                <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold' }}>Jewellery Items</Typography>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#6a1b9a' }}>{jewelleryCount}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Gems */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#bbdefb', boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <FontAwesomeIcon icon={faGem} size="3x" color="#1976d2" />
                <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold' }}>Gems</Typography>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#1976d2' }}>{gemCount}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Employees */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#c8e6c9', boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <FontAwesomeIcon icon={faUsers} size="3x" color="#388e3c" />
                <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold' }}>Employees</Typography>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#388e3c' }}>{employeeCount}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Inventory Items */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#ffe0b2', boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <FontAwesomeIcon icon={faBoxOpen} size="3x" color="#ff9800" />
                <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold' }}>Inventory Items</Typography>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#ff9800' }}>{inventoryCount}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Suppliers */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#ffeaa7', boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <FontAwesomeIcon icon={faTruck} size="3x" color="#fbc02d" />
                <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold' }}>Suppliers</Typography>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#fbc02d' }}>{supplierCount}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Orders */}
          <Grid item xs={12} sm={6} md={4}>
            <Card sx={{ backgroundColor: '#ffccbc', boxShadow: 3, borderRadius: 2 }}>
              <CardContent>
                <FontAwesomeIcon icon={faShoppingCart} size="3x" color="#e64a19" />
                <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold' }}>Orders</Typography>
                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#e64a19' }}>{orderCount}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Feedbacks */}
            <Grid item xs={12} sm={6} md={4}>
             <Card sx={{ backgroundColor: '#d1c4e9', boxShadow: 3, borderRadius: 2 }}> {/* Change background color */}
              <CardContent>
               <FontAwesomeIcon icon={faComments} size="3x" color="#6a1b9a" /> {/* Change icon color */}
               <Typography variant="h6" sx={{ marginTop: 2, fontWeight: 'bold', color: '#6a1b9a' }}>Feedbacks</Typography> {/* Change text color */}
               <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#4a148c' }}>{feedbackCount}</Typography> {/* Change text color */}
              </CardContent>
             </Card>
            </Grid>
        </Grid>
      </Box>
    );
  }
}
