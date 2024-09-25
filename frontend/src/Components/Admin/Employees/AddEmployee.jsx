/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/jewellery"; // Update to the correct URL for adding jewellery

const categories = [
  { name: 'Rings', subcategories: ['Engagement Rings', 'Wedding Bands', 'Fashion Rings'] },
  { name: 'Necklaces', subcategories: ['Pendants', 'Chains', 'Chokers'] },
  { name: 'Bracelets', subcategories: ['Bangles', 'Cuff Bracelets', 'Charm Bracelets'] },
  { name: 'Earrings', subcategories: ['Studs', 'Hoops', 'Dangles'] },
  { name: 'Watches', subcategories: [] },
  { name: 'Anklets', subcategories: [] }
];

function AddJewellery({ onBack }) {
  const [jewellery, setJewellery] = useState({
    JID: '',
    name: '',
    price: 0,
    quantity: 0,
    status: '',
    image: '',
    description: '',
    category: '',
    subcategory: ''
  });
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJewellery({ ...jewellery, [name]: value });
    
    // Update subcategories when category changes
    if (name === 'category') {
      const selectedCategory = categories.find(cat => cat.name === value);
      setSubcategories(selectedCategory ? selectedCategory.subcategories : []);
      setJewellery({ ...jewellery, subcategory: '' }); // Reset subcategory
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state
    setLoading(true); // Set loading state

    try {
      await axios.post(URL, jewellery);
      alert('Jewellery added successfully');
      navigate('/admindashboard/jewellery-details'); // Update to your actual route
    } catch (error) {
      setError(error.response ? error.response.data.message : 'An error occurred');
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: 'white', borderRadius: 1, boxShadow: 2 }}>
      <Typography variant="h5" gutterBottom>
        Add New Jewellery
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          name="name"
          value={jewellery.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
          sx={{ borderRadius: 1 }}
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={jewellery.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
          sx={{ borderRadius: 1 }}
        />
        <TextField
          label="Quantity"
          name="quantity"
          type="number"
          value={jewellery.quantity}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          required
          sx={{ borderRadius: 1 }}
        />
        <FormControl fullWidth margin="normal" variant="outlined" required>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={jewellery.category}
            onChange={handleChange}
            label="Category"
          >
            {categories.map(cat => (
              <MenuItem key={cat.name} value={cat.name}>{cat.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth margin="normal" variant="outlined" required>
          <InputLabel>Subcategory</InputLabel>
          <Select
            name="subcategory"
            value={jewellery.subcategory}
            onChange={handleChange}
            label="Subcategory"
          >
            {subcategories.map(subcat => (
              <MenuItem key={subcat} value={subcat}>{subcat}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Image URL"
          name="image"
          value={jewellery.image}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Description"
          name="description"
          value={jewellery.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
        />
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Add Jewellery'}
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

export default AddJewellery;
