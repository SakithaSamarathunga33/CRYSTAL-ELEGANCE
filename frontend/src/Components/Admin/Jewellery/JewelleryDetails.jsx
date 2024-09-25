/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Card, CardContent, CardMedia, Typography, IconButton, Grid, TextField, Paper } from '@mui/material';
import { Edit, Delete, Print, Add } from '@mui/icons-material';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import AddJewellery from './AddJewellery';
import { useNavigate } from 'react-router-dom';

const URL = "http://localhost:4000/jewellery";

const fetchJewellery = async () => {
  try {
    const response = await axios.get(URL);
    return Array.isArray(response.data) ? response.data : [response.data];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const shortenDescription = (description) => {
  const words = description.split(' ');
  return words.length > 3 ? words.slice(0, 3).join(' ') + '...' : description;
};

function JewelleryDetails() {
  const [jewellery, setJewellery] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [noResults, setNoResults] = useState(false);
  const [showAddJewelleryForm, setShowAddJewelleryForm] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchJewellery().then(data => {
      setJewellery(data);
    }).catch(error => {
      console.error("Error fetching jewellery:", error);
    });
  }, []);

  const handleEdit = (id) => {
    navigate(`/admindashboard/update-jewellery/${id}`);
  };

  const deleteJewellery = async (id) => {
    try {
      console.log(`Attempting to delete jewellery with ID: ${id}`);
      const response = await axios.delete(`${URL}/${id}`);
      
      console.log('Delete response:', response);
      
      if (response.status === 204) {
        console.log(`Successfully deleted jewellery with ID: ${id}`);
        setJewellery(prev => prev.filter(item => item._id !== id));
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error deleting jewellery:", error.response ? error.response.data : error.message);
    }
  };

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.text("Jewellery Details Report", 10, 10);

    doc.autoTable({
      head: [['ID', 'Name', 'Price', 'Quantity', 'Status', 'Weight', 'Gold Standard']],
      body: jewellery.map(item => [
        item.JID, 
        item.name, 
        item.price, 
        item.quantity, 
        item.status, 
        item.weight, 
        item.goldStandard
      ]),
      startY: 20,
      margin: { top: 20 },
      styles: {
        overflow: 'linebreak',
        fontSize: 10,
      },
      headStyles: {
        fillColor: [0, 0, 0],
        textColor: [255, 255, 255],
      },
    });

    doc.save('jewellery-details.pdf');
  };

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      fetchJewellery().then(data => {
        setJewellery(data);
        setNoResults(false);
      }).catch(error => {
        console.error("Error fetching jewellery:", error);
      });
      return;
    }

    const filteredJewellery = jewellery.filter(item =>
      Object.values(item).some(field =>
        field && field.toString().toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setJewellery(filteredJewellery);
    setNoResults(filteredJewellery.length === 0);
  };

  const handleAddJewellery = () => {
    setShowAddJewelleryForm(true);
  };

  const handleBack = () => {
    setShowAddJewelleryForm(false);
  };

  return (
    <Box>
      {showAddJewelleryForm ? (
        <Box>
          <AddJewellery onBack={handleBack} />
        </Box>
      ) : (
        <>
          <Box sx={{ display: 'flex', gap: 2, marginBottom: 2, alignItems: 'center' }}>
            <TextField
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ flexShrink: 1, width: '200px', backgroundColor: 'white', borderRadius: 1 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSearch}
              sx={{ borderRadius: 2 }}
            >
              Search
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleAddJewellery}
              sx={{ borderRadius: 2, marginLeft: 'auto' }}
              startIcon={<Add />}
            >
              Add Jewellery
            </Button>
          </Box>

          <Grid container spacing={2}>
            {noResults ? (
              <Typography variant="h6" align="center" sx={{ width: '100%', marginTop: 2 }}>
                No jewellery found.
              </Typography>
            ) : (
              jewellery.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item._id}>
                  <Card sx={{ maxWidth: 345, margin: 'auto', border: '1px solid', borderColor: 'divider' }}>
                    <CardMedia
                      component="img"
                      height="140"
                      image={item.image || 'default-image-path'}
                      alt={item.name}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {shortenDescription(item.description || 'No Description')}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">Price: {item.price}</Typography>
                      <Typography variant="body2" color="text.secondary">Quantity: {item.quantity}</Typography>
                      <Typography variant="body2" color="text.secondary">Status: {item.status}</Typography>
                      <Typography variant="body2" color="text.secondary">Weight: {item.weight}</Typography>
                      <Typography variant="body2" color="text.secondary">Gold Standard: {item.goldStandard}</Typography>
                    </CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: 1 }}>
                      <IconButton onClick={() => handleEdit(item._id)} sx={{ color: 'primary.main' }}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => deleteJewellery(item._id)} sx={{ color: 'error.main' }}>
                        <Delete />
                      </IconButton>
                    </Box>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>

          <Button
            variant="contained"
            color="primary"
            onClick={handlePDF}
            sx={{ marginTop: 2, borderRadius: 2 }}
          >
            <Print /> Download
          </Button>
        </>
      )}
    </Box>
  );
}

export default JewelleryDetails;
