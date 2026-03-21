package com.setec.backend.Service.Serviceimpl;

import com.setec.backend.Model.Hospital;
import com.setec.backend.Model.HospitalAdmin;
import com.setec.backend.Repository.HospitalAdminRepository;
import com.setec.backend.Repository.HospitalRepository;
import com.setec.backend.Service.HospitalService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Slf4j
@Service
@Transactional
public class HospitalServiceImpl implements HospitalService {

    private final HospitalRepository hospitalRepository;
    private final HospitalAdminRepository hospitalAdminRepository;

    public HospitalServiceImpl(HospitalRepository hospitalRepository, HospitalAdminRepository hospitalAdminRepository) {
        this.hospitalRepository = hospitalRepository;
        this.hospitalAdminRepository = hospitalAdminRepository;
    }

    @Override
    public Hospital registerHospital(String name, String email, String phone, String address, 
                                    String city, String state, String zipCode, String country,
                                    String registrationNumber, String licenseNumber) {
        log.info("Registering new hospital: {}", name);

        if (hospitalRepository.findByEmail(email).isPresent()) {
            log.warn("Hospital with email already exists: {}", email);
            throw new IllegalArgumentException("Hospital with this email already exists");
        }

        if (hospitalRepository.findByRegistrationNumber(registrationNumber).isPresent()) {
            log.warn("Hospital with registration number already exists: {}", registrationNumber);
            throw new IllegalArgumentException("Hospital with this registration number already exists");
        }

        Hospital hospital = new Hospital();
        hospital.setId(UUID.randomUUID());
        hospital.setName(name);
        hospital.setEmail(email);
        hospital.setPhone(phone);
        hospital.setAddress(address);
        hospital.setCity(city);
        hospital.setState(state);
        hospital.setZipCode(zipCode);
        hospital.setCountry(country);
        hospital.setRegistrationNumber(registrationNumber);
        hospital.setLicenseNumber(licenseNumber);
        hospital.setIsActive(true);
        hospital.setIsVerified(false);
        hospital.setTotalBloodUnits(0);
        hospital.setCreatedDate(LocalDateTime.now());
        hospital.setUpdatedDate(LocalDateTime.now());

        return hospitalRepository.save(hospital);
    }

    @Override
    public Optional<Hospital> getHospitalById(UUID id) {
        log.debug("Fetching hospital with id: {}", id);
        return hospitalRepository.findById(id);
    }

    @Override
    public Optional<Hospital> getHospitalByEmail(String email) {
        log.debug("Fetching hospital by email: {}", email);
        return hospitalRepository.findByEmail(email);
    }

    @Override
    public Optional<Hospital> getHospitalByRegistrationNumber(String registrationNumber) {
        log.debug("Fetching hospital by registration number: {}", registrationNumber);
        return hospitalRepository.findByRegistrationNumber(registrationNumber);
    }

    @Override
    public List<Hospital> getAllActiveHospitals() {
        log.debug("Fetching all active hospitals");
        return hospitalRepository.findAllByIsActiveTrue();
    }

    @Override
    public List<Hospital> getAllVerifiedHospitals() {
        log.debug("Fetching all verified hospitals");
        return hospitalRepository.findAllByIsVerifiedTrue();
    }

    @Override
    public List<Hospital> searchHospitalsByName(String name) {
        log.debug("Searching hospitals by name: {}", name);
        return hospitalRepository.findByNameContainingIgnoreCase(name);
    }

    @Override
    public Hospital updateHospital(UUID id, String name, String email, String phone, String address, 
                                   String city, String state, String zipCode, String country) {
        log.info("Updating hospital with id: {}", id);

        Hospital hospital = hospitalRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Hospital not found: " + id));

        // Check if email is already taken by another hospital
        if (!hospital.getEmail().equals(email) && hospitalRepository.findByEmail(email).isPresent()) {
            log.warn("Hospital with email already exists: {}", email);
            throw new IllegalArgumentException("Hospital with this email already exists");
        }

        hospital.setName(name);
        hospital.setEmail(email);
        hospital.setPhone(phone);
        hospital.setAddress(address);
        hospital.setCity(city);
        hospital.setState(state);
        hospital.setZipCode(zipCode);
        hospital.setCountry(country);
        hospital.setUpdatedDate(LocalDateTime.now());

        return hospitalRepository.save(hospital);
    }

    @Override
    public Hospital updateBloodBankCoordinator(UUID hospitalId, String coordinatorName, 
                                              String coordinatorEmail, String coordinatorPhone) {
        log.info("Updating blood bank coordinator for hospital: {}", hospitalId);

        Hospital hospital = hospitalRepository.findById(hospitalId)
                .orElseThrow(() -> new IllegalArgumentException("Hospital not found: " + hospitalId));

        hospital.setBloodBankCoordinatorName(coordinatorName);
        hospital.setBloodBankCoordinatorEmail(coordinatorEmail);
        hospital.setBloodBankCoordinatorPhone(coordinatorPhone);
        hospital.setUpdatedDate(LocalDateTime.now());

        return hospitalRepository.save(hospital);
    }

    @Override
    public Hospital verifyHospital(UUID id) {
        log.info("Verifying hospital with id: {}", id);

        Hospital hospital = hospitalRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Hospital not found: " + id));

        hospital.setIsVerified(true);
        hospital.setUpdatedDate(LocalDateTime.now());

        log.info("Hospital {} verified successfully", hospital.getName());
        return hospitalRepository.save(hospital);
    }

    @Override
    public void deactivateHospital(UUID id) {
        log.info("Deactivating hospital with id: {}", id);

        Hospital hospital = hospitalRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Hospital not found: " + id));

        hospital.setIsActive(false);
        hospital.setUpdatedDate(LocalDateTime.now());
        hospitalRepository.save(hospital);
    }

    @Override
    public HospitalAdmin addHospitalAdmin(UUID hospitalId, String email, String fullName, String phone) {
        log.info("Adding new admin to hospital: {}", hospitalId);

        Hospital hospital = hospitalRepository.findById(hospitalId)
                .orElseThrow(() -> new IllegalArgumentException("Hospital not found: " + hospitalId));

        if (hospitalAdminRepository.findByEmail(email).isPresent()) {
            log.warn("Hospital admin with email already exists: {}", email);
            throw new IllegalArgumentException("Admin with this email already exists");
        }

        HospitalAdmin admin = new HospitalAdmin();
        admin.setId(UUID.randomUUID());
        admin.setHospital(hospital);
        admin.setEmail(email);
        admin.setFullName(fullName);
        admin.setPhone(phone);
        admin.setIsActive(true);
        admin.setEmailVerified(false);
        admin.setIsSuperAdmin(false);
        admin.setCreatedDate(LocalDateTime.now());
        admin.setUpdatedDate(LocalDateTime.now());

        HospitalAdmin savedAdmin = hospitalAdminRepository.save(admin);
        hospital.getAdmins().add(savedAdmin);
        hospitalRepository.save(hospital);

        return savedAdmin;
    }

    @Override
    public List<HospitalAdmin> getHospitalAdmins(UUID hospitalId) {
        log.debug("Fetching all admins for hospital: {}", hospitalId);
        return hospitalAdminRepository.findByHospitalId(hospitalId);
    }

    @Override
    public List<HospitalAdmin> getActiveHospitalAdmins(UUID hospitalId) {
        log.debug("Fetching active admins for hospital: {}", hospitalId);
        return hospitalAdminRepository.findByHospitalIdAndIsActiveTrue(hospitalId);
    }

    @Override
    public void deactivateHospitalAdmin(UUID adminId) {
        log.info("Deactivating hospital admin with id: {}", adminId);

        HospitalAdmin admin = hospitalAdminRepository.findById(adminId)
                .orElseThrow(() -> new IllegalArgumentException("Hospital admin not found: " + adminId));

        admin.setIsActive(false);
        admin.setUpdatedDate(LocalDateTime.now());
        hospitalAdminRepository.save(admin);
    }

    @Override
    public boolean isHospitalVerified(UUID hospitalId) {
        log.debug("Checking if hospital is verified: {}", hospitalId);

        Hospital hospital = hospitalRepository.findById(hospitalId)
                .orElseThrow(() -> new IllegalArgumentException("Hospital not found: " + hospitalId));

        return hospital.getIsVerified();
    }

    @Override
    public Hospital updateTotalBloodUnits(UUID hospitalId, Integer totalUnits) {
        log.info("Updating total blood units for hospital: {}", hospitalId);

        Hospital hospital = hospitalRepository.findById(hospitalId)
                .orElseThrow(() -> new IllegalArgumentException("Hospital not found: " + hospitalId));

        hospital.setTotalBloodUnits(totalUnits);
        hospital.setUpdatedDate(LocalDateTime.now());

        return hospitalRepository.save(hospital);
    }
}
