/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, TextField, Button, Paper, IconButton } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/api/suppliers";

function UpdateSupplier() {
  const { supId } = useParams(); // Get the supplier ID from the URL
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const response = await axios.get(`${URL}/${supId}`);
        setSupplier(response.data);
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
    setSupplier((prevSupplier) => ({
      ...prevSupplier,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${URL}/${supId}`, supplier);
      navigate('/admindashboard/supplier-management'); // Redirect to the supplier list after update
    } catch (error) {
      setError('Error updating supplier.');
    }
  };

  const handleBack = () => {
    navigate('/admindashboard/supplier-management'); // Navigate back to the supplier list
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography>Error: {error}</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Update Supplier
        </Typography>
        <IconButton onClick={handleBack} sx={{ color: 'primary.main' }}>
          <ArrowBack />
        </IconButton>
        <form onSubmit={handleUpdate}>
          <TextField
            label="Supplier Name"
            name="SupName"
            value={supplier.SupName}
            onChange={handleChange}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Items (comma-separated)"
            name="items"
            value={supplier.items.join(', ')}
            onChange={handleChange}
            fullWidth
            required
            sx={{ marginBottom: 2 }}
          />
          <TextField
            label="Description"
            name="description"
            value={supplier.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            sx={{ marginBottom: 2 }}
          />
          <Button variant="contained" color="primary" type="submit">
            Update Supplier
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default UpdateSupplier;
