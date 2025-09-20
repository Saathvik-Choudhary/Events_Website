package com.sportsevents;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.ComponentScan;

/**
 * Main Spring Boot application class for Sports Events Platform
 * Optimized for performance with lazy initialization and caching
 */
@SpringBootApplication
@EnableCaching
@ComponentScan(basePackages = "com.sportsevents")
public class SportsEventsApplication {

    public static void main(String[] args) {
        // Performance optimization: lazy initialization
        System.setProperty("spring.main.lazy-initialization", "true");
        
        SpringApplication app = new SpringApplication(SportsEventsApplication.class);
        
        // Additional performance optimizations
        app.setLazyInitialization(true);
        app.run(args);
    }
}
