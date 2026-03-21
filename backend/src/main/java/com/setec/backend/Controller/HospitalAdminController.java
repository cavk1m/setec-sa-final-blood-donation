package com.setec.backend.Controller;

import com.setec.backend.Dto.HospitalAdminRequest;
import com.setec.backend.Dto.HospitalResponse;
import com.setec.backend.Model.Hospital;
import com.setec.backend.Model.HospitalAdmin;
import com.setec.backend.Security.RequirePermission;
import com.setec.backend.Service.HospitalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/hospitals")
@Tag(name = "Hospital Management", description = "APIs for hospital registration, management, and blood bank coordination")
@SecurityRequirement(name = "bearerAuth")
public class HospitalAdminController {

    private final HospitalService hospitalService;

    public HospitalAdminController(HospitalService hospitalService) {
        this.hospitalService = hospitalService;
    }

    /**
     * Register a new hospital
     */
    @PostMapping("/register")
    public ResponseEntity<HospitalResponse> registerHospital(@RequestBody HospitalRegistrationRequest request) {
        log.info("Registering new hospital: {}", request.getName());
        Hospital hospital = hospitalService.registerHospital(
                request.getName(),
                request.getEmail(),
                request.getPhone(),
                request.getAddress(),
                request.getCity(),
                request.getState(),
                request.getZipCode(),
                request.getCountry(),
                request.getRegistrationNumber(),
                request.getLicenseNumber()
        );
        
        if (request.getBloodBankCoordinatorName() != null) {
            hospitalService.updateBloodBankCoordinator(
                    hospital.getId(),
                    request.getBloodBankCoordinatorName(),
                    request.getBloodBankCoordinatorEmail(),
                    request.getBloodBankCoordinatorPhone()
            );
        }
        
        return ResponseEntity.ok(convertToHospitalResponse(hospital));
    }

    /**
     * Get hospital details
     */
    @GetMapping("/{hospitalId}")
    @RequirePermission("HOSPITAL_READ")
    public ResponseEntity<HospitalResponse> getHospital(@PathVariable UUID hospitalId) {
        log.info("Fetching hospital with id: {}", hospitalId);
        Hospital hospital = hospitalService.getHospitalById(hospitalId)
                .orElseThrow(() -> new IllegalArgumentException("Hospital not found: " + hospitalId));
        return ResponseEntity.ok(convertToHospitalResponse(hospital));
    }

    /**
     * Update hospital information
     */
    @PutMapping("/{hospitalId}")
    @RequirePermission("HOSPITAL_UPDATE")
    public ResponseEntity<HospitalResponse> updateHospital(
            @PathVariable UUID hospitalId,
            @RequestBody HospitalUpdateRequest request) {
        log.info("Updating hospital with id: {}", hospitalId);
        Hospital hospital = hospitalService.updateHospital(
                hospitalId,
                request.getName(),
                request.getEmail(),
                request.getPhone(),
                request.getAddress(),
                request.getCity(),
                request.getState(),
                request.getZipCode(),
                request.getCountry()
        );
        return ResponseEntity.ok(convertToHospitalResponse(hospital));
    }

    /**
     * Update blood bank coordinator
     */
    @PutMapping("/{hospitalId}/coordinator")
    @RequirePermission("HOSPITAL_UPDATE")
    public ResponseEntity<HospitalResponse> updateCoordinator(
            @PathVariable UUID hospitalId,
            @RequestBody CoordinatorRequest request) {
        log.info("Updating blood bank coordinator for hospital: {}", hospitalId);
        Hospital hospital = hospitalService.updateBloodBankCoordinator(
                hospitalId,
                request.getName(),
                request.getEmail(),
                request.getPhone()
        );
        return ResponseEntity.ok(convertToHospitalResponse(hospital));
    }

    /**
     * Get all hospital admins
     */
    @GetMapping("/{hospitalId}/admins")
    @RequirePermission("ADMIN_LIST")
    public ResponseEntity<List<HospitalAdminResponse>> getHospitalAdmins(@PathVariable UUID hospitalId) {
        log.info("Fetching admins for hospital: {}", hospitalId);
        List<HospitalAdmin> admins = hospitalService.getHospitalAdmins(hospitalId);
        List<HospitalAdminResponse> responses = admins.stream()
                .map(this::convertToAdminResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    /**
     * Add new hospital admin
     */
    @PostMapping("/{hospitalId}/admins")
    @RequirePermission("ADMIN_CREATE")
    public ResponseEntity<HospitalAdminResponse> addHospitalAdmin(
            @PathVariable UUID hospitalId,
            @RequestBody HospitalAdminRequest request) {
        log.info("Adding new admin to hospital: {}", hospitalId);
        HospitalAdmin admin = hospitalService.addHospitalAdmin(
                hospitalId,
                request.getEmail(),
                request.getFullName(),
                request.getPhone()
        );
        return ResponseEntity.ok(convertToAdminResponse(admin));
    }

    /**
     * Deactivate hospital admin
     */
    @DeleteMapping("/admins/{adminId}")
    @RequirePermission("ADMIN_DELETE")
    public ResponseEntity<Void> deactivateAdmin(@PathVariable UUID adminId) {
        log.info("Deactivating hospital admin with id: {}", adminId);
        hospitalService.deactivateHospitalAdmin(adminId);
        return ResponseEntity.noContent().build();
    }

    /**
     * Update total blood units
     */
    @PutMapping("/{hospitalId}/blood-units")
    @RequirePermission("HOSPITAL_UPDATE")
    public ResponseEntity<HospitalResponse> updateBloodUnits(
            @PathVariable UUID hospitalId,
            @RequestParam Integer units) {
        log.info("Updating blood units for hospital {}: {}", hospitalId, units);
        Hospital hospital = hospitalService.updateTotalBloodUnits(hospitalId, units);
        return ResponseEntity.ok(convertToHospitalResponse(hospital));
    }

    /**
     * Check if hospital is verified
     */
    @GetMapping("/{hospitalId}/verified")
    @RequirePermission("HOSPITAL_READ")
    public ResponseEntity<Boolean> isVerified(@PathVariable UUID hospitalId) {
        log.info("Checking verification status for hospital: {}", hospitalId);
        boolean verified = hospitalService.isHospitalVerified(hospitalId);
        return ResponseEntity.ok(verified);
    }

    // Helper methods
    private HospitalResponse convertToHospitalResponse(Hospital hospital) {
        return new HospitalResponse(
                hospital.getId(),
                hospital.getName(),
                hospital.getEmail(),
                hospital.getPhone(),
                hospital.getAddress(),
                hospital.getCity(),
                hospital.getState(),
                hospital.getZipCode(),
                hospital.getCountry(),
                hospital.getRegistrationNumber(),
                hospital.getLicenseNumber(),
                hospital.getBloodBankCoordinatorName(),
                hospital.getBloodBankCoordinatorEmail(),
                hospital.getBloodBankCoordinatorPhone(),
                hospital.getIsActive(),
                hospital.getIsVerified(),
                hospital.getTotalBloodUnits(),
                hospital.getCreatedDate(),
                hospital.getUpdatedDate()
        );
    }

    private HospitalAdminResponse convertToAdminResponse(HospitalAdmin admin) {
        return new HospitalAdminResponse(
                admin.getId(),
                admin.getHospital().getId(),
                admin.getEmail(),
                admin.getFullName(),
                admin.getPhone(),
                admin.getIsActive(),
                admin.getEmailVerified(),
                admin.getLastLoginDate(),
                admin.getCreatedDate(),
                admin.getUpdatedDate()
        );
    }

    // Inner DTO classes
    @lombok.Data
    @lombok.NoArgsConstructor
    @lombok.AllArgsConstructor
    public static class HospitalRegistrationRequest {
        private String name;
        private String email;
        private String phone;
        private String address;
        private String city;
        private String state;
        private String zipCode;
        private String country;
        private String registrationNumber;
        private String licenseNumber;
        private String bloodBankCoordinatorName;
        private String bloodBankCoordinatorEmail;
        private String bloodBankCoordinatorPhone;
    }

    @lombok.Data
    @lombok.NoArgsConstructor
    @lombok.AllArgsConstructor
    public static class HospitalUpdateRequest {
        private String name;
        private String email;
        private String phone;
        private String address;
        private String city;
        private String state;
        private String zipCode;
        private String country;
    }

    @lombok.Data
    @lombok.NoArgsConstructor
    @lombok.AllArgsConstructor
    public static class CoordinatorRequest {
        private String name;
        private String email;
        private String phone;
    }

    @lombok.Data
    @lombok.NoArgsConstructor
    @lombok.AllArgsConstructor
    public static class HospitalAdminResponse {
        private UUID id;
        private UUID hospitalId;
        private String email;
        private String fullName;
        private String phone;
        private Boolean isActive;
        private Boolean emailVerified;
        private java.time.LocalDateTime lastLoginDate;
        private java.time.LocalDateTime createdDate;
        private java.time.LocalDateTime updatedDate;
    }
}
