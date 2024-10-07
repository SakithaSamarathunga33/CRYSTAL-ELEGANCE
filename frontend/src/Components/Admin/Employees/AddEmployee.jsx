/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/employees/create";

function AddEmployee({ onBack }) {
  const [employee, setEmployee] = useState({
    EMPID: '',
    name: '',
    email: '',
    position: '',
    phone: '',
    address: '',

    salary: ''
  });
  const [error, setError] = useState(null);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

    salary: '' // Ensure you have this field in the state
  });
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(''); // State to hold email error message

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value });


    if (name === 'name') setNameError('');
    if (name === 'email') setEmailError('');
    if (name === 'phone') setPhoneError('');
  };

  const validateName = (name) => {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);

  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email validation regex
    return emailRegex.test(email);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);
    setNameError('');
    setEmailError('');
    setPhoneError('');

    if (!validateName(employee.name)) {
      setNameError('Name cannot contain numbers or special characters');
      return;
    }

    if (!validateEmail(employee.email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    if (!validatePhone(employee.phone)) {
      setPhoneError('Phone number must be exactly 10 digits and contain only numbers');
      return;

    setError(null); // Reset error state
    setEmailError(''); // Reset email error state

    // Check for email validation
    if (!validateEmail(employee.email)) {
      setEmailError('Please enter a valid email address');
      return; // Stop form submission if email is invalid

    }

    try {
      await axios.post(URL, employee);
      alert('Employee added successfully');
      navigate('/admindashboard/employee-details');
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
    }
  };

  return (

    <Box
      sx={{
        width: '100%',
        height: '100vh',
        margin: 0, // Remove default margin
        padding: 0, // Remove default padding
        backgroundSize: 'cover', // Ensure the image covers the entire background
        
        backgroundRepeat: 'no-repeat', // Prevent the image from repeating
        backgroundPosition: 'center', // Center the background image
        display: 'flex',
        alignItems: 'center', // Center content vertically
        justifyContent: 'center', // Center content horizontally
      }}
    >
      <Box
        sx={{
          padding: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.7)', // Adjusted transparency of the form background
          borderRadius: 1,
          width: '40%', // Adjust as needed for your design
          boxSizing: 'border-box',
          display: 'flex', // Use flexbox to allow for proper alignment
          flexDirection: 'column', // Stack the children vertically
          alignItems: 'center', // Center items horizontally
        }}
      >
        <Typography variant="h5" gutterBottom>Add New Employee</Typography><br></br>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}> {/* Ensure form takes full width */}
          <TextField
            label="Name"
            name="name"
            value={employee.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!nameError}
            helperText={nameError}
          />
          <TextField
            label="Email"
            name="email"
            value={employee.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!emailError}
            helperText={emailError}
          />
          
          <FormControl fullWidth margin="normal">
            <InputLabel id="position-label">Position</InputLabel>
            <Select
              labelId="position-label"
              name="position"
              value={employee.position}
              onChange={handleChange}
              fullWidth
              variant="outlined"
            >
              <MenuItem value="Senior Manager">Senior Manager</MenuItem>
              <MenuItem value="Junior Manager">Junior Manager</MenuItem>
              <MenuItem value="Trainee">Trainee</MenuItem>
              <MenuItem value="Software Engineer">Software Engineer</MenuItem>
              <MenuItem value="Web Developer">Web Developer</MenuItem>
              <MenuItem value="Jewelry Designer">Jewelry Designer</MenuItem>
              <MenuItem value="Project Coordinator">Project Coordinator</MenuItem>
              <MenuItem value="Marketing Executive">Marketing Executive</MenuItem>
              <MenuItem value="Sales Representative">Sales Representative</MenuItem>
              <MenuItem value="Photographer/Content Creator">Photographer/Content Creator</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Phone"
            name="phone"
            value={employee.phone}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!phoneError}
            helperText={phoneError}
          />
          <TextField
            label="Address"
            name="address"
            value={employee.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Salary"
            name="salary"
            type="number"
            value={employee.salary}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            sx={{ borderRadius: 1 }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: 4, // Add some top margin for separation
            }}
          ><br></br>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ width: '200px' }} // Set a fixed width for the button
            >
              Add Employee
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={onBack}
              sx={{ width: '200px', marginLeft: 16 }} // Add marginLeft for spacing
            >
              Back
            </Button>
          </Box>

          {error && (
            <Typography color="error" sx={{ marginTop: 2 }}>
              {error}
            </Typography>
          )}
        </form>
      </Box>

    <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1 }}>
      <Typography variant="h5" gutterBottom>
        Add New Employee
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={employee.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!emailError} // Show error state if email is invalid
          helperText={emailError} // Display email error message
        />
        
        <FormControl fullWidth margin="normal">
          <InputLabel id="position-label">Position</InputLabel>
          <Select
            labelId="position-label"
            name="position"
            value={employee.position}
            onChange={handleChange}
            fullWidth
            variant="outlined"
          >
            <MenuItem value="Senior Manager">Senior Manager</MenuItem>
            <MenuItem value="Junior Manager">Junior Manager</MenuItem>
            <MenuItem value="Trainee">Trainee</MenuItem>
            <MenuItem value="Software Engineer">Software Engineer</MenuItem>
            <MenuItem value="Business Analyst">Business Analyst</MenuItem>
            <MenuItem value="Human Resources Specialist">Human Resources Specialist</MenuItem>
            <MenuItem value="Project Coordinator">Project Coordinator</MenuItem>
            <MenuItem value="Marketing Executive">Marketing Executive</MenuItem>
            <MenuItem value="Sales Representative">Sales Representative</MenuItem>
            <MenuItem value="Administrative Assistant">Administrative Assistant</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="Phone"
          name="phone"
          value={employee.phone}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          name="address"
          value={employee.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Salary"
          name="salary"
          type="number" // Ensure it's a number
          value={employee.salary}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          sx={{ borderRadius: 1 }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Add Employee
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ marginTop: 2, marginLeft: 2 }}
          onClick={onBack}
        >
          Back
        </Button>
        {error && (
          <Typography color="error" sx={{ marginTop: 2 }}>
            {error}
          </Typography>
        )}
      </form>

    </Box>
  );
}


export default AddEmployee;



