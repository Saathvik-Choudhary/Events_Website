package com.sportsevents.service;

import com.sportsevents.model.Booking;
import com.sportsevents.model.Event;
import com.sportsevents.model.User;
import com.sportsevents.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Service for Booking operations
 */
@Service
@Transactional
public class BookingService {
    
    @Autowired
    private BookingRepository bookingRepository;
    
    @Autowired
    private EventService eventService;
    
    @Autowired
    private UserService userService;
    
    /**
     * Create new booking
     */
    public Booking createBooking(Long userId, Long eventId, String notes, String emergencyContact) {
        // Validate user and event exist
        Optional<User> userOpt = userService.getUserById(userId);
        Optional<Event> eventOpt = eventService.getEventById(eventId);
        
        if (userOpt.isEmpty() || eventOpt.isEmpty()) {
            throw new IllegalArgumentException("User or Event not found");
        }
        
        User user = userOpt.get();
        Event event = eventOpt.get();
        
        // Check if user already has a booking for this event
        Optional<Booking> existingBooking = bookingRepository.findByUserIdAndEventId(userId, eventId);
        if (existingBooking.isPresent()) {
            throw new IllegalStateException("User already has a booking for this event");
        }
        
        // Check if event has available slots
        if (!event.hasAvailableSlots()) {
            throw new IllegalStateException("No available slots for this event");
        }
        
        // Check if registration is still open
        if (!event.isRegistrationOpen()) {
            throw new IllegalStateException("Registration is closed for this event");
        }
        
        // Create booking
        Booking booking = new Booking(user, event);
        booking.setNotes(notes);
        booking.setEmergencyContact(emergencyContact);
        
        return bookingRepository.save(booking);
    }
    
    /**
     * Get bookings by user with pagination
     */
    public Page<Booking> getBookingsByUser(Long userId, Pageable pageable) {
        return bookingRepository.findByUserIdWithDetails(userId, pageable);
    }
    
    /**
     * Get bookings by event
     */
    public List<Booking> getBookingsByEvent(Long eventId) {
        return bookingRepository.findByEventIdWithConfirmedStatus(eventId);
    }
    
    /**
     * Get booking by user and event
     */
    public Optional<Booking> getBookingByUserAndEvent(Long userId, Long eventId) {
        return bookingRepository.findByUserIdAndEventId(userId, eventId);
    }
    
    /**
     * Get upcoming bookings for user
     */
    public List<Booking> getUpcomingBookingsByUser(Long userId) {
        return bookingRepository.findUpcomingBookingsByUserId(userId);
    }
    
    /**
     * Update booking status
     */
    public Booking updateBookingStatus(Long bookingId, Booking.BookingStatus status) {
        Optional<Booking> bookingOpt = bookingRepository.findById(bookingId);
        if (bookingOpt.isEmpty()) {
            throw new IllegalArgumentException("Booking not found");
        }
        
        Booking booking = bookingOpt.get();
        booking.setBookingStatus(status);
        
        return bookingRepository.save(booking);
    }
    
    /**
     * Update payment status
     */
    public Booking updatePaymentStatus(Long bookingId, Booking.PaymentStatus paymentStatus, String paymentReference) {
        Optional<Booking> bookingOpt = bookingRepository.findById(bookingId);
        if (bookingOpt.isEmpty()) {
            throw new IllegalArgumentException("Booking not found");
        }
        
        Booking booking = bookingOpt.get();
        booking.setPaymentStatus(paymentStatus);
        booking.setPaymentReference(paymentReference);
        
        return bookingRepository.save(booking);
    }
    
    /**
     * Cancel booking
     */
    public Booking cancelBooking(Long bookingId) {
        Optional<Booking> bookingOpt = bookingRepository.findById(bookingId);
        if (bookingOpt.isEmpty()) {
            throw new IllegalArgumentException("Booking not found");
        }
        
        Booking booking = bookingOpt.get();
        
        // Check if booking can be cancelled
        if (!booking.canBeCancelled()) {
            throw new IllegalStateException("Booking cannot be cancelled");
        }
        
        booking.setBookingStatus(Booking.BookingStatus.CANCELLED);
        
        return bookingRepository.save(booking);
    }
    
    /**
     * Get booking statistics
     */
    public long getTotalBookings() {
        return bookingRepository.countTotalBookings();
    }
    
    /**
     * Get confirmed bookings count for event
     */
    public long getConfirmedBookingsCount(Long eventId) {
        return bookingRepository.countConfirmedBookingsByEventId(eventId);
    }
    
    /**
     * Get bookings by payment status
     */
    public List<Booking> getBookingsByPaymentStatus(Booking.PaymentStatus paymentStatus) {
        return bookingRepository.findByPaymentStatus(paymentStatus);
    }
    
    /**
     * Get bookings by booking status
     */
    public List<Booking> getBookingsByBookingStatus(Booking.BookingStatus bookingStatus) {
        return bookingRepository.findByBookingStatus(bookingStatus);
    }
    
    /**
     * Get recent bookings
     */
    public Page<Booking> getRecentBookings(LocalDateTime fromDate, Pageable pageable) {
        return bookingRepository.findRecentBookings(fromDate, pageable);
    }
    
    /**
     * Get bookings for events starting soon
     */
    public List<Booking> getBookingsForEventsStartingSoon(LocalDateTime endDate) {
        return bookingRepository.findBookingsForEventsStartingSoon(endDate);
    }
}
