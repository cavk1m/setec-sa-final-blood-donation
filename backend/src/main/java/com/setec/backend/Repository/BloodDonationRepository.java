package com.setec.backend.Repository;

import com.setec.backend.Model.blood_donations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface BloodDonationRepository extends JpaRepository<blood_donations, UUID> {

    @Query("SELECT d FROM blood_donations d LEFT JOIN FETCH d.location WHERE d.user.id = :userId")
    List<blood_donations> findByUserId(@Param("userId") UUID userId);
}