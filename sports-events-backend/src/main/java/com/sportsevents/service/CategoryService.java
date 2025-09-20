package com.sportsevents.service;

import com.sportsevents.model.Category;
import com.sportsevents.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service for Category operations with caching
 */
@Service
@Transactional
public class CategoryService {
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    /**
     * Get all categories (cached)
     */
    @Cacheable("categories")
    public List<Category> getAllCategories() {
        return categoryRepository.findAllByOrderByNameAsc();
    }
    
    /**
     * Get categories with active events (cached)
     */
    @Cacheable("categories")
    public List<Category> getCategoriesWithActiveEvents() {
        return categoryRepository.findCategoriesWithActiveEvents();
    }
    
    /**
     * Get category by ID
     */
    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }
    
    /**
     * Get category by name (cached)
     */
    @Cacheable("categories")
    public Optional<Category> getCategoryByName(String name) {
        return categoryRepository.findByName(name);
    }
    
    /**
     * Create new category (evicts cache)
     */
    @CacheEvict(value = "categories", allEntries = true)
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }
    
    /**
     * Update category (evicts cache)
     */
    @CacheEvict(value = "categories", allEntries = true)
    public Category updateCategory(Category category) {
        return categoryRepository.save(category);
    }
    
    /**
     * Delete category (evicts cache)
     */
    @CacheEvict(value = "categories", allEntries = true)
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
    
    /**
     * Check if category name exists
     */
    public boolean categoryNameExists(String name) {
        return categoryRepository.existsByName(name);
    }
}
