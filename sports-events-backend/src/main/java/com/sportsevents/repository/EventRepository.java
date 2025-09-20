package com.sportsevents.repository;

import com.sportsevents.model.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Repository for Event entity with optimized queries
 */
@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    
    /**
     * Find events with pagination, filtering by status and registration availability
     */
    @Query("SELECT e FROM Event e WHERE e.status = :status " +
           "AND e.registrationStartDate <= :now AND e.registrationEndDate >= :now " +
           "ORDER BY e.eventDate ASC")
    Page<Event> findActiveEventsWithOpenRegistration(
        @Param("status") Event.EventStatus status,
        @Param("now") LocalDateTime now,
        Pageable pageable
    );
    
    /**
     * Find events by category with pagination
     */
    @Query("SELECT e FROM Event e WHERE e.category.id = :categoryId " +
           "AND e.status = 'ACTIVE' " +
           "AND e.registrationStartDate <= :now AND e.registrationEndDate >= :now " +
           "ORDER BY e.eventDate ASC")
    Page<Event> findByCategoryWithOpenRegistration(
        @Param("categoryId") Long categoryId,
        @Param("now") LocalDateTime now,
        Pageable pageable
    );
    
    /**
     * Find events by venue with pagination
     */
    @Query("SELECT e FROM Event e WHERE e.venue.id = :venueId " +
           "AND e.status = 'ACTIVE' " +
           "ORDER BY e.eventDate ASC")
    Page<Event> findByVenue(@Param("venueId") Long venueId, Pageable pageable);
    
    /**
     * Find events by city with pagination
     */
    @Query("SELECT e FROM Event e WHERE e.venue.city = :city " +
           "AND e.status = 'ACTIVE' " +
           "AND e.registrationStartDate <= :now AND e.registrationEndDate >= :now " +
           "ORDER BY e.eventDate ASC")
    Page<Event> findByCityWithOpenRegistration(
        @Param("city") String city,
        @Param("now") LocalDateTime now,
        Pageable pageable
    );
    
    /**
     * Find events by event type with pagination
     */
    @Query("SELECT e FROM Event e WHERE e.eventType = :eventType " +
           "AND e.status = 'ACTIVE' " +
           "AND e.registrationStartDate <= :now AND e.registrationEndDate >= :now " +
           "ORDER BY e.eventDate ASC")
    Page<Event> findByEventTypeWithOpenRegistration(
        @Param("eventType") Event.EventType eventType,
        @Param("now") LocalDateTime now,
        Pageable pageable
    );
    
    /**
     * Search events by title or description
     */
    @Query("SELECT e FROM Event e WHERE " +
           "(LOWER(e.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(e.description) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) " +
           "AND e.status = 'ACTIVE' " +
           "AND e.registrationStartDate <= :now AND e.registrationEndDate >= :now " +
           "ORDER BY e.eventDate ASC")
    Page<Event> searchEventsWithOpenRegistration(
        @Param("searchTerm") String searchTerm,
        @Param("now") LocalDateTime now,
        Pageable pageable
    );
    
    /**
     * Find upcoming events for a specific date range
     */
    @Query("SELECT e FROM Event e WHERE e.eventDate BETWEEN :startDate AND :endDate " +
           "AND e.status = 'ACTIVE' " +
           "ORDER BY e.eventDate ASC")
    List<Event> findUpcomingEvents(
        @Param("startDate") LocalDateTime startDate,
        @Param("endDate") LocalDateTime endDate
    );
    
    /**
     * Find events with available slots
     */
    @Query("SELECT e FROM Event e WHERE e.status = 'ACTIVE' " +
           "AND e.registrationStartDate <= :now AND e.registrationEndDate >= :now " +
           "AND (e.maxParticipants IS NULL OR " +
           "(SELECT COUNT(b) FROM Booking b WHERE b.event.id = e.id AND b.bookingStatus = 'CONFIRMED') < e.maxParticipants) " +
           "ORDER BY e.eventDate ASC")
    Page<Event> findEventsWithAvailableSlots(@Param("now") LocalDateTime now, Pageable pageable);
    
    /**
     * Find event by ID with category and venue details
     */
    @Query("SELECT e FROM Event e " +
           "LEFT JOIN FETCH e.category " +
           "LEFT JOIN FETCH e.venue " +
           "WHERE e.id = :id")
    Optional<Event> findByIdWithDetails(@Param("id") Long id);
    
    /**
     * Count events by status
     */
    long countByStatus(Event.EventStatus status);
    
    /**
     * Find events starting soon (next 7 days)
     */
    @Query("SELECT e FROM Event e WHERE e.eventDate BETWEEN :now AND :weekFromNow " +
           "AND e.status = 'ACTIVE' " +
           "ORDER BY e.eventDate ASC")
    List<Event> findEventsStartingSoon(
        @Param("now") LocalDateTime now,
        @Param("weekFromNow") LocalDateTime weekFromNow
    );
    
    /**
     * Find events by title
     */
    List<Event> findByTitle(String title);
}
