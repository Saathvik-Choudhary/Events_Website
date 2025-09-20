import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Paper,
  useTheme,
} from '@mui/material';
import {
  LocationOn,
  People,
  Star,
  Wifi,
  LocalParking,
  Restaurant,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useVenues } from '../hooks/useVenues';

const VenuesPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { data: venuesResponse, isLoading } = useVenues();
  const venues = venuesResponse?.content || [];

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography>Loading venues...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Sports Venues
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover amazing venues for your sports events
        </Typography>
      </Box>

      {/* Venues Grid */}
      <Grid container spacing={4}>
        {venues.map((venue) => (
          <Grid size={{ xs: 12, md: 6, lg: 4 }} key={venue.id}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'all 0.3s ease-in-out',
                borderRadius: 3,
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                },
              }}
              onClick={() => navigate(`/venues/${venue.id}`)}
            >
              <CardMedia
                component="img"
                height="200"
                image={venue.imageUrl || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'}
                alt={venue.name}
              />
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h6" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  {venue.name}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <LocationOn fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {venue.address}, {venue.city}
                  </Typography>
                </Box>

                {venue.capacity && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <People fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      Capacity: {venue.capacity} people
                    </Typography>
                  </Box>
                )}

                {venue.amenities && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      Amenities:
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {venue.amenities.split(',').map((amenity, index) => (
                        <Chip
                          key={index}
                          label={amenity.trim()}
                          size="small"
                          variant="outlined"
                        />
                      ))}
                    </Box>
                  </Box>
                )}

                <Button
                  variant="contained"
                  fullWidth
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/venues/${venue.id}`);
                  }}
                  sx={{
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: '1rem',
                    borderRadius: 2,
                  }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default VenuesPage;