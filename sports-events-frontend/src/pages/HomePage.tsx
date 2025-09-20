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
  Sports,
  TrendingUp,
  People,
  LocationOn,
  Event,
  CalendarToday,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useUpcomingEvents } from '../hooks/useEvents';
import { useCategoriesWithActiveEvents } from '../hooks/useCategories';

const HomePage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { data: upcomingEvents = [], isLoading: eventsLoading } = useUpcomingEvents();
  const { data: categories = [], isLoading: categoriesLoading } = useCategoriesWithActiveEvents();

  const stats = [
    { icon: <Sports />, label: 'Sports Events', value: '500+' },
    { icon: <People />, label: 'Active Users', value: '10K+' },
    { icon: <LocationOn />, label: 'Venues', value: '50+' },
    { icon: <TrendingUp />, label: 'Success Rate', value: '98%' },
  ];

  const featuredEvents = upcomingEvents.slice(0, 3);

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          py: { xs: 6, md: 12 },
          mb: 6,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.3,
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={6} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography 
                variant="h1" 
                component="h1" 
                gutterBottom
                className="animate-fade-in-up"
                sx={{
                  fontSize: { xs: '2.5rem', md: '3.5rem' },
                  fontWeight: 700,
                  lineHeight: 1.2,
                  mb: 3,
                }}
              >
                Discover Amazing Sports Events
              </Typography>
              <Typography 
                variant="h5" 
                className="animate-fade-in-up"
                sx={{ 
                  mb: 4, 
                  opacity: 0.9,
                  fontSize: { xs: '1.1rem', md: '1.25rem' },
                  lineHeight: 1.6,
                  animationDelay: '0.2s',
                }}
              >
                Join thousands of athletes and sports enthusiasts in exciting 
                competitions across the city. Find, book, and participate in 
                your favorite sports events.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/events')}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                      bgcolor: 'grey.100',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  Explore Events
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/venues')}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.2s ease-in-out',
                  }}
                >
                  Find Venues
                </Button>
              </Box>
              
              {/* Quick Stats */}
              <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                    500+
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Events
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                    10K+
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Participants
                  </Typography>
                </Box>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" sx={{ fontWeight: 700, mb: 0.5 }}>
                    50+
                  </Typography>
                  <Typography variant="body2" sx={{ opacity: 0.8 }}>
                    Venues
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  textAlign: 'center',
                  position: 'relative',
                  '& img': {
                    maxWidth: '100%',
                    height: 'auto',
                    borderRadius: 3,
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                  },
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop"
                  alt="Sports Events"
                  style={{ width: '100%', maxWidth: '500px' }}
                />
                {/* Floating elements */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    bgcolor: 'secondary.main',
                    color: 'white',
                    borderRadius: '50%',
                    width: 60,
                    height: 60,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  🏆
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: -20,
                    left: -20,
                    bgcolor: 'white',
                    color: 'primary.main',
                    borderRadius: '50%',
                    width: 50,
                    height: 50,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.2rem',
                    boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  ⚡
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* Stats Section */}
        <Box sx={{ mb: 8 }}>
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid size={{ xs: 6, md: 3 }} key={index}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    borderRadius: 2,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}
                >
                  <Box
                    sx={{
                      color: 'primary.main',
                      mb: 1,
                      '& svg': { fontSize: 40 },
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography variant="h4" component="div" gutterBottom>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Featured Events */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" component="h2" gutterBottom align="center">
            Featured Events
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
            Don't miss out on these exciting upcoming events
          </Typography>
          
          {eventsLoading ? (
            <Grid container spacing={3}>
              {[1, 2, 3].map((i) => (
                <Grid size={{ xs: 12, md: 4 }} key={i}>
                  <Card sx={{ height: '100%' }}>
                    <Box sx={{ height: 200, bgcolor: 'grey.200' }} />
                    <CardContent>
                      <Box sx={{ height: 20, bgcolor: 'grey.200', mb: 1 }} />
                      <Box sx={{ height: 16, bgcolor: 'grey.200', mb: 2 }} />
                      <Box sx={{ height: 14, bgcolor: 'grey.200' }} />
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={4}>
              {featuredEvents.map((event) => (
                <Grid size={{ xs: 12, md: 4 }} key={event.id}>
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
                    onClick={() => navigate(`/events/${event.id}`)}
                  >
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height="240"
                        image={event.imageUrl || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400'}
                        alt={event.title}
                        sx={{
                          transition: 'transform 0.3s ease-in-out',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          },
                        }}
                      />
                      {/* Overlay with category badge */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 16,
                          left: 16,
                          display: 'flex',
                          gap: 1,
                        }}
                      >
                        <Chip
                          label={event.category.name}
                          size="small"
                          sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.9)',
                            color: 'primary.main',
                            fontWeight: 600,
                            backdropFilter: 'blur(10px)',
                          }}
                        />
                        <Chip
                          label={event.eventType.replace('_', ' ')}
                          size="small"
                          sx={{
                            bgcolor: 'rgba(255, 255, 255, 0.9)',
                            color: 'secondary.main',
                            fontWeight: 600,
                            backdropFilter: 'blur(10px)',
                          }}
                        />
                      </Box>
                      
                      {/* Price badge */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 16,
                          right: 16,
                          bgcolor: 'primary.main',
                          color: 'white',
                          px: 2,
                          py: 1,
                          borderRadius: 2,
                          fontWeight: 600,
                        }}
                      >
                        ₹{event.price}
                      </Box>
                    </Box>
                    
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography 
                        variant="h6" 
                        component="h3" 
                        gutterBottom
                        sx={{
                          fontWeight: 600,
                          fontSize: '1.25rem',
                          lineHeight: 1.4,
                          mb: 2,
                        }}
                      >
                        {event.title}
                      </Typography>
                      
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                          mb: 3,
                          lineHeight: 1.6,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {event.description}
                      </Typography>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <LocationOn fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                          {event.venue.city}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                        <CalendarToday fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
                          {new Date(event.eventDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </Typography>
                      </Box>
                      
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/events/${event.id}`);
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
          )}
        </Box>

        {/* Categories Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h3" component="h2" gutterBottom align="center">
            Sports Categories
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
            Explore events by your favorite sports
          </Typography>
          
          {categoriesLoading ? (
            <Grid container spacing={2}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Grid size={{ xs: 6, sm: 4, md: 2 }} key={i}>
                  <Paper sx={{ p: 2, textAlign: 'center' }}>
                    <Box sx={{ height: 40, bgcolor: 'grey.200', mb: 1 }} />
                    <Box sx={{ height: 16, bgcolor: 'grey.200' }} />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={2}>
              {categories.map((category) => (
                <Grid size={{ xs: 6, sm: 4, md: 2 }} key={category.id}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: 4,
                      },
                    }}
                    onClick={() => navigate(`/events?category=${category.id}`)}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        bgcolor: 'primary.main',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 1,
                        color: 'white',
                      }}
                    >
                      <Sports />
                    </Box>
                    <Typography variant="body2" fontWeight="medium">
                      {category.name}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>

        {/* CTA Section */}
        <Box
          sx={{
            bgcolor: 'grey.50',
            borderRadius: 2,
            p: 6,
            textAlign: 'center',
            mb: 4,
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom>
            Ready to Join the Action?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Browse through hundreds of sports events and find the perfect one for you.
            Whether you're a beginner or a pro, there's something for everyone.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/events')}
            startIcon={<Event />}
          >
            Browse All Events
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HomePage;
