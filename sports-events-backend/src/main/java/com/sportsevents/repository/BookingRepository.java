package com.sportsevents.repository;

import com.sportsevents.model.Booking;
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
 * Repository for Booking entity
 */
@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    
    /**
     * Find bookings by user with pagination
     */
    @Query("SELECT b FROM Booking b " +
           "LEFT JOIN FETCH b.event e " +
           "LEFT JOIN FETCH e.venue " +
           "LEFT JOIN FETCH e.category " +
           "WHERE b.user.id = :userId " +
           "ORDER BY b.bookingDate DESC")
    Page<Booking> findByUserIdWithDetails(@Param("userId") Long userId, Pageable pageable);
    
    /**
     * Find bookings by event
     */
    @Query("SELECT b FROM Booking b " +
           "LEFT JOIN FETCH b.user " +
           "WHERE b.event.id = :eventId " +
           "AND b.bookingStatus = 'CONFIRMED' " +
           "ORDER BY b.bookingDate ASC")
    List<Booking> findByEventIdWithConfirmedStatus(@Param("eventId") Long eventId);
    
    /**
     * Find booking by user and event
     */
    @Query("SELECT b FROM Booking b " +
           "WHERE b.user.id = :userId AND b.event.id = :eventId")
    Optional<Booking> findByUserIdAndEventId(@Param("userId") Long userId, @Param("eventId") Long eventId);
    
    /**
     * Count confirmed bookings for an event
     */
    @Query("SELECT COUNT(b) FROM Booking b " +
           "WHERE b.event.id = :eventId " +
           "AND b.bookingStatus = 'CONFIRMED'")
    long countConfirmedBookingsByEventId(@Param("eventId") Long eventId);
    
    /**
     * Find upcoming bookings for a user
     */
    @Query("SELECT b FROM Booking b " +
           "LEFT JOIN FETCH b.event e " +
           "LEFT JOIN FETCH e.venue " +
           "WHERE b.user.id = :userId " +
           "AND e.eventDate >= CURRENT_TIMESTAMP " +
           "AND b.bookingStatus = 'CONFIRMED' " +
           "ORDER BY e.eventDate ASC")
    List<Booking> findUpcomingBookingsByUserId(@Param("userId") Long userId);
    
    /**
     * Find bookings by payment status
     */
    @Query("SELECT b FROM Booking b " +
           "LEFT JOIN FETCH b.user " +
           "LEFT JOIN FETCH b.event " +
           "WHERE b.paymentStatus = :paymentStatus " +
           "ORDER BY b.bookingDate DESC")
    List<Booking> findByPaymentStatus(@Param("paymentStatus") Booking.PaymentStatus paymentStatus);
    
    /**
     * Find bookings by booking status
     */
    @Query("SELECT b FROM Booking b " +
           "LEFT JOIN FETCH b.user " +
           "LEFT JOIN FETCH b.event " +
           "WHERE b.bookingStatus = :bookingStatus " +
           "ORDER BY b.bookingDate DESC")
    List<Booking> findByBookingStatus(@Param("bookingStatus") Booking.BookingStatus bookingStatus);
    
    /**
     * Find recent bookings with pagination
     */
    @Query("SELECT b FROM Booking b " +
           "LEFT JOIN FETCH b.user " +
           "LEFT JOIN FETCH b.event e " +
           "LEFT JOIN FETCH e.venue " +
           "WHERE b.bookingDate >= :fromDate " +
           "ORDER BY b.bookingDate DESC")
    Page<Booking> findRecentBookings(@Param("fromDate") LocalDateTime fromDate, Pageable pageable);
    
    /**
     * Count total bookings
     */
    @Query("SELECT COUNT(b) FROM Booking b")
    long countTotalBookings();
    
    /**
     * Count bookings by status
     */
    long countByBookingStatus(Booking.BookingStatus bookingStatus);
    
    /**
     * Count bookings by payment status
     */
    long countByPaymentStatus(Booking.PaymentStatus paymentStatus);
    
    /**
     * Find bookings for events starting soon
     */
    @Query("SELECT b FROM Booking b " +
           "INNER JOIN b.event e " +
           "LEFT JOIN FETCH b.user " +
           "WHERE e.eventDate BETWEEN CURRENT_TIMESTAMP AND :endDate " +
           "AND b.bookingStatus = 'CONFIRMED' " +
           "ORDER BY e.eventDate ASC")
    List<Booking> findBookingsForEventsStartingSoon(@Param("endDate") LocalDateTime endDate);
}
