package com.sportsevents.service;

import com.sportsevents.model.Event;
import com.sportsevents.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Service for Event operations with caching
 */
@Service
@Transactional
public class EventService {
    
    @Autowired
    private EventRepository eventRepository;
    
    /**
     * Get all active events with open registration (cached)
     */
    @Cacheable("events")
    public Page<Event> getActiveEventsWithOpenRegistration(Pageable pageable) {
        return eventRepository.findActiveEventsWithOpenRegistration(
            Event.EventStatus.ACTIVE, 
            LocalDateTime.now(), 
            pageable
        );
    }
    
    /**
     * Get event by ID with details (cached)
     */
    @Cacheable("events")
    public Optional<Event> getEventById(Long id) {
        return eventRepository.findByIdWithDetails(id);
    }
    
    /**
     * Get events by category (cached)
     */
    @Cacheable("events")
    public Page<Event> getEventsByCategory(Long categoryId, Pageable pageable) {
        return eventRepository.findByCategoryWithOpenRegistration(
            categoryId, 
            LocalDateTime.now(), 
            pageable
        );
    }
    
    /**
     * Get events by city (cached)
     */
    @Cacheable("events")
    public Page<Event> getEventsByCity(String city, Pageable pageable) {
        return eventRepository.findByCityWithOpenRegistration(
            city, 
            LocalDateTime.now(), 
            pageable
        );
    }
    
    /**
     * Get events by event type (cached)
     */
    @Cacheable("events")
    public Page<Event> getEventsByType(Event.EventType eventType, Pageable pageable) {
        return eventRepository.findByEventTypeWithOpenRegistration(
            eventType, 
            LocalDateTime.now(), 
            pageable
        );
    }
    
    /**
     * Search events (cached)
     */
    @Cacheable("events")
    public Page<Event> searchEvents(String searchTerm, Pageable pageable) {
        return eventRepository.searchEventsWithOpenRegistration(
            searchTerm, 
            LocalDateTime.now(), 
            pageable
        );
    }
    
    /**
     * Get events with available slots (cached)
     */
    @Cacheable("events")
    public Page<Event> getEventsWithAvailableSlots(Pageable pageable) {
        return eventRepository.findEventsWithAvailableSlots(LocalDateTime.now(), pageable);
    }
    
    /**
     * Get upcoming events (cached)
     */
    @Cacheable("events")
    public List<Event> getUpcomingEvents(LocalDateTime startDate, LocalDateTime endDate) {
        return eventRepository.findUpcomingEvents(startDate, endDate);
    }
    
    /**
     * Get events starting soon (next 7 days)
     */
    @Cacheable("events")
    public List<Event> getEventsStartingSoon() {
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime weekFromNow = now.plusDays(7);
        return eventRepository.findEventsStartingSoon(now, weekFromNow);
    }
    
    /**
     * Create new event (evicts cache)
     */
    @CacheEvict(value = "events", allEntries = true)
    public Event createEvent(Event event) {
        return eventRepository.save(event);
    }
    
    /**
     * Update event (evicts cache)
     */
    @CacheEvict(value = "events", allEntries = true)
    public Event updateEvent(Event event) {
        return eventRepository.save(event);
    }
    
    /**
     * Delete event (evicts cache)
     */
    @CacheEvict(value = "events", allEntries = true)
    public void deleteEvent(Long id) {
        eventRepository.deleteById(id);
    }
    
    /**
     * Get event statistics
     */
    public long getTotalActiveEvents() {
        return eventRepository.countByStatus(Event.EventStatus.ACTIVE);
    }
    
    /**
     * Check if event has available slots
     */
    public boolean hasAvailableSlots(Long eventId) {
        Optional<Event> eventOpt = eventRepository.findById(eventId);
        if (eventOpt.isPresent()) {
            Event event = eventOpt.get();
            return event.hasAvailableSlots();
        }
        return false;
    }
    
    /**
     * Check if registration is open for event
     */
    public boolean isRegistrationOpen(Long eventId) {
        Optional<Event> eventOpt = eventRepository.findById(eventId);
        if (eventOpt.isPresent()) {
            Event event = eventOpt.get();
            return event.isRegistrationOpen();
        }
        return false;
    }
}
