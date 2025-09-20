package com.sportsevents.controller;

import com.sportsevents.model.Category;
import com.sportsevents.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * REST Controller for Category operations
 */
@RestController
@RequestMapping("/api/categories")
@Tag(name = "Categories", description = "API for managing event categories")
@CrossOrigin(origins = "*")
public class CategoryController {
    
    @Autowired
    private CategoryService categoryService;
    
    /**
     * Get all categories
     */
    @GetMapping
    @Operation(summary = "Get all categories", description = "Retrieve all available event categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        List<Category> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }
    
    /**
     * Get categories with active events
     */
    @GetMapping("/with-events")
    @Operation(summary = "Get categories with active events", description = "Retrieve categories that have active events")
    public ResponseEntity<List<Category>> getCategoriesWithActiveEvents() {
        List<Category> categories = categoryService.getCategoriesWithActiveEvents();
        return ResponseEntity.ok(categories);
    }
    
    /**
     * Get category by ID
     */
    @GetMapping("/{id}")
    @Operation(summary = "Get category by ID", description = "Retrieve a specific category by its ID")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id) {
        Optional<Category> category = categoryService.getCategoryById(id);
        return category.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
    
    /**
     * Get category by name
     */
    @GetMapping("/name/{name}")
    @Operation(summary = "Get category by name", description = "Retrieve a specific category by its name")
    public ResponseEntity<Category> getCategoryByName(@PathVariable String name) {
        Optional<Category> category = categoryService.getCategoryByName(name);
        return category.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
}
