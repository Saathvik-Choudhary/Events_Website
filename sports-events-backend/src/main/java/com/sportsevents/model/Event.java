package com.sportsevents.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * Event entity for sports events
 */
@Entity
@Table(name = "events")
@Cacheable
public class Event {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotBlank(message = "Event title is required")
    @Size(max = 200, message = "Event title must not exceed 200 characters")
    @Column(nullable = false)
    private String title;
    
    @Size(max = 1000, message = "Description must not exceed 1000 characters")
    @Column(length = 1000)
    private String description;
    
    @NotNull(message = "Event date is required")
    @Column(name = "event_date", nullable = false)
    private LocalDateTime eventDate;
    
    @NotNull(message = "Registration start date is required")
    @Column(name = "registration_start_date", nullable = false)
    private LocalDateTime registrationStartDate;
    
    @NotNull(message = "Registration end date is required")
    @Column(name = "registration_end_date", nullable = false)
    private LocalDateTime registrationEndDate;
    
    @Min(value = 1, message = "Maximum participants must be at least 1")
    @Column(name = "max_participants")
    private Integer maxParticipants;
    
    @Min(value = 0, message = "Price cannot be negative")
    @Column(precision = 10, scale = 2)
    private BigDecimal price;
    
    @Column(name = "image_url")
    private String imageUrl;
    
    @Column(name = "banner_url")
    private String bannerUrl;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "event_type", nullable = false)
    private EventType eventType;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "difficulty_level")
    private DifficultyLevel difficultyLevel;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private EventStatus status = EventStatus.ACTIVE;
    
    @Column(name = "rules", length = 2000)
    private String rules;
    
    @Column(name = "prize_info", length = 1000)
    private String prizeInfo;
    
    @Column(name = "contact_info", length = 500)
    private String contactInfo;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "venue_id", nullable = false)
    private Venue venue;
    
    @OneToMany(mappedBy = "event", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Booking> bookings = new ArrayList<>();
    
    public enum EventType {
        RUNNING, CYCLING, SWIMMING, FOOTBALL, BASKETBALL, TENNIS, 
        CRICKET, VOLLEYBALL, BADMINTON, TABLE_TENNIS, ATHLETICS, 
        MARATHON, TRIATHLON, OTHER
    }
    
    public enum DifficultyLevel {
        BEGINNER, INTERMEDIATE, ADVANCED, EXPERT
    }
    
    public enum EventStatus {
        ACTIVE, INACTIVE, CANCELLED, COMPLETED
    }
    
    // Constructors
    public Event() {}
    
    public Event(String title, String description, LocalDateTime eventDate, 
                 LocalDateTime registrationStartDate, LocalDateTime registrationEndDate,
                 Category category, Venue venue) {
        this.title = title;
        this.description = description;
        this.eventDate = eventDate;
        this.registrationStartDate = registrationStartDate;
        this.registrationEndDate = registrationEndDate;
        this.category = category;
        this.venue = venue;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    // Lifecycle callbacks
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    
    public LocalDateTime getEventDate() { return eventDate; }
    public void setEventDate(LocalDateTime eventDate) { this.eventDate = eventDate; }
    
    public LocalDateTime getRegistrationStartDate() { return registrationStartDate; }
    public void setRegistrationStartDate(LocalDateTime registrationStartDate) { 
        this.registrationStartDate = registrationStartDate; 
    }
    
    public LocalDateTime getRegistrationEndDate() { return registrationEndDate; }
    public void setRegistrationEndDate(LocalDateTime registrationEndDate) { 
        this.registrationEndDate = registrationEndDate; 
    }
    
    public Integer getMaxParticipants() { return maxParticipants; }
    public void setMaxParticipants(Integer maxParticipants) { this.maxParticipants = maxParticipants; }
    
    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }
    
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    
    public String getBannerUrl() { return bannerUrl; }
    public void setBannerUrl(String bannerUrl) { this.bannerUrl = bannerUrl; }
    
    public EventType getEventType() { return eventType; }
    public void setEventType(EventType eventType) { this.eventType = eventType; }
    
    public DifficultyLevel getDifficultyLevel() { return difficultyLevel; }
    public void setDifficultyLevel(DifficultyLevel difficultyLevel) { this.difficultyLevel = difficultyLevel; }
    
    public EventStatus getStatus() { return status; }
    public void setStatus(EventStatus status) { this.status = status; }
    
    public String getRules() { return rules; }
    public void setRules(String rules) { this.rules = rules; }
    
    public String getPrizeInfo() { return prizeInfo; }
    public void setPrizeInfo(String prizeInfo) { this.prizeInfo = prizeInfo; }
    
    public String getContactInfo() { return contactInfo; }
    public void setContactInfo(String contactInfo) { this.contactInfo = contactInfo; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    public Category getCategory() { return category; }
    public void setCategory(Category category) { this.category = category; }
    
    public Venue getVenue() { return venue; }
    public void setVenue(Venue venue) { this.venue = venue; }
    
    public List<Booking> getBookings() { return bookings; }
    public void setBookings(List<Booking> bookings) { this.bookings = bookings; }
    
    // Helper methods
    public boolean isRegistrationOpen() {
        LocalDateTime now = LocalDateTime.now();
        return now.isAfter(registrationStartDate) && now.isBefore(registrationEndDate) && status == EventStatus.ACTIVE;
    }
    
    public int getCurrentParticipants() {
        return bookings != null ? bookings.size() : 0;
    }
    
    public boolean hasAvailableSlots() {
        return maxParticipants == null || getCurrentParticipants() < maxParticipants;
    }
    
    @Override
    public String toString() {
        return "Event{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", eventDate=" + eventDate +
                ", status=" + status +
                '}';
    }
}
