package com.sportsevents.repository;

import com.sportsevents.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * Repository for User entity
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    /**
     * Find user by email
     */
    Optional<User> findByEmail(String email);
    
    /**
     * Check if email exists
     */
    boolean existsByEmail(String email);
    
    /**
     * Find users by city
     */
    @Query("SELECT u FROM User u WHERE u.city = :city ORDER BY u.firstName ASC, u.lastName ASC")
    java.util.List<User> findByCity(@Param("city") String city);
    
    /**
     * Find users with upcoming event bookings
     */
    @Query("SELECT DISTINCT u FROM User u " +
           "INNER JOIN u.bookings b " +
           "INNER JOIN b.event e " +
           "WHERE e.eventDate >= CURRENT_TIMESTAMP " +
           "AND b.bookingStatus = 'CONFIRMED' " +
           "ORDER BY u.firstName ASC, u.lastName ASC")
    java.util.List<User> findUsersWithUpcomingBookings();
    
    /**
     * Count total users
     */
    @Query("SELECT COUNT(u) FROM User u")
    long countTotalUsers();
}
