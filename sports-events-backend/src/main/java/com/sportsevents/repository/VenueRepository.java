package com.sportsevents.repository;

import com.sportsevents.model.Venue;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for Venue entity with caching
 */
@Repository
public interface VenueRepository extends JpaRepository<Venue, Long> {
    
    /**
     * Find venues by city (cached)
     */
    @Cacheable("venues")
    List<Venue> findByCityOrderByNameAsc(String city);
    
    /**
     * Find all unique cities (cached)
     */
    @Cacheable("venues")
    @Query("SELECT DISTINCT v.city FROM Venue v ORDER BY v.city ASC")
    List<String> findAllCities();
    
    /**
     * Search venues by name or city
     */
    @Query("SELECT v FROM Venue v WHERE " +
           "LOWER(v.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(v.city) LIKE LOWER(CONCAT('%', :searchTerm, '%')) " +
           "ORDER BY v.name ASC")
    Page<Venue> searchVenues(@Param("searchTerm") String searchTerm, Pageable pageable);
    
    /**
     * Find venues with upcoming events
     */
    @Query("SELECT DISTINCT v FROM Venue v " +
           "INNER JOIN v.events e " +
           "WHERE e.status = 'ACTIVE' " +
           "AND e.eventDate >= CURRENT_TIMESTAMP " +
           "ORDER BY v.name ASC")
    List<Venue> findVenuesWithUpcomingEvents();
    
    /**
     * Find venue by name (cached)
     */
    @Cacheable("venues")
    Optional<Venue> findByName(String name);
    
    /**
     * Find venues by city with pagination
     */
    Page<Venue> findByCity(String city, Pageable pageable);
    
    /**
     * Find venues with capacity greater than specified
     */
    @Query("SELECT v FROM Venue v WHERE v.capacity >= :minCapacity ORDER BY v.capacity ASC")
    List<Venue> findByCapacityGreaterThanEqual(@Param("minCapacity") Integer minCapacity);
}
