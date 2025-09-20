package com.sportsevents.service;

import com.sportsevents.model.Venue;
import com.sportsevents.repository.VenueRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service for Venue operations with caching
 */
@Service
@Transactional
public class VenueService {
    
    @Autowired
    private VenueRepository venueRepository;
    
    /**
     * Get all venues with pagination
     */
    public Page<Venue> getAllVenues(Pageable pageable) {
        return venueRepository.findAll(pageable);
    }
    
    /**
     * Get venues by city (cached)
     */
    @Cacheable("venues")
    public List<Venue> getVenuesByCity(String city) {
        return venueRepository.findByCityOrderByNameAsc(city);
    }
    
    /**
     * Get all cities (cached)
     */
    @Cacheable("venues")
    public List<String> getAllCities() {
        return venueRepository.findAllCities();
    }
    
    /**
     * Get venues with upcoming events (cached)
     */
    @Cacheable("venues")
    public List<Venue> getVenuesWithUpcomingEvents() {
        return venueRepository.findVenuesWithUpcomingEvents();
    }
    
    /**
     * Get venue by ID
     */
    public Optional<Venue> getVenueById(Long id) {
        return venueRepository.findById(id);
    }
    
    /**
     * Get venue by name (cached)
     */
    @Cacheable("venues")
    public Optional<Venue> getVenueByName(String name) {
        return venueRepository.findByName(name);
    }
    
    /**
     * Search venues (cached)
     */
    @Cacheable("venues")
    public Page<Venue> searchVenues(String searchTerm, Pageable pageable) {
        return venueRepository.searchVenues(searchTerm, pageable);
    }
    
    /**
     * Get venues with minimum capacity (cached)
     */
    @Cacheable("venues")
    public List<Venue> getVenuesByCapacity(Integer minCapacity) {
        return venueRepository.findByCapacityGreaterThanEqual(minCapacity);
    }
    
    /**
     * Create new venue (evicts cache)
     */
    @CacheEvict(value = "venues", allEntries = true)
    public Venue createVenue(Venue venue) {
        return venueRepository.save(venue);
    }
    
    /**
     * Update venue (evicts cache)
     */
    @CacheEvict(value = "venues", allEntries = true)
    public Venue updateVenue(Venue venue) {
        return venueRepository.save(venue);
    }
    
    /**
     * Delete venue (evicts cache)
     */
    @CacheEvict(value = "venues", allEntries = true)
    public void deleteVenue(Long id) {
        venueRepository.deleteById(id);
    }
}
