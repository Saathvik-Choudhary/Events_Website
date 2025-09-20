import React, { useState } from 'react';
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
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Alert,
  CircularProgress,
  useTheme,
} from '@mui/material';
import {
  LocationOn,
  CalendarToday,
  People,
  AttachMoney,
  AccessTime,
  Star,
  Sports,
  Info,
  BookOnline,
} from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { useEvent } from '../hooks/useEvents';
import { EventType, DifficultyLevel } from '../types';

const EventDetailsPage: React.FC = () => {
  const theme = useTheme();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showBookingForm, setShowBookingForm] = useState(false);

  const { data: event, isLoading, error } = useEvent(parseInt(id || '0'));

  const handleBookNow = () => {
    if (event) {
      navigate(`/book/${event.id}`);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isRegistrationOpen = () => {
    if (!event) return false;
    const now = new Date();
    const startDate = new Date(event.registrationStartDate);
    const endDate = new Date(event.registrationEndDate);
    return now >= startDate && now <= endDate;
  };

  const hasAvailableSlots = () => {
    if (!event || !event.maxParticipants) return true;
    // In a real app, you'd check actual bookings
    return true; // Mock: always has slots
  };

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error || !event) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">
          Event not found or failed to load. Please try again.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid size={{ xs: 12, md: 8 }}>
          {/* Event Image */}
          <Card sx={{ mb: 3 }}>
            <CardMedia
              component="img"
              height="400"
              image={event.bannerUrl || event.imageUrl || 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800'}
              alt={event.title}
            />
          </Card>

          {/* Event Details */}
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Chip
                  label={event.category.name}
                  color="primary"
                  variant="outlined"
                />
                <Chip
                  label={event.eventType.replace('_', ' ')}
                  color="secondary"
                  variant="outlined"
                />
                {event.difficultyLevel && (
                  <Chip
                    label={event.difficultyLevel}
                    color={
                      event.difficultyLevel === DifficultyLevel.BEGINNER
                        ? 'success'
                        : event.difficultyLevel === DifficultyLevel.INTERMEDIATE
                        ? 'warning'
                        : 'error'
                    }
                    variant="outlined"
                  />
                )}
              </Box>

              <Typography variant="h3" component="h1" gutterBottom>
                {event.title}
              </Typography>

              <Typography variant="body1" sx={{ mb: 3, lineHeight: 1.8 }}>
                {event.description}
              </Typography>

              {/* Event Rules */}
              {event.rules && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Rules & Guidelines
                  </Typography>
                  <Paper sx={{ p: 2, bgcolor: 'grey.50' }}>
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                      {event.rules}
                    </Typography>
                  </Paper>
                </Box>
              )}

              {/* Prize Information */}
              {event.prizeInfo && (
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Prize Information
                  </Typography>
                  <Paper sx={{ p: 2, bgcolor: 'primary.50' }}>
                    <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
                      {event.prizeInfo}
                    </Typography>
                  </Paper>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid size={{ xs: 12, md: 4 }}>
          {/* Booking Card */}
          <Card sx={{ mb: 3, position: 'sticky', top: 20 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Event Details
              </Typography>

              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CalendarToday color="action" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Date"
                    secondary={formatDate(event.eventDate)}
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <AccessTime color="action" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Time"
                    secondary={formatTime(event.eventDate)}
                  />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <LocationOn color="action" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Venue"
                    secondary={
                      <Box>
                        <Typography variant="body2">{event.venue.name}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {event.venue.address}, {event.venue.city}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>

                {event.maxParticipants && (
                  <ListItem>
                    <ListItemIcon>
                      <People color="action" />
                    </ListItemIcon>
                    <ListItemText
                      primary="Participants"
                      secondary={`Max ${event.maxParticipants} participants`}
                    />
                  </ListItem>
                )}

                <ListItem>
                  <ListItemIcon>
                    <AttachMoney color="action" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Price"
                    secondary={`₹${event.price}`}
                  />
                </ListItem>
              </List>

              <Divider sx={{ my: 2 }} />

              {/* Registration Status */}
              <Box sx={{ mb: 2 }}>
                {isRegistrationOpen() ? (
                  <Alert severity="success" sx={{ mb: 2 }}>
                    Registration is open!
                  </Alert>
                ) : (
                  <Alert severity="warning" sx={{ mb: 2 }}>
                    Registration is closed
                  </Alert>
                )}

                {hasAvailableSlots() ? (
                  <Alert severity="info" sx={{ mb: 2 }}>
                    Slots available
                  </Alert>
                ) : (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    No slots available
                  </Alert>
                )}
              </Box>

              {/* Book Now Button */}
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<BookOnline />}
                onClick={handleBookNow}
                disabled={!isRegistrationOpen() || !hasAvailableSlots()}
                sx={{ mb: 2 }}
              >
                {!isRegistrationOpen() 
                  ? 'Registration Closed'
                  : !hasAvailableSlots()
                  ? 'No Slots Available'
                  : 'Book Now'
                }
              </Button>

              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate('/events')}
              >
                Back to Events
              </Button>
            </CardContent>
          </Card>

          {/* Venue Information */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Venue Information
              </Typography>
              
              <Typography variant="subtitle1" gutterBottom>
                {event.venue.name}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {event.venue.address}
              </Typography>

              {event.venue.capacity && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Capacity: {event.venue.capacity} people
                  </Typography>
                </Box>
              )}

              {event.venue.amenities && (
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Amenities: {event.venue.amenities}
                  </Typography>
                </Box>
              )}

              <Button
                variant="text"
                size="small"
                onClick={() => navigate('/venues')}
                sx={{ mt: 1 }}
              >
                View All Venues
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Contact Information */}
      {event.contactInfo && (
        <Card sx={{ mt: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Contact Information
            </Typography>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
              {event.contactInfo}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default EventDetailsPage;
