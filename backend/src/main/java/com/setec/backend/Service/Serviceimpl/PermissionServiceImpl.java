package com.setec.backend.Service.Serviceimpl;

import com.setec.backend.Enum.PermissionType;
import com.setec.backend.Model.Permission;
import com.setec.backend.Model.UserRole;
import com.setec.backend.Repository.PermissionRepository;
import com.setec.backend.Repository.UserRepository;
import com.setec.backend.Model.users;
import com.setec.backend.Service.PermissionService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Slf4j
@Service
@Transactional
public class PermissionServiceImpl implements PermissionService {

    private final PermissionRepository permissionRepository;
    private final UserRepository userRepository;

    public PermissionServiceImpl(PermissionRepository permissionRepository, UserRepository userRepository) {
        this.permissionRepository = permissionRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Permission> getAllPermissions() {
        log.debug("Fetching all active permissions");
        return permissionRepository.findAllByIsActiveTrue();
    }

    @Override
    public Optional<Permission> getPermissionById(UUID id) {
        log.debug("Fetching permission with id: {}", id);
        return permissionRepository.findById(id);
    }

    @Override
    public Optional<Permission> getPermissionByType(PermissionType permissionType) {
        log.debug("Fetching permission by type: {}", permissionType);
        return permissionRepository.findByPermissionType(permissionType);
    }

    @Override
    public Set<Permission> getPermissionsByRole(UserRole role) {
        log.debug("Fetching permissions for role: {}", role.getRoleName());
        return role.getPermissions();
    }

    @Override
    public List<Permission> getPermissionsByResource(String resourceName) {
        log.debug("Fetching permissions for resource: {}", resourceName);
        return permissionRepository.findByResourceName(resourceName);
    }

    @Override
    public Permission createPermission(PermissionType permissionType, String description, 
                                      String resourceName, String action) {
        log.info("Creating new permission: {} for resource: {}", permissionType, resourceName);
        
        if (permissionRepository.findByPermissionType(permissionType).isPresent()) {
            log.warn("Permission already exists: {}", permissionType);
            throw new IllegalArgumentException("Permission already exists: " + permissionType);
        }

        Permission permission = new Permission();
        permission.setId(UUID.randomUUID());
        permission.setPermissionType(permissionType);
        permission.setDescription(description);
        permission.setResourceName(resourceName);
        permission.setAction(action);
        permission.setIsActive(true);
        permission.setCreatedDate(LocalDateTime.now());
        permission.setUpdatedDate(LocalDateTime.now());

        return permissionRepository.save(permission);
    }

    @Override
    public Permission updatePermission(UUID id, String description) {
        log.info("Updating permission with id: {}", id);
        
        Permission permission = permissionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Permission not found: " + id));

        permission.setDescription(description);
        permission.setUpdatedDate(LocalDateTime.now());
        
        return permissionRepository.save(permission);
    }

    @Override
    public void deactivatePermission(UUID id) {
        log.info("Deactivating permission with id: {}", id);
        
        Permission permission = permissionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Permission not found: " + id));

        permission.setIsActive(false);
        permission.setUpdatedDate(LocalDateTime.now());
        permissionRepository.save(permission);
    }

    @Override
    public boolean permissionExists(PermissionType permissionType) {
        return permissionRepository.findByPermissionType(permissionType).isPresent();
    }

    @Override
    public void assignPermissionsToRole(UserRole role, Set<Permission> permissions) {
        log.info("Assigning {} permissions to role: {}", permissions.size(), role.getRoleName());
        role.setPermissions(permissions);
    }

    @Override
    public void removePermissionFromRole(UserRole role, Permission permission) {
        log.info("Removing permission {} from role: {}", permission.getPermissionType(), role.getRoleName());
        role.getPermissions().remove(permission);
    }

    @Override
    public List<PermissionType> getUserPermissions(UUID userId) {
        log.debug("Fetching permissions for user with id: {}", userId);
        
        Optional<users> userOptional = userRepository.findById(userId);
        if (userOptional.isEmpty()) {
            log.warn("User not found with id: {}", userId);
            return List.of();
        }

        users user = userOptional.get();
        Set<PermissionType> permissions = new java.util.HashSet<>();

        // Get permissions from all user roles
        if (user.getUserRoles() != null) {
            for (UserRole userRole : user.getUserRoles()) {
                if (userRole.getPermissions() != null) {
                    for (Permission permission : userRole.getPermissions()) {
                        permissions.add(permission.getPermissionType());
                    }
                }
            }
        }

        log.debug("Found {} permissions for user {}", permissions.size(), userId);
        return new java.util.ArrayList<>(permissions);
    }

    @Override
    public boolean userHasPermission(UUID userId, PermissionType permissionType) {
        log.debug("Checking if user {} has permission: {}", userId, permissionType);
        
        List<PermissionType> userPermissions = getUserPermissions(userId);
        boolean hasPermission = userPermissions.contains(permissionType);
        
        log.debug("User {} permission check for {}: {}", userId, permissionType, hasPermission);
        return hasPermission;
    }
}