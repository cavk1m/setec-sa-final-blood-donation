package com.setec.backend.Service;

import com.setec.backend.Enum.RoleType;
import com.setec.backend.Model.Permission;
import com.setec.backend.Model.UserRole;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

public interface RoleService {
    /**
     * Get all active roles
     */
    List<UserRole> getAllRoles();

    /**
     * Get role by UUID
     */
    Optional<UserRole> getRoleById(UUID id);

    /**
     * Get role by RoleType
     */
    Optional<UserRole> getRoleByName(RoleType roleName);

    /**
     * Create a new role
     */
    UserRole createRole(RoleType roleName, String description, Set<Permission> permissions);

    /**
     * Update role
     */
    UserRole updateRole(UUID id, String description);

    /**
     * Deactivate role
     */
    void deactivateRole(UUID id);

    /**
     * Add permission to role
     */
    void addPermissionToRole(UUID roleId, UUID permissionId);

    /**
     * Remove permission from role
     */
    void removePermissionFromRole(UUID roleId, UUID permissionId);

    /**
     * Get all permissions for a role
     */
    Set<Permission> getRolePermissions(UUID roleId);

    /**
     * Check if role has specific permission
     */
    boolean roleHasPermission(UUID roleId, String permissionType);

    /**
     * Get all users with a specific role
     */
    long getUserCountByRole(UUID roleId);

    /**
     * Initialize default roles with their permissions
     */
    void initializeDefaultRoles();
}
