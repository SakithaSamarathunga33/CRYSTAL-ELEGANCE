import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = "http://localhost:4000/inventory";

function PlaceOrder() {
  const [formData, setFormData] = useState({
    SupOrderID: '',
    GID: '',
    InvID: '', // This will be used in the URL
    SupID: '',
    quantity: '',
    status: 'Pending',
    description: ''
  });
  
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { InvID, ...orderData } = formData; // Extract InvID from formData and send the rest in the body
    
    try {
      await axios.post(`${API_BASE_URL}/${InvID}/place-order`, orderData); // Use InvID in the URL path
      setSnackbarMessage('Order placed successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      navigate('/admindashboard/supplier-management'); // Redirect after successful submission
    } catch (error) {
      setSnackbarMessage('Error placing order: ' + (error.response?.data?.message || error.message));
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h6" gutterBottom>Place Order</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="SupOrderID"
          name="SupOrderID"
          variant="outlined"
          fullWidth
          value={formData.SupOrderID}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          label="GID (Gem ID)"
          name="GID"
          variant="outlined"
          fullWidth
          value={formData.GID}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="InvID (Inventory ID)"
          name="InvID"
          variant="outlined"
          fullWidth
          value={formData.InvID}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="SupID (Supplier ID)"
          name="SupID"
          variant="outlined"
          fullWidth
          value={formData.SupID}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Quantity"
          name="quantity"
          type="number"
          variant="outlined"
          fullWidth
          value={formData.quantity}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          label="Description"
          name="description"
          variant="outlined"
          fullWidth
          value={formData.description}
          onChange={handleChange}
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Place Order
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => navigate('/admindashboard/inventory-management')} // Link back button
          sx={{ marginTop: 2, marginLeft: 2 }}
        >
          Back
        </Button>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default PlaceOrder;
