/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // If using React Router v6
import { Box, Button, Container, Grid, Typography, Paper, Avatar, TextField, IconButton, CircularProgress } from '@mui/material';
import { Edit, Lock, Delete, Logout, ArrowBack } from '@mui/icons-material';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { AuthContext } from '../Auth/AuthContext';
import axios from 'axios';

function UserProfile() {
    const { authState, logout } = useContext(AuthContext);
    const { user, token } = authState;
    const navigate = useNavigate(); // If using React Router v6
    const [editing, setEditing] = useState(false);
    const [updatedUser, setUpdatedUser] = useState({
        userName: '',
        name: '',
        email: '',
        phone: '',
        password: '',
        type: ''
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            if (user && user.userId && token) {
                try {
                    const response = await axios.get(`http://localhost:4000/users/${user.userId}`, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    setUpdatedUser(response.data);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setError('Error fetching user data. Please log in again.');
                    setLoading(false);
                    // Handle token expiration or invalid token
                    if (error.response && error.response.status === 401) {
                        logout(); // Clear user data in context
                        navigate('/login'); // Redirect to login page
                    }
                }
            } else {
                // No user or token available
                navigate('/login'); // Redirect to login page
            }
        };

        fetchUser();
    }, [user, token, logout, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedUser(prevState => ({ ...prevState, [name]: value }));
    };

    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:4000/users/${user.userId}`, updatedUser, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            alert('Profile updated successfully');
            setEditing(false);
        } catch (error) {
            console.error("Error updating profile:", error);
            setError('Error updating profile. Please try again later.');
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
            try {
                await axios.delete(`http://localhost:4000/users/${user.userId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                alert('Profile deleted successfully');
                logout(); // Clear user data in context
                navigate('/login'); // Redirect to login page
            } catch (error) {
                console.error("Error deleting profile:", error);
                setError('Error deleting profile. Please try again later.');
            }
        }
    };

    const handleLogout = () => {
        logout(); // Clear user data in context
        navigate('/login'); // Redirect to login page
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box 
            sx={{ 
                backgroundImage: 'url("https://images.pexels.com/photos/1103970/pexels-photo-1103970.jpeg?cs=srgb&dl=pexels-jplenio-1103970.jpg&fm=jpg")', // Replace with your image URL
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                paddingBottom: 10 // Padding to prevent footer overlap
            }}
        >
            <Navbar />
            <Container sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', paddingY: 7 }}>
                <Paper
                    elevation={10}
                    sx={{
                        padding: 4,
                        borderRadius: 2,
                        maxWidth: 900,
                        width: '100%',
                        display: 'flex',
                        height: '100%',
                        backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent white background
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
                    }}
                >
                    <Grid container sx={{ height: '100%' }}>
                        {/* Left side: Avatar and Buttons */}
                        <Grid 
                            item 
                            xs={12} 
                            sm={4} 
                            sx={{ 
                                display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                backgroundColor: '#FFD1D1', 
                                height: '100%',
                                padding: 3 
                            }}
                        >
                            <Avatar
                                src={user.image}
                                alt={user.name}
                                sx={{ width: 120, height: 120, marginBottom: 2, border: '4px solid #FF6F61', boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' }}
                            />
                            {!editing && (
                                <>
                                    <Button
                                        variant="contained"
                                        startIcon={<Edit />}
                                        fullWidth
                                        sx={{ marginBottom: 2, backgroundColor: '#FF6F61', color: '#ffffff', textTransform: 'none', '&:hover': { backgroundColor: '#FF4F45' }}}
                                        onClick={() => setEditing(true)}
                                    >
                                        Edit Account
                                    </Button>
                                    <Button
                                        variant="contained"
                                        startIcon={<Lock />}
                                        fullWidth
                                        sx={{ marginBottom: 2, backgroundColor: '#FF6F61', color: '#ffffff', textTransform: 'none', '&:hover': { backgroundColor: '#FF4F45' }}}
                                    >
                                        Change Password
                                    </Button>
                                    <Button
                                        variant="contained"
                                        startIcon={<Delete />}
                                        fullWidth
                                        sx={{ marginBottom: 2, backgroundColor: '#FF6F61', color: '#ffffff', textTransform: 'none', '&:hover': { backgroundColor: '#FF4F45' }}}
                                        onClick={handleDelete}
                                    >
                                        Delete Account
                                    </Button>
                                    <Button
                                        variant="contained"
                                        startIcon={<Logout />}
                                        fullWidth
                                        sx={{ backgroundColor: '#FF6F61', color: '#ffffff', textTransform: 'none', '&:hover': { backgroundColor: '#FF4F45' }}}
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </Button>
                                </>
                            )}
                        </Grid>

                        {/* Right side: Account Information */}
                        <Grid item xs={12} sm={8} sx={{ paddingLeft: 3 }}>
                            {editing ? (
                                <>
                                    <IconButton onClick={() => setEditing(false)} sx={{ marginBottom: 2 }}>
                                        <ArrowBack />
                                    </IconButton>
                                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#FF6F61' }}>
                                        Edit Profile
                                    </Typography>
                                    {error && <Typography color="error">{error}</Typography>}
                                    <TextField
                                        label="Username"
                                        name="userName"
                                        value={updatedUser.userName}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        sx={{ backgroundColor: '#F8DADA' }} // Light background for input fields
                                    />
                                    <TextField
                                        label="Name"
                                        name="name"
                                        value={updatedUser.name}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        sx={{ backgroundColor: '#F8DADA' }}
                                    />
                                    <TextField
                                        label="Email"
                                        name="email"
                                        value={updatedUser.email}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        sx={{ backgroundColor: '#F8DADA' }}
                                    />
                                    <TextField
                                        label="Phone"
                                        name="phone"
                                        value={updatedUser.phone}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        sx={{ backgroundColor: '#F8DADA' }}
                                    />
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleUpdate}
                                        sx={{ marginTop: 2 }}
                                    >
                                        Save Changes
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        onClick={() => setEditing(false)}
                                        sx={{ marginTop: 2, marginLeft: 2 }}
                                    >
                                        Cancel
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#FF6F61' }}>
                                        MY ACCOUNT
                                    </Typography>
                                    <Typography variant="body1" sx={{ marginBottom: 2 }}>
                                        <strong>Name:</strong> {user.name}
                                    </Typography>
                                    <Typography variant="body1" sx={{ marginBottom: 2 }}>
                                        <strong>Email:</strong> {user.email}
                                    </Typography>
                                    <Typography variant="body1" sx={{ marginBottom: 2 }}>
                                        <strong>Phone:</strong> {user.phone}
                                    </Typography>
                                </>
                            )}
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
            <Footer />
        </Box>
    );
}

export default UserProfile;
