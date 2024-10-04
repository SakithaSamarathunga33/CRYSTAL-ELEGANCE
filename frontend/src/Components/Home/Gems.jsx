import React from 'react';
import { Grid, Card, CardMedia, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const gems = [
  { name: 'Sapphire', image: 'sapphire-image-url' },
  { name: 'Aquamarine', image: 'aquamarine-image-url' },
  { name: 'Topaz', image: 'topaz-image-url' },
  { name: 'Ruby', image: 'ruby-image-url' },
  { name: 'Opal', image: 'opal-image-url' },
  { name: 'Tourmaline', image: 'tourmaline-image-url' },
];

const Gems = () => {
  const navigate = useNavigate();

  const handleGemClick = () => {
    navigate('/appointment');
  };

  return (
    <div>
      <Navbar />
      <Typography variant="h4" align="center" gutterBottom>
        For all tastes and all desires
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {gems.map((gem, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card 
              onClick={handleGemClick} 
              sx={{
                cursor: 'pointer',
                position: 'relative', // Ensure relative positioning for layering
                '&:hover': { opacity: 0.8 },
                transition: '0.3s',
              }}
            >
              <CardMedia
                component="img"
                height="250"
                image={gem.image}
                alt={gem.name}
              />
              <Box 
                sx={{
                  position: 'absolute',
                  bottom: 0, // Position it at the bottom of the image
                  width: '100%',
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  textAlign: 'center',
                  padding: '10px 0', // Add padding to avoid overlap
                }}
              >
                <Typography variant="h6" color="white">
                  {gem.name}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Footer />
    </div>
  );
};

export default Gems;
