package com.sportsevents.controller;

import com.sportsevents.model.Booking;
import com.sportsevents.service.BookingService;
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

/**
 * REST Controller for Booking operations
 */
@RestController
@RequestMapping("/api/bookings")
@Tag(name = "Bookings", description = "API for managing event bookings")
@CrossOrigin(origins = "*")
public class BookingController {
    
    @Autowired
    private BookingService bookingService;
    
    /**
     * Create new booking
     */
    @PostMapping
    @Operation(summary = "Create new booking", description = "Create a new event booking for a user")
    public ResponseEntity<Booking> createBooking(
            @Parameter(description = "User ID") @RequestParam Long userId,
            @Parameter(description = "Event ID") @RequestParam Long eventId,
            @Parameter(description = "Additional notes") @RequestParam(required = false) String notes,
            @Parameter(description = "Emergency contact") @RequestParam(required = false) String emergencyContact) {
        
        try {
            Booking booking = bookingService.createBooking(userId, eventId, notes, emergencyContact);
            return ResponseEntity.ok(booking);
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Get bookings by user
     */
    @GetMapping("/user/{userId}")
    @Operation(summary = "Get user bookings", description = "Retrieve all bookings for a specific user")
    public ResponseEntity<Page<Booking>> getBookingsByUser(
            @PathVariable Long userId,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size, Sort.by("bookingDate").descending());
        Page<Booking> bookings = bookingService.getBookingsByUser(userId, pageable);
        
        return ResponseEntity.ok(bookings);
    }
    
    /**
     * Get bookings by event
     */
    @GetMapping("/event/{eventId}")
    @Operation(summary = "Get event bookings", description = "Retrieve all bookings for a specific event")
    public ResponseEntity<List<Booking>> getBookingsByEvent(@PathVariable Long eventId) {
        List<Booking> bookings = bookingService.getBookingsByEvent(eventId);
        return ResponseEntity.ok(bookings);
    }
    
    /**
     * Get upcoming bookings for user
     */
    @GetMapping("/user/{userId}/upcoming")
    @Operation(summary = "Get upcoming user bookings", description = "Retrieve upcoming bookings for a specific user")
    public ResponseEntity<List<Booking>> getUpcomingBookingsByUser(@PathVariable Long userId) {
        List<Booking> bookings = bookingService.getUpcomingBookingsByUser(userId);
        return ResponseEntity.ok(bookings);
    }
    
    /**
     * Get booking by user and event
     */
    @GetMapping("/user/{userId}/event/{eventId}")
    @Operation(summary = "Get booking by user and event", description = "Check if user has a booking for specific event")
    public ResponseEntity<Booking> getBookingByUserAndEvent(
            @PathVariable Long userId,
            @PathVariable Long eventId) {
        
        return bookingService.getBookingByUserAndEvent(userId, eventId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Update booking status
     */
    @PutMapping("/{bookingId}/status")
    @Operation(summary = "Update booking status", description = "Update the status of a booking")
    public ResponseEntity<Booking> updateBookingStatus(
            @PathVariable Long bookingId,
            @Parameter(description = "New booking status") @RequestParam Booking.BookingStatus status) {
        
        try {
            Booking booking = bookingService.updateBookingStatus(bookingId, status);
            return ResponseEntity.ok(booking);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Update payment status
     */
    @PutMapping("/{bookingId}/payment")
    @Operation(summary = "Update payment status", description = "Update the payment status of a booking")
    public ResponseEntity<Booking> updatePaymentStatus(
            @PathVariable Long bookingId,
            @Parameter(description = "New payment status") @RequestParam Booking.PaymentStatus paymentStatus,
            @Parameter(description = "Payment reference") @RequestParam(required = false) String paymentReference) {
        
        try {
            Booking booking = bookingService.updatePaymentStatus(bookingId, paymentStatus, paymentReference);
            return ResponseEntity.ok(booking);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Cancel booking
     */
    @PutMapping("/{bookingId}/cancel")
    @Operation(summary = "Cancel booking", description = "Cancel a booking if it's allowed")
    public ResponseEntity<Booking> cancelBooking(@PathVariable Long bookingId) {
        try {
            Booking booking = bookingService.cancelBooking(bookingId);
            return ResponseEntity.ok(booking);
        } catch (IllegalArgumentException | IllegalStateException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * Get booking statistics
     */
    @GetMapping("/stats")
    @Operation(summary = "Get booking statistics", description = "Get overall booking statistics")
    public ResponseEntity<Long> getBookingStats() {
        long totalBookings = bookingService.getTotalBookings();
        return ResponseEntity.ok(totalBookings);
    }
    
    /**
     * Get confirmed bookings count for event
     */
    @GetMapping("/event/{eventId}/count")
    @Operation(summary = "Get confirmed bookings count", description = "Get count of confirmed bookings for an event")
    public ResponseEntity<Long> getConfirmedBookingsCount(@PathVariable Long eventId) {
        long count = bookingService.getConfirmedBookingsCount(eventId);
        return ResponseEntity.ok(count);
    }
    
    /**
     * Get recent bookings
     */
    @GetMapping("/recent")
    @Operation(summary = "Get recent bookings", description = "Retrieve recent bookings with pagination")
    public ResponseEntity<Page<Booking>> getRecentBookings(
            @Parameter(description = "Days back to look") @RequestParam(defaultValue = "7") int daysBack,
            @Parameter(description = "Page number (0-based)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "20") int size) {
        
        LocalDateTime fromDate = LocalDateTime.now().minusDays(daysBack);
        Pageable pageable = PageRequest.of(page, size, Sort.by("bookingDate").descending());
        Page<Booking> bookings = bookingService.getRecentBookings(fromDate, pageable);
        
        return ResponseEntity.ok(bookings);
    }
}
