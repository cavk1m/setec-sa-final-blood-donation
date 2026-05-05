package com.setec.backend.Controller;

import com.setec.backend.Dto.HospitalResponse;
import com.setec.backend.Dto.RoleResponse;
import com.setec.backend.Dto.PermissionResponse;
import com.setec.backend.Model.Hospital;
import com.setec.backend.Model.Permission;
import com.setec.backend.Model.UserRole;
import com.setec.backend.Security.RequirePermission;
import com.setec.backend.Service.HospitalService;
import com.setec.backend.Service.PermissionService;
import com.setec.backend.Service.RoleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// ADD THESE IMPORTS AT TOP
import com.setec.backend.Enum.Role;
import com.setec.backend.Model.blood_donations;
import com.setec.backend.Model.certificates;
import com.setec.backend.Model.users;
import com.setec.backend.Repository.BloodDonationRepository;
import com.setec.backend.Repository.CertificateRepository;
import com.setec.backend.Repository.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import java.util.*;
import java.util.stream.Collectors;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/admin")
@Tag(name = "Admin Management", description = "APIs for administrative operations including hospital, role, and permission management")
@SecurityRequirement(name = "bearerAuth")
public class AdminController {

    private final HospitalService hospitalService;
    private final RoleService roleService;
    private final PermissionService permissionService;

    // ADD THESE THREE LINES
private final UserRepository userRepository;
private final BloodDonationRepository bloodDonationRepository;
private final CertificateRepository certificateRepository;

    public AdminController(HospitalService hospitalService, RoleService roleService, PermissionService permissionService, UserRepository userRepository,
        BloodDonationRepository bloodDonationRepository,
        CertificateRepository certificateRepository) {
        this.hospitalService = hospitalService;
        this.roleService = roleService;
        this.permissionService = permissionService;
        this.userRepository = userRepository;
        this.bloodDonationRepository = bloodDonationRepository;
        this.certificateRepository = certificateRepository;
    }

    /**
     * Get all active hospitals
     */
    @GetMapping("/hospitals")
    @RequirePermission("HOSPITAL_LIST")
    @Operation(summary = "Get all hospitals", description = "Retrieve list of all active hospitals in the system")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "List of hospitals retrieved successfully"),
        @ApiResponse(responseCode = "401", description = "Unauthorized - missing or invalid JWT token"),
        @ApiResponse(responseCode = "403", description = "Forbidden - insufficient permissions")
    })
    public ResponseEntity<List<HospitalResponse>> getAllHospitals() {
        log.info("Fetching all active hospitals");
        List<Hospital> hospitals = hospitalService.getAllActiveHospitals();
        List<HospitalResponse> responses = hospitals.stream()
                .map(this::convertToHospitalResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    /**
     * Get hospital by ID
     */
    @GetMapping("/hospitals/{hospitalId}")
    @RequirePermission("HOSPITAL_READ")
    public ResponseEntity<HospitalResponse> getHospital(@PathVariable UUID hospitalId) {
        log.info("Fetching hospital with id: {}", hospitalId);
        Hospital hospital = hospitalService.getHospitalById(hospitalId)
                .orElseThrow(() -> new IllegalArgumentException("Hospital not found: " + hospitalId));
        return ResponseEntity.ok(convertToHospitalResponse(hospital));
    }

    /**
     * Verify a hospital (Super Admin only)
     */
    @PutMapping("/hospitals/{hospitalId}/verify")
    @RequirePermission("HOSPITAL_UPDATE")
    public ResponseEntity<HospitalResponse> verifyHospital(@PathVariable UUID hospitalId) {
        log.info("Verifying hospital with id: {}", hospitalId);
        Hospital hospital = hospitalService.verifyHospital(hospitalId);
        return ResponseEntity.ok(convertToHospitalResponse(hospital));
    }

    /**
     * Get all roles
     */
    @GetMapping("/roles")
    @RequirePermission("ADMIN_LIST")
    public ResponseEntity<List<RoleResponse>> getAllRoles() {
        log.info("Fetching all active roles");
        List<UserRole> roles = roleService.getAllRoles();
        List<RoleResponse> responses = roles.stream()
                .map(this::convertToRoleResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    /**
     * Get role by ID
     */
    @GetMapping("/roles/{roleId}")
    @RequirePermission("ADMIN_READ")
    public ResponseEntity<RoleResponse> getRole(@PathVariable UUID roleId) {
        log.info("Fetching role with id: {}", roleId);
        UserRole role = roleService.getRoleById(roleId)
                .orElseThrow(() -> new IllegalArgumentException("Role not found: " + roleId));
        return ResponseEntity.ok(convertToRoleResponse(role));
    }

    /**
     * Get all permissions
     */
    @GetMapping("/permissions")
    @RequirePermission("ADMIN_LIST")
    public ResponseEntity<List<PermissionResponse>> getAllPermissions() {
        log.info("Fetching all active permissions");
        List<Permission> permissions = permissionService.getAllPermissions();
        List<PermissionResponse> responses = permissions.stream()
                .map(this::convertToPermissionResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }

    /**
     * Add permission to role
     */
    @PostMapping("/roles/{roleId}/permissions/{permissionId}")
    @RequirePermission("ADMIN_UPDATE")
    public ResponseEntity<RoleResponse> addPermissionToRole(
            @PathVariable UUID roleId,
            @PathVariable UUID permissionId) {
        log.info("Adding permission {} to role {}", permissionId, roleId);
        roleService.addPermissionToRole(roleId, permissionId);
        UserRole role = roleService.getRoleById(roleId)
                .orElseThrow(() -> new IllegalArgumentException("Role not found: " + roleId));
        return ResponseEntity.ok(convertToRoleResponse(role));
    }

    /**
     * Remove permission from role
     */
    @DeleteMapping("/roles/{roleId}/permissions/{permissionId}")
    @RequirePermission("ADMIN_UPDATE")
    public ResponseEntity<RoleResponse> removePermissionFromRole(
            @PathVariable UUID roleId,
            @PathVariable UUID permissionId) {
        log.info("Removing permission {} from role {}", permissionId, roleId);
        roleService.removePermissionFromRole(roleId, permissionId);
        UserRole role = roleService.getRoleById(roleId)
                .orElseThrow(() -> new IllegalArgumentException("Role not found: " + roleId));
        return ResponseEntity.ok(convertToRoleResponse(role));
    }

    /**
     * Get role permissions
     */
    @GetMapping("/roles/{roleId}/permissions")
    @RequirePermission("ADMIN_READ")
    public ResponseEntity<List<PermissionResponse>> getRolePermissions(@PathVariable UUID roleId) {
        log.info("Fetching permissions for role: {}", roleId);
        Set<Permission> permissions = roleService.getRolePermissions(roleId);
        List<PermissionResponse> responses = permissions.stream()
                .map(this::convertToPermissionResponse)
                .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }


    // GET /api/admin/users
@GetMapping("/users")
@SecurityRequirement(name = "bearer-jwt")
public ResponseEntity<?> getAllUsers(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(required = false) String search,
        @RequestParam(required = false) String role) {
    try {
        Pageable pageable = PageRequest.of(page, size);
        // Page<users> usersPage = userRepository.findAllWithFilters(search, role, pageable);
        Page<users> usersPage = userRepository.findAllWithFilters(search, pageable);

        List<Map<String, Object>> userList = usersPage.getContent().stream().map(u -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", u.getId());
            map.put("full_name", u.getFullName());
            map.put("email", u.getEmail());
            map.put("phone", u.getPhone());
            map.put("blood_type", u.getBloodType());
            map.put("role", u.getRole());
            map.put("is_active", u.getIsActive());
            map.put("created_at", u.getCreatedDate());
            return map;
        }).collect(Collectors.toList());

        Map<String, Object> pagination = new HashMap<>();
        pagination.put("page", page);
        pagination.put("size", size);
        pagination.put("total_elements", usersPage.getTotalElements());
        pagination.put("total_pages", usersPage.getTotalPages());

        return ResponseEntity.ok(Map.of(
            "users", userList,
            "pagination", pagination
        ));

    } catch (Exception e) {
        return ResponseEntity.status(500).body(Map.of(
            "success", false,
            "message", "Failed to fetch users: " + e.getMessage()
        ));
    }
}

// GET /api/admin/users/{id}
@GetMapping("/users/{id}")
@SecurityRequirement(name = "bearer-jwt")
public ResponseEntity<?> getUserById(@PathVariable String id) {
    try {
        users user = userRepository.findById(UUID.fromString(id)).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body(Map.of(
                "error", "User not found", "code", 404
            ));
        }

        List<blood_donations> donations = bloodDonationRepository.findByUserId(UUID.fromString(id));
        List<Map<String, Object>> donationList = donations.stream().map(d -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", d.getId());
            map.put("donation_date", d.getDonation_date().toLocalDate().toString());
            map.put("location_name", d.getLocation() != null ? d.getLocation().getName() : "");
            return map;
        }).collect(Collectors.toList());

        List<certificates> certs = certificateRepository.findByUserId(user.getId());
        List<Map<String, Object>> certList = certs.stream().map(c -> {
            Map<String, Object> map = new HashMap<>();
            map.put("id", c.getId());
            map.put("certificate_number", c.getCertificate_number());
            map.put("issued_date", c.getIssued_date().toLocalDate().toString());
            return map;
        }).collect(Collectors.toList());

        Map<String, Object> result = new HashMap<>();
        result.put("id", user.getId());
        result.put("full_name", user.getFullName());
        result.put("email", user.getEmail());
        result.put("phone", user.getPhone());
        result.put("blood_type", user.getBloodType());
        result.put("role", user.getRole());
        result.put("created_at", user.getCreatedDate());
        result.put("donations", donationList);
        result.put("certificates", certList);

        return ResponseEntity.ok(result);

    } catch (Exception e) {
        return ResponseEntity.status(500).body(Map.of(
            "success", false,
            "message", "Failed to fetch user: " + e.getMessage()
        ));
    }
}

// PUT /api/admin/users/{id}/role
@PutMapping("/users/{id}/role")
@SecurityRequirement(name = "bearer-jwt")
public ResponseEntity<?> updateUserRole(
        @PathVariable String id,
        @RequestBody Map<String, Object> request) {
    try {
        String newRole = (String) request.get("role");
        List<String> allowedRoles = List.of("ADMIN", "DONOR", "RECIPIENT", "STAFF", "USER");

        if (newRole == null || !allowedRoles.contains(newRole.toUpperCase())) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Invalid role. Must be one of: ADMIN, DONOR, RECIPIENT, STAFF, USER",
                "code", 400
            ));
        }

        users user = userRepository.findById(UUID.fromString(id)).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body(Map.of(
                "error", "User not found", "code", 404
            ));
        }

        user.setRole(Role.valueOf(newRole.toUpperCase()));
        userRepository.save(user);

        return ResponseEntity.ok(Map.of(
            "message", "User role updated successfully",
            "user", Map.of(
                "id", user.getId(),
                "full_name", user.getFullName(),
                "role", user.getRole()
            )
        ));

    } catch (Exception e) {
        return ResponseEntity.status(500).body(Map.of(
            "success", false,
            "message", "Failed to update role: " + e.getMessage()
        ));
    }
}

// PUT /api/admin/users/{id}
@PutMapping("/users/{id}")
@SecurityRequirement(name = "bearer-jwt")
public ResponseEntity<?> updateUser(
        @PathVariable String id,
        @RequestBody Map<String, Object> request) {
    try {
        users user = userRepository.findById(UUID.fromString(id)).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body(Map.of(
                "error", "User not found",
                "code", 404
            ));
        }

        if (request.get("full_name") != null) user.setFullName((String) request.get("full_name"));
        if (request.get("phone") != null) user.setPhone((String) request.get("phone"));
        if (request.get("address") != null) user.setAddress((String) request.get("address"));
        if (request.get("blood_type") != null) {
            user.setBloodType(com.setec.backend.Enum.BloodType.valueOf(request.get("blood_type").toString()));
        }
        if (request.get("is_active") != null) {
            user.setIsActive((Boolean) request.get("is_active"));
        }

        userRepository.save(user);

        return ResponseEntity.ok(Map.of(
            "message", "User updated successfully",
            "user", Map.of(
                "id", user.getId(),
                "full_name", user.getFullName(),
                "phone", user.getPhone(),
                "blood_type", user.getBloodType(),
                "is_active", user.getIsActive()
            )
        ));

    } catch (Exception e) {
        return ResponseEntity.status(500).body(Map.of(
            "success", false,
            "message", "Failed to update user: " + e.getMessage()
        ));
    }
}

// DELETE /api/admin/users/{id}
@DeleteMapping("/users/{id}")
@SecurityRequirement(name = "bearer-jwt")
public ResponseEntity<?> deleteUser(
        @PathVariable String id,
        HttpServletRequest request) {
    try {
        UUID adminId = (UUID) request.getAttribute("currentUserId");

        if (adminId.toString().equals(id)) {
            return ResponseEntity.status(403).body(Map.of(
                "error", "You cannot delete your own account",
                "code", 403
            ));
        }

        users user = userRepository.findById(UUID.fromString(id)).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body(Map.of(
                "error", "User not found", "code", 404
            ));
        }

        user.setIsActive(false);
        userRepository.save(user);

        return ResponseEntity.ok(Map.of("message", "User deleted successfully"));

    } catch (Exception e) {
        return ResponseEntity.status(500).body(Map.of(
            "success", false,
            "message", "Failed to delete user: " + e.getMessage()
        ));
    }
}


// POST /api/admin/users/create
@PostMapping("/users/create")
@SecurityRequirement(name = "bearer-jwt")
public ResponseEntity<?> createUser(@RequestBody Map<String, Object> request) {
    try {
        // Validate required fields
        if (request.get("email") == null || request.get("password") == null ||
            request.get("full_name") == null || request.get("phone") == null) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "email, password, full_name, phone are required",
                "code", 400
            ));
        }

        // Check if email already exists
        if (userRepository.existsByEmail((String) request.get("email"))) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Email already registered",
                "code", 400
            ));
        }

        // Check if phone already exists
        if (userRepository.existsByPhone((String) request.get("phone"))) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Phone already registered",
                "code", 400
            ));
        }

        users user = new users();
        user.setFullName((String) request.get("full_name"));
        user.setEmail((String) request.get("email"));
        user.setPhone((String) request.get("phone"));
        user.setPasswordHash(new org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder().encode(
            (String) request.get("password")
        ));
        user.setIsActive(true);
        user.setEmailVerified(true); // admin created accounts skip OTP

        if (request.get("address") != null) user.setAddress((String) request.get("address"));
        if (request.get("date_of_birth") != null) {
            user.setDateOfBirth(java.sql.Date.valueOf((String) request.get("date_of_birth")));
        }
        if (request.get("blood_type") != null) {
            user.setBloodType(com.setec.backend.Enum.BloodType.valueOf(request.get("blood_type").toString()));
        }
        if (request.get("role") != null) {
            user.setRole(Role.valueOf(request.get("role").toString().toUpperCase()));
        } else {
            user.setRole(Role.USER);
        }
        if (request.get("location_id") != null) {
            user.setLocationId(UUID.fromString(request.get("location_id").toString()));
        }

        users saved = userRepository.save(user);

        return ResponseEntity.status(201).body(Map.of(
            "message", "User created successfully",
            "user", Map.of(
                "id", saved.getId(),
                "full_name", saved.getFullName(),
                "email", saved.getEmail(),
                "phone", saved.getPhone(),
                "role", saved.getRole(),
                "location_id", saved.getLocationId() != null ? saved.getLocationId() : ""
            )
        ));

    } catch (Exception e) {
        return ResponseEntity.status(500).body(Map.of(
            "success", false,
            "message", "Failed to create user: " + e.getMessage()
        ));
    }
}

// PUT /api/admin/users/{id}/location
@PutMapping("/users/{id}/location")
@SecurityRequirement(name = "bearer-jwt")
public ResponseEntity<?> updateUserLocation(
        @PathVariable String id,
        @RequestBody Map<String, Object> request) {
    try {
        users user = userRepository.findById(UUID.fromString(id)).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body(Map.of(
                "error", "User not found",
                "code", 404
            ));
        }

        if (request.get("location_id") == null) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "location_id is required",
                "code", 400
            ));
        }

        user.setLocationId(UUID.fromString(request.get("location_id").toString()));
        userRepository.save(user);

        return ResponseEntity.ok(Map.of(
            "message", "User location updated successfully",
            "user", Map.of(
                "id", user.getId(),
                "full_name", user.getFullName(),
                "location_id", user.getLocationId()
            )
        ));

    } catch (Exception e) {
        return ResponseEntity.status(500).body(Map.of(
            "success", false,
            "message", "Failed to update location: " + e.getMessage()
        ));
    }
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

    private RoleResponse convertToRoleResponse(UserRole role) {
        Set<PermissionResponse> permissionResponses = role.getPermissions().stream()
                .map(this::convertToPermissionResponse)
                .collect(Collectors.toSet());
        
        return new RoleResponse(
                role.getId(),
                role.getRoleName().name(),
                role.getDescription(),
                role.getIsActive(),
                permissionResponses,
                role.getCreatedDate(),
                role.getUpdatedDate()
        );
    }

    private PermissionResponse convertToPermissionResponse(Permission permission) {
        return new PermissionResponse(
                permission.getId(),
                permission.getPermissionType().name(),
                permission.getDescription(),
                permission.getResourceName(),
                permission.getAction(),
                permission.getIsActive(),
                permission.getCreatedDate(),
                permission.getUpdatedDate()
        );
    }
}
