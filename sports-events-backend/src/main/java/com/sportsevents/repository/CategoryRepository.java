package com.sportsevents.repository;

import com.sportsevents.model.Category;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for Category entity with caching
 */
@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    
    /**
     * Find category by name (cached)
     */
    @Cacheable("categories")
    Optional<Category> findByName(String name);
    
    /**
     * Find all categories ordered by name (cached)
     */
    @Cacheable("categories")
    List<Category> findAllByOrderByNameAsc();
    
    /**
     * Find categories with active events
     */
    @Query("SELECT DISTINCT c FROM Category c " +
           "INNER JOIN c.events e " +
           "WHERE e.status = 'ACTIVE' " +
           "ORDER BY c.name ASC")
    List<Category> findCategoriesWithActiveEvents();
    
    /**
     * Check if category name exists
     */
    boolean existsByName(String name);
}
