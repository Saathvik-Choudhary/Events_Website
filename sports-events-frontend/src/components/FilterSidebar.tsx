import React, { useState } from 'react';
import {
  Drawer,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Slider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Divider,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  FilterList,
  ExpandMore,
  Clear,
  LocationOn,
  CalendarToday,
  AttachMoney,
  People,
  Star,
} from '@mui/icons-material';
import { EventType, DifficultyLevel } from '../types';

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

interface FilterSidebarProps {
  open: boolean;
  onClose: () => void;
  filters: EventFilters;
  onFiltersChange: (filters: EventFilters) => void;
  categories: Array<{ id: number; name: string }>;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  open,
  onClose,
  filters,
  onFiltersChange,
  categories,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters: EventFilters = {
      search: '',
      category: '',
      eventType: '',
      difficulty: '',
      priceRange: [0, 10000] as [number, number],
      dateRange: ['', ''] as [string, string],
      location: '',
      sortBy: 'eventDate',
      sortDir: 'asc' as 'asc' | 'desc',
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const applyFilters = () => {
    onFiltersChange(localFilters);
    if (isMobile) {
      onClose();
    }
  };

  const drawerContent = (
    <Box sx={{ width: 320, p: 3, height: '100%', overflow: 'auto' }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterList />
          Filters
        </Typography>
        <IconButton onClick={onClose} size="small">
          <Clear />
        </IconButton>
      </Box>

      {/* Clear All Button */}
      <Button
        variant="outlined"
        fullWidth
        onClick={clearAllFilters}
        sx={{ mb: 3 }}
        startIcon={<Clear />}
      >
        Clear All Filters
      </Button>

      {/* Search */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Search
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            fullWidth
            size="small"
            placeholder="Search events..."
            value={localFilters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
          />
        </AccordionDetails>
      </Accordion>

      {/* Location */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
            <LocationOn fontSize="small" />
            Location
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            fullWidth
            size="small"
            placeholder="Enter city or venue..."
            value={localFilters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
          />
        </AccordionDetails>
      </Accordion>

      {/* Category */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Category
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl fullWidth size="small">
            <InputLabel>Select Category</InputLabel>
            <Select
              value={localFilters.category}
              label="Select Category"
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <MenuItem value="">All Categories</MenuItem>
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      {/* Event Type */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Event Type
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl fullWidth size="small">
            <InputLabel>Select Type</InputLabel>
            <Select
              value={localFilters.eventType}
              label="Select Type"
              onChange={(e) => handleFilterChange('eventType', e.target.value)}
            >
              <MenuItem value="">All Types</MenuItem>
              {Object.values(EventType).map((type) => (
                <MenuItem key={type} value={type}>
                  {type.replace('_', ' ')}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      {/* Difficulty Level */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Difficulty Level
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl fullWidth size="small">
            <InputLabel>Select Difficulty</InputLabel>
            <Select
              value={localFilters.difficulty}
              label="Select Difficulty"
              onChange={(e) => handleFilterChange('difficulty', e.target.value)}
            >
              <MenuItem value="">All Levels</MenuItem>
              {Object.values(DifficultyLevel).map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </AccordionDetails>
      </Accordion>

      {/* Price Range */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
            <AttachMoney fontSize="small" />
            Price Range
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ px: 2 }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              ₹{localFilters.priceRange[0]} - ₹{localFilters.priceRange[1]}
            </Typography>
            <Slider
              value={localFilters.priceRange}
              onChange={(_, newValue) => handleFilterChange('priceRange', newValue)}
              valueLabelDisplay="auto"
              min={0}
              max={10000}
              step={100}
              valueLabelFormat={(value) => `₹${value}`}
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Date Range */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
            <CalendarToday fontSize="small" />
            Date Range
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              size="small"
              type="date"
              label="From Date"
              value={localFilters.dateRange[0]}
              onChange={(e) => handleFilterChange('dateRange', [e.target.value, localFilters.dateRange[1]])}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              size="small"
              type="date"
              label="To Date"
              value={localFilters.dateRange[1]}
              onChange={(e) => handleFilterChange('dateRange', [localFilters.dateRange[0], e.target.value])}
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Sort Options */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Sort By
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <FormControl fullWidth size="small">
              <InputLabel>Sort By</InputLabel>
              <Select
                value={localFilters.sortBy}
                label="Sort By"
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
              >
                <MenuItem value="eventDate">Event Date</MenuItem>
                <MenuItem value="title">Title</MenuItem>
                <MenuItem value="price">Price</MenuItem>
                <MenuItem value="createdAt">Recently Added</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth size="small">
              <InputLabel>Order</InputLabel>
              <Select
                value={localFilters.sortDir}
                label="Order"
                onChange={(e) => handleFilterChange('sortDir', e.target.value)}
              >
                <MenuItem value="asc">Ascending</MenuItem>
                <MenuItem value="desc">Descending</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Active Filters */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
          Active Filters
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {localFilters.search && (
            <Chip
              label={`Search: ${localFilters.search}`}
              size="small"
              onDelete={() => handleFilterChange('search', '')}
            />
          )}
          {localFilters.category && (
            <Chip
              label={`Category: ${categories.find(c => c.id === localFilters.category)?.name}`}
              size="small"
              onDelete={() => handleFilterChange('category', '')}
            />
          )}
          {localFilters.eventType && (
            <Chip
              label={`Type: ${localFilters.eventType.replace('_', ' ')}`}
              size="small"
              onDelete={() => handleFilterChange('eventType', '')}
            />
          )}
          {localFilters.difficulty && (
            <Chip
              label={`Difficulty: ${localFilters.difficulty}`}
              size="small"
              onDelete={() => handleFilterChange('difficulty', '')}
            />
          )}
          {localFilters.location && (
            <Chip
              label={`Location: ${localFilters.location}`}
              size="small"
              onDelete={() => handleFilterChange('location', '')}
            />
          )}
        </Box>
      </Box>

      {/* Apply Button for Mobile */}
      {isMobile && (
        <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Button
            variant="contained"
            fullWidth
            onClick={applyFilters}
            sx={{ py: 1.5 }}
          >
            Apply Filters
          </Button>
        </Box>
      )}
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: 320,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={open}
      sx={{
        width: 320,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 320,
          boxSizing: 'border-box',
          position: 'relative',
          height: 'auto',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default FilterSidebar;
