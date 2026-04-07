package com.setec.backend.Repository;

import com.setec.backend.Model.Hospital;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface HospitalRepository extends JpaRepository<Hospital, UUID> {
    Optional<Hospital> findByEmail(String email);
    
    Optional<Hospital> findByRegistrationNumber(String registrationNumber);
    
    List<Hospital> findAllByIsActiveTrue();
    
    List<Hospital> findAllByIsVerifiedTrue();
    
    List<Hospital> findByNameContainingIgnoreCase(String name);
}
