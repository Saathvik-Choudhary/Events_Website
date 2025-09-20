import React, { useState, useEffect } from 'react';
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
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  CircularProgress,
  Alert,
  Paper,
  useTheme,
  IconButton,
  Fab,
} from '@mui/material';
import {
  Search,
  FilterList,
  LocationOn,
  CalendarToday,
  People,
  Star,
  ViewList,
  ViewModule,
} from '@mui/icons-material';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useInfiniteEvents } from '../hooks/useEvents';
import { useCategories } from '../hooks/useCategories';
import { EventType, DifficultyLevel } from '../types';
import FilterSidebar from '../components/FilterSidebar';

interface EventFilters {
  search: string;
  category: number | '';
  eventType: EventType | '';
  difficulty: DifficultyLevel | '';
  priceRange: [number, number];
  dateRange: [string, string];
  location: string;
  sortBy: string;
  sortDir: 'asc' | 'desc';
}

const EventsPage: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  // UI state
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Filters state
  const [filters, setFilters] = useState<EventFilters>({
    search: searchParams.get('search') || '',
    category: (parseInt(searchParams.get('category') || '') || '') as number | '',
    eventType: (searchParams.get('eventType') as EventType) || '',
    difficulty: (searchParams.get('difficulty') as DifficultyLevel) || '',
    priceRange: [0, 10000] as [number, number],
    dateRange: ['', ''] as [string, string],
    location: searchParams.get('location') || '',
    sortBy: searchParams.get('sortBy') || 'eventDate',
    sortDir: (searchParams.get('sortDir') as 'asc' | 'desc') || 'asc',
  });

  // Data fetching
  const { data: categories = [] } = useCategories();
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteEvents(filters.sortBy, filters.sortDir);

  // Flatten events from all pages
  const events = data?.pages.flatMap(page => page.content) || [];

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.search) params.set('search', filters.search);
    if (filters.category) params.set('category', filters.category.toString());
    if (filters.eventType) params.set('eventType', filters.eventType);
    if (filters.difficulty) params.set('difficulty', filters.difficulty);
    if (filters.location) params.set('location', filters.location);
    if (filters.sortBy !== 'eventDate') params.set('sortBy', filters.sortBy);
    if (filters.sortDir !== 'asc') params.set('sortDir', filters.sortDir);
    
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const handleFiltersChange = (newFilters: EventFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    // Search is handled by the URL params update
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      eventType: '',
      difficulty: '',
      priceRange: [0, 10000] as [number, number],
      dateRange: ['', ''] as [string, string],
      location: '',
      sortBy: 'eventDate',
      sortDir: 'asc' as 'asc' | 'desc',
    });
  };

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error">
          Failed to load events. Please try again later.
        </Alert>
      </Container>
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Filter Sidebar */}
      <FilterSidebar
        open={filterSidebarOpen}
        onClose={() => setFilterSidebarOpen(false)}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        categories={categories}
      />

      {/* Main Content */}
      <Box sx={{ flexGrow: 1, ml: filterSidebarOpen ? '320px' : 0, transition: 'margin-left 0.3s ease' }}>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          {/* Header */}
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Box>
              <Typography variant="h3" component="h1" gutterBottom>
                Sports Events
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Discover and join exciting sports events happening around you
              </Typography>
            </Box>
            
            {/* View Controls */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button
                variant="outlined"
                startIcon={<FilterList />}
                onClick={() => setFilterSidebarOpen(!filterSidebarOpen)}
                sx={{ mr: 2 }}
              >
                Filters
              </Button>
              <IconButton
                onClick={() => setViewMode('grid')}
                color={viewMode === 'grid' ? 'primary' : 'default'}
              >
                <ViewModule />
              </IconButton>
              <IconButton
                onClick={() => setViewMode('list')}
                color={viewMode === 'list' ? 'primary' : 'default'}
              >
                <ViewList />
              </IconButton>
            </Box>
          </Box>

          {/* Quick Search */}
          <Paper elevation={1} sx={{ p: 3, mb: 4 }}>
            <Box component="form" onSubmit={handleSearch}>
              <Grid container spacing={2} alignItems="center">
                <Grid size={{ xs: 12, md: 8 }}>
                  <TextField
                    fullWidth
                    placeholder="Search events, venues, or categories..."
                    value={filters.search}
                    onChange={(e) => handleFiltersChange({ ...filters, search: e.target.value })}
                    InputProps={{
                      startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />,
                    }}
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                      variant="outlined"
                      startIcon={<FilterList />}
                      onClick={() => setFilterSidebarOpen(!filterSidebarOpen)}
                      fullWidth
                    >
                      Advanced Filters
                    </Button>
                    <Button variant="text" onClick={clearFilters}>
                      Clear
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>

          {/* Events Grid */}
          {isLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
              <CircularProgress />
            </Box>
          ) : events.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">
                No events found matching your criteria
              </Typography>
              <Button
                variant="contained"
                onClick={clearFilters}
                sx={{ mt: 2 }}
              >
                Clear Filters
              </Button>
            </Box>
          ) : (
            <>
              <Grid container spacing={4}>
                {events.map((event) => (
                  <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={event.id}>
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
                            {formatDate(event.eventDate)} at {formatTime(event.eventDate)}
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

              {/* Load More Button */}
              {hasNextPage && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                  <Button
                    variant="outlined"
                    onClick={handleLoadMore}
                    disabled={isFetchingNextPage}
                    startIcon={isFetchingNextPage ? <CircularProgress size={20} /> : null}
                    sx={{ py: 1.5, px: 4 }}
                  >
                    {isFetchingNextPage ? 'Loading...' : 'Load More Events'}
                  </Button>
                </Box>
              )}
            </>
          )}
        </Container>
      </Box>

      {/* Mobile Filter FAB */}
      <Fab
        color="primary"
        aria-label="filter"
        onClick={() => setFilterSidebarOpen(true)}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          display: { xs: 'flex', md: 'none' },
        }}
      >
        <FilterList />
      </Fab>
    </Box>
  );
};

export default EventsPage;
