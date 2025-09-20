package com.sportsevents.controller;

import com.sportsevents.model.Event;
import com.sportsevents.service.EventService;
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

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * REST Controller for Event operations
 */
@RestController
@RequestMapping("/api/events")
@Tag(name = "Events", description = "API for managing sports events")
@CrossOrigin(origins = "*")
public class EventController {
    
    @Autowired
    private EventService eventService;
    
    /**
     * Get all active events with open registration
     */
    @GetMapping
    @Operation(summary = "Get all active events", description = "Retrieve paginated list of active events with open registration")
    public ResponseEntity<Page<Event>> getAllEvents(
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "12") int size,
            @Parameter(description = "Sort by field") @RequestParam(defaultValue = "eventDate") String sortBy,
            @Parameter(description = "Sort direction") @RequestParam(defaultValue = "asc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("desc") ? 
            Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Event> events = eventService.getActiveEventsWithOpenRegistration(pageable);
        
        return ResponseEntity.ok(events);
    }
    
    /**
     * Get event by ID
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get event by ID", description = "Retrieve a specific event by its ID")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        Optional<Event> event = eventService.getEventById(id);
        return event.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Get events by category
     */
    @GetMapping("/category/{categoryId}")
    @Operation(summary = "Get events by category", description = "Retrieve events filtered by category")
    public ResponseEntity<Page<Event>> getEventsByCategory(
            @PathVariable Long categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("eventDate").ascending());
        Page<Event> events = eventService.getEventsByCategory(categoryId, pageable);
        
        return ResponseEntity.ok(events);
    }
    
    /**
     * Get events by city
     */
    @GetMapping("/city/{city}")
    @Operation(summary = "Get events by city", description = "Retrieve events filtered by city")
    public ResponseEntity<Page<Event>> getEventsByCity(
            @PathVariable String city,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("eventDate").ascending());
        Page<Event> events = eventService.getEventsByCity(city, pageable);
        
        return ResponseEntity.ok(events);
    }
    
    /**
     * Get events by event type
     */
    @GetMapping("/type/{eventType}")
    @Operation(summary = "Get events by type", description = "Retrieve events filtered by event type")
    public ResponseEntity<Page<Event>> getEventsByType(
            @PathVariable Event.EventType eventType,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("eventDate").ascending());
        Page<Event> events = eventService.getEventsByType(eventType, pageable);
        
        return ResponseEntity.ok(events);
    }
    
    /**
     * Search events
     */
    @GetMapping("/search")
    @Operation(summary = "Search events", description = "Search events by title or description")
    public ResponseEntity<Page<Event>> searchEvents(
            @Parameter(description = "Search term") @RequestParam String q,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("eventDate").ascending());
        Page<Event> events = eventService.searchEvents(q, pageable);
        
        return ResponseEntity.ok(events);
    }
    
    /**
     * Get events with available slots
     */
    @GetMapping("/available")
    @Operation(summary = "Get events with available slots", description = "Retrieve events that still have available slots")
    public ResponseEntity<Page<Event>> getEventsWithAvailableSlots(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("eventDate").ascending());
        Page<Event> events = eventService.getEventsWithAvailableSlots(pageable);
        
        return ResponseEntity.ok(events);
    }
    
    /**
     * Get upcoming events
     */
    @GetMapping("/upcoming")
    @Operation(summary = "Get upcoming events", description = "Retrieve events happening in the next week")
    public ResponseEntity<List<Event>> getUpcomingEvents() {
        List<Event> events = eventService.getEventsStartingSoon();
        return ResponseEntity.ok(events);
    }
    
    /**
     * Get upcoming events in date range
     */
    @GetMapping("/upcoming/range")
    @Operation(summary = "Get upcoming events in date range", description = "Retrieve events in a specific date range")
    public ResponseEntity<List<Event>> getUpcomingEventsInRange(
            @Parameter(description = "Start date (ISO format)") @RequestParam String startDate,
            @Parameter(description = "End date (ISO format)") @RequestParam String endDate) {
        
        LocalDateTime start = LocalDateTime.parse(startDate);
        LocalDateTime end = LocalDateTime.parse(endDate);
        
        List<Event> events = eventService.getUpcomingEvents(start, end);
        return ResponseEntity.ok(events);
    }
    
    /**
     * Check if event has available slots
     */
    @GetMapping("/{id}/availability")
    @Operation(summary = "Check event availability", description = "Check if an event has available slots")
    public ResponseEntity<Boolean> checkEventAvailability(@PathVariable Long id) {
        boolean available = eventService.hasAvailableSlots(id);
        return ResponseEntity.ok(available);
    }
    
    /**
     * Check if event registration is open
     */
    @GetMapping("/{id}/registration-status")
    @Operation(summary = "Check registration status", description = "Check if event registration is open")
    public ResponseEntity<Boolean> checkRegistrationStatus(@PathVariable Long id) {
        boolean open = eventService.isRegistrationOpen(id);
        return ResponseEntity.ok(open);
    }
    
    /**
     * Get event statistics
     */
    @GetMapping("/stats")
    @Operation(summary = "Get event statistics", description = "Get overall event statistics")
    public ResponseEntity<Long> getEventStats() {
        long totalEvents = eventService.getTotalActiveEvents();
        return ResponseEntity.ok(totalEvents);
    }
}
