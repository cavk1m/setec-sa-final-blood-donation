package com.setec.backend.Repository;

import com.setec.backend.Model.HospitalAdmin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface HospitalAdminRepository extends JpaRepository<HospitalAdmin, UUID> {
    Optional<HospitalAdmin> findByEmail(String email);
    
    List<HospitalAdmin> findByHospitalId(UUID hospitalId);
    
    List<HospitalAdmin> findAllByIsActiveTrue();
    
    List<HospitalAdmin> findByHospitalIdAndIsActiveTrue(UUID hospitalId);
}
