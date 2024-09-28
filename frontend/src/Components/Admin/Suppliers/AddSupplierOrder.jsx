import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, MenuItem, Select, InputLabel, FormControl, Snackbar, Alert } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const URL = "http://localhost:4000/suppliers/orders";

function AddSupplierOrder() {
    const { supId } = useParams(); // Get the supplier ID from the URL
    const [formData, setFormData] = useState({
        SupOrderID: '', // This will be auto-generated
        GID: '',
        InvID: '',
        SupID: supId || '', // Pre-fill SupID with the supplier ID
        quantity: '',
        status: 'Pending',
        description: ''
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');
    const navigate = useNavigate();

    // Function to generate SupOrderID
    const generateSupOrderID = async () => {
        try {
            const response = await axios.get(`${URL}/nextOrderID`); // Call your API to get the next order ID
            return response.data.nextOrderID; // Adjust based on your API response
        } catch (error) {
            console.error("Error fetching SupOrderID:", error);
            return 'SO0001'; // Fallback in case of error
        }
    };

    useEffect(() => {
        const fetchSupOrderID = async () => {
            const id = await generateSupOrderID();
            setFormData(prevState => ({
                ...prevState,
                SupOrderID: id
            }));
        };
        fetchSupOrderID();
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(URL, formData);
            setSnackbarMessage('Order added successfully!');
            setSnackbarSeverity('success');
            setOpenSnackbar(true);
            navigate('/admindashboard/supplier-management'); // Redirect after successful submission
        } catch (error) {
            setSnackbarMessage('Error adding order: ' + (error.response?.data?.message || error.message));
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        }
    };

    // Function to handle closing the snackbar
    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h6" gutterBottom>Add Supplier Order</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="SupOrderID"
                    name="SupOrderID"
                    variant="outlined"
                    fullWidth
                    value={formData.SupOrderID} // This will be auto-generated
                    margin="normal"
                    disabled // Disable editing for SupOrderID
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
                    value={formData.SupID} // Already filled with supId
                    onChange={handleChange}
                    margin="normal"
                    required
                    disabled // Disable editing for SupID
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
                <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel>Status</InputLabel>
                    <Select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        label="Status"
                    >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Completed">Completed</MenuItem>
                        <MenuItem value="Cancelled">Cancelled</MenuItem>
                    </Select>
                </FormControl>
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
                    Add Order
                </Button>
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => navigate('/admindashboard/supplier-list-details')} // Link back button to SupplierListDetails
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

export default AddSupplierOrder;
