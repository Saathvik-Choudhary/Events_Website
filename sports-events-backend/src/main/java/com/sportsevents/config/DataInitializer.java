package com.sportsevents.config;

import com.sportsevents.model.*;
import com.sportsevents.repository.CategoryRepository;
import com.sportsevents.repository.VenueRepository;
import com.sportsevents.repository.EventRepository;
import com.sportsevents.repository.UserRepository;
import com.sportsevents.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Data initializer for development and testing
 */
@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    @Autowired
    private VenueRepository venueRepository;
    
    @Autowired
    private EventRepository eventRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private BookingRepository bookingRepository;
    
    @Override
    public void run(String... args) throws Exception {
        initializeData();
    }
    
    private void initializeData() {
        // Initialize categories
        initializeCategories();
        
        // Initialize venues
        initializeVenues();
        
        // Initialize users
        initializeUsers();
        
        // Initialize events
        initializeEvents();
        
        // Initialize bookings
        initializeBookings();
    }
    
    private void initializeCategories() {
        if (categoryRepository.count() == 0) {
            Category running = new Category("Running", "Running and marathon events");
            running.setIconUrl("https://cdn-icons-png.flaticon.com/512/2936/2936886.png");
            categoryRepository.save(running);
            
            Category cycling = new Category("Cycling", "Cycling and bike events");
            cycling.setIconUrl("https://cdn-icons-png.flaticon.com/512/2936/2936886.png");
            categoryRepository.save(cycling);
            
            Category swimming = new Category("Swimming", "Swimming and water sports events");
            swimming.setIconUrl("https://cdn-icons-png.flaticon.com/512/2936/2936886.png");
            categoryRepository.save(swimming);
            
            Category football = new Category("Football", "Football and soccer events");
            football.setIconUrl("https://cdn-icons-png.flaticon.com/512/2936/2936886.png");
            categoryRepository.save(football);
            
            Category basketball = new Category("Basketball", "Basketball events");
            basketball.setIconUrl("https://cdn-icons-png.flaticon.com/512/2936/2936886.png");
            categoryRepository.save(basketball);
            
            Category tennis = new Category("Tennis", "Tennis events");
            tennis.setIconUrl("https://cdn-icons-png.flaticon.com/512/2936/2936886.png");
            categoryRepository.save(tennis);
        }
    }
    
    private void initializeVenues() {
        if (venueRepository.count() == 0) {
            Venue venue1 = new Venue("Kanteerava Stadium", "Kanteerava Indoor Stadium, Bangalore", "Bangalore");
            venue1.setState("Karnataka");
            venue1.setCountry("India");
            venue1.setPostalCode("560001");
            venue1.setCapacity(8000);
            venue1.setImageUrl("https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500");
            venue1.setDescription("Modern indoor stadium with excellent facilities");
            venue1.setAmenities("Parking, Food Court, Medical Room, Changing Rooms");
            venueRepository.save(venue1);
            
            Venue venue2 = new Venue("Cubbon Park", "Cubbon Park, Bangalore", "Bangalore");
            venue2.setState("Karnataka");
            venue2.setCountry("India");
            venue2.setPostalCode("560001");
            venue2.setCapacity(2000);
            venue2.setImageUrl("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500");
            venue2.setDescription("Beautiful park setting for outdoor events");
            venue2.setAmenities("Parking, Restrooms, Food Stalls");
            venueRepository.save(venue2);
            
            Venue venue3 = new Venue("Lalbagh Botanical Garden", "Lalbagh, Bangalore", "Bangalore");
            venue3.setState("Karnataka");
            venue3.setCountry("India");
            venue3.setPostalCode("560004");
            venue3.setCapacity(1500);
            venue3.setImageUrl("https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500");
            venue3.setDescription("Scenic botanical garden for nature events");
            venue3.setAmenities("Parking, Restrooms, Garden Cafe");
            venueRepository.save(venue3);
            
            Venue venue4 = new Venue("Eco Park", "Eco Park, Bangalore", "Bangalore");
            venue4.setState("Karnataka");
            venue4.setCountry("India");
            venue4.setPostalCode("560083");
            venue4.setCapacity(3000);
            venue4.setImageUrl("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500");
            venue4.setDescription("Eco-friendly venue with modern amenities");
            venue4.setAmenities("Parking, Food Court, Medical Room, Eco-Friendly");
            venueRepository.save(venue4);
        }
    }
    
    private void initializeUsers() {
        if (userRepository.count() == 0) {
            User user1 = new User("John", "Doe", "john.doe@example.com");
            user1.setPhoneNumber("+91 9876543210");
            user1.setCity("Bangalore");
            user1.setState("Karnataka");
            userRepository.save(user1);
            
            User user2 = new User("Jane", "Smith", "jane.smith@example.com");
            user2.setPhoneNumber("+91 9876543211");
            user2.setCity("Bangalore");
            user2.setState("Karnataka");
            userRepository.save(user2);
            
            User user3 = new User("Mike", "Johnson", "mike.johnson@example.com");
            user3.setPhoneNumber("+91 9876543212");
            user3.setCity("Bangalore");
            user3.setState("Karnataka");
            userRepository.save(user3);
        }
    }
    
    private void initializeEvents() {
        if (eventRepository.count() == 0) {
            Category runningCategory = categoryRepository.findByName("Running").orElse(null);
            Category cyclingCategory = categoryRepository.findByName("Cycling").orElse(null);
            Category swimmingCategory = categoryRepository.findByName("Swimming").orElse(null);
            
            Venue venue1 = venueRepository.findByName("Kanteerava Stadium").orElse(null);
            Venue venue2 = venueRepository.findByName("Cubbon Park").orElse(null);
            Venue venue3 = venueRepository.findByName("Lalbagh Botanical Garden").orElse(null);
            
            if (runningCategory != null && venue1 != null) {
                Event marathon = new Event(
                    "Bangalore Marathon 2024",
                    "Join us for the annual Bangalore Marathon featuring 5K, 10K, and 21K runs through the city's beautiful streets.",
                    LocalDateTime.now().plusDays(30),
                    LocalDateTime.now().minusDays(10),
                    LocalDateTime.now().plusDays(25),
                    runningCategory,
                    venue1
                );
                marathon.setEventType(Event.EventType.MARATHON);
                marathon.setDifficultyLevel(Event.DifficultyLevel.INTERMEDIATE);
                marathon.setMaxParticipants(1000);
                marathon.setPrice(new BigDecimal("500.00"));
                marathon.setImageUrl("https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800");
                marathon.setBannerUrl("https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200");
                marathon.setRules("Participants must be 16+ years old. Medical certificate required.");
                marathon.setPrizeInfo("Winner: Rs. 50,000, Runner-up: Rs. 25,000, Third place: Rs. 10,000");
                marathon.setContactInfo("Email: marathon@bangalore.com, Phone: +91 9876543210");
                eventRepository.save(marathon);
            }
            
            if (cyclingCategory != null && venue2 != null) {
                Event cycling = new Event(
                    "City Cycling Challenge",
                    "A fun cycling event through Bangalore's iconic locations. Perfect for all skill levels.",
                    LocalDateTime.now().plusDays(45),
                    LocalDateTime.now().minusDays(5),
                    LocalDateTime.now().plusDays(40),
                    cyclingCategory,
                    venue2
                );
                cycling.setEventType(Event.EventType.CYCLING);
                cycling.setDifficultyLevel(Event.DifficultyLevel.BEGINNER);
                cycling.setMaxParticipants(500);
                cycling.setPrice(new BigDecimal("300.00"));
                cycling.setImageUrl("https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=800");
                cycling.setBannerUrl("https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1200");
                cycling.setRules("Helmet mandatory. Own bicycle required.");
                cycling.setPrizeInfo("Winner: Rs. 20,000, Runner-up: Rs. 10,000");
                cycling.setContactInfo("Email: cycling@bangalore.com, Phone: +91 9876543211");
                eventRepository.save(cycling);
            }
            
            if (swimmingCategory != null && venue1 != null) {
                Event swimming = new Event(
                    "Swimming Championship",
                    "Competitive swimming event with multiple categories and age groups.",
                    LocalDateTime.now().plusDays(60),
                    LocalDateTime.now().minusDays(15),
                    LocalDateTime.now().plusDays(55),
                    swimmingCategory,
                    venue1
                );
                swimming.setEventType(Event.EventType.SWIMMING);
                swimming.setDifficultyLevel(Event.DifficultyLevel.ADVANCED);
                swimming.setMaxParticipants(200);
                swimming.setPrice(new BigDecimal("400.00"));
                swimming.setImageUrl("https://images.unsplash.com/photo-1530549387789-4c1017266635?w=800");
                swimming.setBannerUrl("https://images.unsplash.com/photo-1530549387789-4c1017266635?w=1200");
                swimming.setRules("Swimming certificate required. Age groups: 16-25, 26-40, 40+");
                swimming.setPrizeInfo("Winner: Rs. 30,000, Runner-up: Rs. 15,000, Third place: Rs. 5,000");
                swimming.setContactInfo("Email: swimming@bangalore.com, Phone: +91 9876543212");
                eventRepository.save(swimming);
            }
        }
    }
    
    private void initializeBookings() {
        if (bookingRepository.count() == 0) {
            User user1 = userRepository.findByEmail("john.doe@example.com").orElse(null);
            User user2 = userRepository.findByEmail("jane.smith@example.com").orElse(null);
            
            Event marathon = eventRepository.findByTitle("Bangalore Marathon 2024").stream().findFirst().orElse(null);
            Event cycling = eventRepository.findByTitle("City Cycling Challenge").stream().findFirst().orElse(null);
            
            if (user1 != null && marathon != null) {
                Booking booking1 = new Booking(user1, marathon);
                booking1.setPaymentStatus(Booking.PaymentStatus.COMPLETED);
                booking1.setPaymentReference("PAY123456789");
                booking1.setNotes("First time participant");
                booking1.setEmergencyContact("+91 9876543210");
                bookingRepository.save(booking1);
            }
            
            if (user2 != null && cycling != null) {
                Booking booking2 = new Booking(user2, cycling);
                booking2.setPaymentStatus(Booking.PaymentStatus.PENDING);
                booking2.setNotes("Bringing own bicycle");
                booking2.setEmergencyContact("+91 9876543211");
                bookingRepository.save(booking2);
            }
        }
    }
}
