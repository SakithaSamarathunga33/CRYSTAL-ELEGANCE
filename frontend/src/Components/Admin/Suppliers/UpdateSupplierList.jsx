/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, Snackbar, Alert, Paper, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/api/suppliers";

function UpdateSupplier() {
  const { supId } = useParams(); // Get the supplier ID from the URL
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    SupName: '',
    items: '',
    description: ''
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(`${URL}/${supId}`);
        const { SupName, items, description } = response.data;
        setFormData({
          SupName,
          items: items.join(', '), // Convert items array to comma-separated string
          description
        });
        setLoading(false);
      } catch (error) {
        setError('Error fetching supplier data.');
        setLoading(false);
      }
    };

    fetchSupplier();
  }, [supId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const itemsArray = formData.items.split(',').map(item => item.trim()); // Convert items string to array
      const response = await axios.put(`${URL}/${supId}`, {
        ...formData,
        items: itemsArray
      });
      setSnackbarMessage('Supplier updated successfully');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      setTimeout(() => navigate('/admindashboard/supplier-list-details'), 2000);
    } catch (error) {
      setSnackbarMessage('Error updating supplier: ' + (error.response ? error.response.data.message : error.message));
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleBack = () => {
    navigate('/admindashboard/supplier-list-details'); // Navigate back to the supplier list
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>Update Supplier</Typography>
        
        <form onSubmit={handleSubmit}>
          <TextField
            label="Supplier Name"
            name="SupName"
            value={formData.SupName}
            onChange={handleChange}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Items (comma-separated)"
            name="items"
            value={formData.items} // Display as comma-separated string
            onChange={handleChange}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" color="primary" type="submit" sx={{ marginTop: 2 }}>
            Update Supplier
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleBack}
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
      </Paper>
    </Box>
  );
}

export default UpdateSupplier;
