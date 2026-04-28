package com.setec.backend.Repository;

import com.setec.backend.Model.locations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;
import java.util.List;

@Repository
public interface LocationRepository extends JpaRepository<locations, UUID> {
    
    // Find location by ID
    Optional<locations> findById(UUID id);
    
    // Find all locations
    List<locations> findAll();
    
    // Find location by name
    Optional<locations> findByName(String name);
}
