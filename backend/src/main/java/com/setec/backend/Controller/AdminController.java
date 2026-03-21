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
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final HospitalService hospitalService;
    private final RoleService roleService;
    private final PermissionService permissionService;

    public AdminController(HospitalService hospitalService, RoleService roleService, PermissionService permissionService) {
        this.hospitalService = hospitalService;
        this.roleService = roleService;
        this.permissionService = permissionService;
    }

    /**
     * Get all active hospitals
     */
    @GetMapping("/hospitals")
    @RequirePermission("HOSPITAL_LIST")
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
