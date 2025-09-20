package com.sportsevents.service;

import com.sportsevents.model.User;
import com.sportsevents.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service for User operations
 */
@Service
@Transactional
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    /**
     * Get user by ID
     */
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    
    /**
     * Get user by email
     */
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    /**
     * Get users by city
     */
    public List<User> getUsersByCity(String city) {
        return userRepository.findByCity(city);
    }
    
    /**
     * Get users with upcoming bookings
     */
    public List<User> getUsersWithUpcomingBookings() {
        return userRepository.findUsersWithUpcomingBookings();
    }
    
    /**
     * Create new user
     */
    public User createUser(User user) {
        return userRepository.save(user);
    }
    
    /**
     * Update user
     */
    public User updateUser(User user) {
        return userRepository.save(user);
    }
    
    /**
     * Delete user
     */
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }
    
    /**
     * Check if email exists
     */
    public boolean emailExists(String email) {
        return userRepository.existsByEmail(email);
    }
    
    /**
     * Get total user count
     */
    public long getTotalUserCount() {
        return userRepository.countTotalUsers();
    }
    
    /**
     * Validate user data
     */
    public boolean isValidUser(User user) {
        return user != null && 
               user.getFirstName() != null && !user.getFirstName().trim().isEmpty() &&
               user.getLastName() != null && !user.getLastName().trim().isEmpty() &&
               user.getEmail() != null && !user.getEmail().trim().isEmpty() &&
               user.getEmail().contains("@");
    }
}
