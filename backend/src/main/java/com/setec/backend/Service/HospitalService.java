package com.setec.backend.Service;

import com.setec.backend.Model.Hospital;
import com.setec.backend.Model.HospitalAdmin;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface HospitalService {
    /**
     * Register a new hospital
     */
    Hospital registerHospital(String name, String email, String phone, String address, 
                            String city, String state, String zipCode, String country,
                            String registrationNumber, String licenseNumber);

    /**
     * Get hospital by UUID
     */
    Optional<Hospital> getHospitalById(UUID id);

    /**
     * Get hospital by email
     */
    Optional<Hospital> getHospitalByEmail(String email);

    /**
     * Get hospital by registration number
     */
    Optional<Hospital> getHospitalByRegistrationNumber(String registrationNumber);

    /**
     * Get all active hospitals
     */
    List<Hospital> getAllActiveHospitals();

    /**
     * Get all verified hospitals
     */
    List<Hospital> getAllVerifiedHospitals();

    /**
     * Search hospitals by name
     */
    List<Hospital> searchHospitalsByName(String name);

    /**
     * Update hospital information
     */
    Hospital updateHospital(UUID id, String name, String email, String phone, String address, 
                           String city, String state, String zipCode, String country);

    /**
     * Update blood bank coordinator information
     */
    Hospital updateBloodBankCoordinator(UUID hospitalId, String coordinatorName, 
                                       String coordinatorEmail, String coordinatorPhone);

    /**
     * Verify hospital (by super admin)
     */
    Hospital verifyHospital(UUID id);

    /**
     * Deactivate hospital
     */
    void deactivateHospital(UUID id);

    /**
     * Add hospital admin
     */
    HospitalAdmin addHospitalAdmin(UUID hospitalId, String email, String fullName, String phone);

    /**
     * Get hospital admins
     */
    List<HospitalAdmin> getHospitalAdmins(UUID hospitalId);

    /**
     * Get active hospital admins
     */
    List<HospitalAdmin> getActiveHospitalAdmins(UUID hospitalId);

    /**
     * Deactivate hospital admin
     */
    void deactivateHospitalAdmin(UUID adminId);

    /**
     * Check if hospital is verified
     */
    boolean isHospitalVerified(UUID hospitalId);

    /**
     * Update total blood units in hospital
     */
    Hospital updateTotalBloodUnits(UUID hospitalId, Integer totalUnits);
}
