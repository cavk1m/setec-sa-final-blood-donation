package com.setec.backend.Repository;

import com.setec.backend.Model.blood_donations;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BloodDonationRepository extends JpaRepository<blood_donations, UUID> {
}