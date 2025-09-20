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
} from '@mui/material';
import {
  Sports,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCategoriesWithActiveEvents } from '../hooks/useCategories';

const CategoriesPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: categories = [], isLoading } = useCategoriesWithActiveEvents();

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography>Loading categories...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Sports Categories
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Explore events by your favorite sports
        </Typography>
      </Box>

      {/* Categories Grid */}
      <Grid container spacing={4}>
        {categories.map((category) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={category.id}>
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
              onClick={() => navigate(`/events?category=${category.id}`)}
            >
              <CardMedia
                component="img"
                height="200"
                image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400"
                alt={category.name}
              />
              <CardContent sx={{ flexGrow: 1, p: 3, textAlign: 'center' }}>
                <Box
                  sx={{
                    width: 60,
                    height: 60,
                    bgcolor: 'primary.main',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mx: 'auto',
                    mb: 2,
                    color: 'white',
                  }}
                >
                  <Sports sx={{ fontSize: 30 }} />
                </Box>
                
                <Typography variant="h5" component="h3" gutterBottom sx={{ fontWeight: 600 }}>
                  {category.name}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  Explore exciting events in this category
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" color="primary" sx={{ fontWeight: 600 }}>
                      0
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Events
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" color="secondary.main" sx={{ fontWeight: 600 }}>
                      0
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Participants
                    </Typography>
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  fullWidth
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/events?category=${category.id}`);
                  }}
                  sx={{
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: '1rem',
                    borderRadius: 2,
                  }}
                >
                  View Events
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CategoriesPage;