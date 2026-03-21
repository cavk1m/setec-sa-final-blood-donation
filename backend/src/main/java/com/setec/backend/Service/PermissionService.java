package com.setec.backend.Service;

import com.setec.backend.Enum.PermissionType;
import com.setec.backend.Model.Permission;
import com.setec.backend.Model.UserRole;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface PermissionService {
    /**
     * Get all active permissions
     */
    List<Permission> getAllPermissions();

    /**
     * Get permission by UUID
     */
    Optional<Permission> getPermissionById(UUID id);

    /**
     * Get permission by PermissionType
     */
    Optional<Permission> getPermissionByType(PermissionType permissionType);

    /**
     * Get all permissions for a specific role
     */
    Set<Permission> getPermissionsByRole(UserRole role);

    /**
     * Get permissions by resource name
     */
    List<Permission> getPermissionsByResource(String resourceName);

    /**
     * Create a new permission
     */
    Permission createPermission(PermissionType permissionType, String description, String resourceName, String action);

    /**
     * Update permission
     */
    Permission updatePermission(UUID id, String description);

    /**
     * Deactivate permission
     */
    void deactivatePermission(UUID id);

    /**
     * Check if permission exists
     */
    boolean permissionExists(PermissionType permissionType);

    /**
     * Assign permissions to a role
     */
    void assignPermissionsToRole(UserRole role, Set<Permission> permissions);

    /**
     * Remove permission from a role
     */
    void removePermissionFromRole(UserRole role, Permission permission);
}
