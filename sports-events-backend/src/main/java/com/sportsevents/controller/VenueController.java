package com.sportsevents.controller;

import com.sportsevents.model.Venue;
import com.sportsevents.service.VenueService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * REST Controller for Venue operations
 */
@RestController
@RequestMapping("/api/venues")
@Tag(name = "Venues", description = "API for managing event venues")
@CrossOrigin(origins = "*")
public class VenueController {
    
    @Autowired
    private VenueService venueService;
    
    /**
     * Get all venues with pagination
     */
    @GetMapping
    @Operation(summary = "Get all venues", description = "Retrieve paginated list of all venues")
    public ResponseEntity<Page<Venue>> getAllVenues(
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "12") int size,
            @Parameter(description = "Sort by field") @RequestParam(defaultValue = "name") String sortBy,
            @Parameter(description = "Sort direction") @RequestParam(defaultValue = "asc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("desc") ? 
            Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Venue> venues = venueService.getAllVenues(pageable);
        
        return ResponseEntity.ok(venues);
    }
    
    /**
     * Get venues by city
     */
    @GetMapping("/city/{city}")
    @Operation(summary = "Get venues by city", description = "Retrieve venues filtered by city")
    public ResponseEntity<List<Venue>> getVenuesByCity(@PathVariable String city) {
        List<Venue> venues = venueService.getVenuesByCity(city);
        return ResponseEntity.ok(venues);
    }
    
    /**
     * Get all cities
     */
    @GetMapping("/cities")
    @Operation(summary = "Get all cities", description = "Retrieve list of all cities with venues")
    public ResponseEntity<List<String>> getAllCities() {
        List<String> cities = venueService.getAllCities();
        return ResponseEntity.ok(cities);
    }
    
    /**
     * Get venues with upcoming events
     */
    @GetMapping("/with-events")
    @Operation(summary = "Get venues with upcoming events", description = "Retrieve venues that have upcoming events")
    public ResponseEntity<List<Venue>> getVenuesWithUpcomingEvents() {
        List<Venue> venues = venueService.getVenuesWithUpcomingEvents();
        return ResponseEntity.ok(venues);
    }
    
    /**
     * Get venue by ID
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get venue by ID", description = "Retrieve a specific venue by its ID")
    public ResponseEntity<Venue> getVenueById(@PathVariable Long id) {
        Optional<Venue> venue = venueService.getVenueById(id);
        return venue.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Search venues
     */
    @GetMapping("/search")
    @Operation(summary = "Search venues", description = "Search venues by name or city")
    public ResponseEntity<Page<Venue>> searchVenues(
            @Parameter(description = "Search term") @RequestParam String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("name").ascending());
        Page<Venue> venues = venueService.searchVenues(q, pageable);
        
        return ResponseEntity.ok(venues);
    }
    
    /**
     * Get venues by capacity
     */
    @GetMapping("/capacity/{minCapacity}")
    @Operation(summary = "Get venues by minimum capacity", description = "Retrieve venues with minimum specified capacity")
    public ResponseEntity<List<Venue>> getVenuesByCapacity(@PathVariable Integer minCapacity) {
        List<Venue> venues = venueService.getVenuesByCapacity(minCapacity);
        return ResponseEntity.ok(venues);
    }
}
