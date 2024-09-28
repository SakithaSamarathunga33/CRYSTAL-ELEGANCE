/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/suppliers/orders"; // Updated URL for supplier orders

function UpdateSupplier() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        SupOrderID: '',
        GID: '',        // Gem ID from Inventory
        InvID: '',      // Inventory ID
        SupID: '',      // Supplier ID
        quantity: '',   // Quantity
        status: 'Pending', // Default status
        description: '', // Optional description
    });
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${URL}/${id}`)
            .then(response => {
                setFormData(response.data);
            })
            .catch(error => {
                console.error("Error fetching supplier order:", error.response ? error.response.data : error.message);
            });
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${URL}/${id}`, formData);
            navigate('/admindashboard'); // Redirect after successful update
        } catch (error) {
            console.error("Error updating supplier order:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>Update Supplier Order</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="SupOrderID"
                    name="SupOrderID"
                    variant="outlined"
                    fullWidth
                    value={formData.SupOrderID}
                    onChange={handleChange}
                    margin="normal"
                    disabled
                />
                <TextField
                    label="Gem ID (GID)"
                    name="GID"
                    variant="outlined"
                    fullWidth
                    value={formData.GID}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    label="Inventory ID (InvID)"
                    name="InvID"
                    variant="outlined"
                    fullWidth
                    value={formData.InVID}
                    onChange={handleChange}
                    margin="normal"
                />
                <TextField
                    label="Supplier ID (SupID)"
                    name="SupID"
                    variant="outlined"
                    fullWidth
                    value={formData.SupID}
                    onChange={handleChange}
                    margin="normal"
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
                />
                <TextField
                    label="Status"
                    name="status"
                    variant="outlined"
                    fullWidth
                    value={formData.status}
                    onChange={handleChange}
                    margin="normal"
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
                    Update Supplier Order
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate('/admindashboard/supplier-management')} // Link back button to SupplierListDetails
                    sx={{ marginTop: 2, marginLeft: 2 }}
                >
                    Back
                </Button>
            </form>
        </Box>
    );
}

export default UpdateSupplier;
