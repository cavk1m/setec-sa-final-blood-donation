package com.setec.backend.Service.Serviceimpl;

import com.setec.backend.Enum.PermissionType;
import com.setec.backend.Enum.RoleType;
import com.setec.backend.Model.Permission;
import com.setec.backend.Model.UserRole;
import com.setec.backend.Repository.PermissionRepository;
import com.setec.backend.Repository.UserRoleRepository;
import com.setec.backend.Service.RoleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

@Slf4j
@Service
@Transactional
public class RoleServiceImpl implements RoleService {

    private final UserRoleRepository userRoleRepository;
    private final PermissionRepository permissionRepository;

    public RoleServiceImpl(UserRoleRepository userRoleRepository, PermissionRepository permissionRepository) {
        this.userRoleRepository = userRoleRepository;
        this.permissionRepository = permissionRepository;
    }

    @Override
    public List<UserRole> getAllRoles() {
        log.debug("Fetching all active roles");
        return userRoleRepository.findAllByIsActiveTrue();
    }

    @Override
    public Optional<UserRole> getRoleById(UUID id) {
        log.debug("Fetching role with id: {}", id);
        return userRoleRepository.findById(id);
    }

    @Override
    public Optional<UserRole> getRoleByName(RoleType roleName) {
        log.debug("Fetching role by name: {}", roleName);
        return userRoleRepository.findByRoleName(roleName);
    }

    @Override
    public UserRole createRole(RoleType roleName, String description, Set<Permission> permissions) {
        log.info("Creating new role: {}", roleName);
        
        if (userRoleRepository.findByRoleName(roleName).isPresent()) {
            log.warn("Role already exists: {}", roleName);
            throw new IllegalArgumentException("Role already exists: " + roleName);
        }

        UserRole role = new UserRole();
        role.setId(UUID.randomUUID());
        role.setRoleName(roleName);
        role.setDescription(description);
        role.setPermissions(permissions != null ? permissions : new HashSet<>());
        role.setIsActive(true);
        role.setUsers(new HashSet<>());
        role.setCreatedDate(LocalDateTime.now());
        role.setUpdatedDate(LocalDateTime.now());

        return userRoleRepository.save(role);
    }

    @Override
    public UserRole updateRole(UUID id, String description) {
        log.info("Updating role with id: {}", id);
        
        UserRole role = userRoleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Role not found: " + id));

        role.setDescription(description);
        role.setUpdatedDate(LocalDateTime.now());
        
        return userRoleRepository.save(role);
    }

    @Override
    public void deactivateRole(UUID id) {
        log.info("Deactivating role with id: {}", id);
        
        UserRole role = userRoleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Role not found: " + id));

        role.setIsActive(false);
        role.setUpdatedDate(LocalDateTime.now());
        userRoleRepository.save(role);
    }

    @Override
    public void addPermissionToRole(UUID roleId, UUID permissionId) {
        log.info("Adding permission {} to role {}", permissionId, roleId);
        
        UserRole role = userRoleRepository.findById(roleId)
                .orElseThrow(() -> new IllegalArgumentException("Role not found: " + roleId));
        
        Permission permission = permissionRepository.findById(permissionId)
                .orElseThrow(() -> new IllegalArgumentException("Permission not found: " + permissionId));

        role.getPermissions().add(permission);
        role.setUpdatedDate(LocalDateTime.now());
        userRoleRepository.save(role);
    }

    @Override
    public void removePermissionFromRole(UUID roleId, UUID permissionId) {
        log.info("Removing permission {} from role {}", permissionId, roleId);
        
        UserRole role = userRoleRepository.findById(roleId)
                .orElseThrow(() -> new IllegalArgumentException("Role not found: " + roleId));
        
        Permission permission = permissionRepository.findById(permissionId)
                .orElseThrow(() -> new IllegalArgumentException("Permission not found: " + permissionId));

        role.getPermissions().remove(permission);
        role.setUpdatedDate(LocalDateTime.now());
        userRoleRepository.save(role);
    }

    @Override
    public Set<Permission> getRolePermissions(UUID roleId) {
        log.debug("Fetching permissions for role: {}", roleId);
        
        UserRole role = userRoleRepository.findById(roleId)
                .orElseThrow(() -> new IllegalArgumentException("Role not found: " + roleId));

        return role.getPermissions();
    }

    @Override
    public boolean roleHasPermission(UUID roleId, String permissionType) {
        log.debug("Checking if role {} has permission {}", roleId, permissionType);
        
        UserRole role = userRoleRepository.findById(roleId)
                .orElseThrow(() -> new IllegalArgumentException("Role not found: " + roleId));

        return role.getPermissions().stream()
                .anyMatch(p -> p.getPermissionType().toString().equals(permissionType));
    }

    @Override
    public long getUserCountByRole(UUID roleId) {
        log.debug("Getting user count for role: {}", roleId);
        
        UserRole role = userRoleRepository.findById(roleId)
                .orElseThrow(() -> new IllegalArgumentException("Role not found: " + roleId));

        return role.getUsers().size();
    }

    @Override
    public void initializeDefaultRoles() {
        log.info("Initializing default roles with permissions");
        
        // Create all permissions first
        Set<Permission> allPermissions = new HashSet<>();
        for (PermissionType perm : PermissionType.values()) {
            if (!permissionRepository.findByPermissionType(perm).isPresent()) {
                Permission permission = new Permission();
                permission.setId(UUID.randomUUID());
                permission.setPermissionType(perm);
                permission.setDescription(perm.getDescription());
                permission.setResourceName(perm.getResourceName());
                permission.setAction(perm.getAction());
                permission.setIsActive(true);
                permission.setCreatedDate(LocalDateTime.now());
                permission.setUpdatedDate(LocalDateTime.now());
                permission = permissionRepository.save(permission);
                allPermissions.add(permission);
            } else {
                allPermissions.add(permissionRepository.findByPermissionType(perm).get());
            }
        }

        // Create SUPER_ADMIN role with all permissions
        if (!userRoleRepository.findByRoleName(RoleType.SUPER_ADMIN).isPresent()) {
            createRole(RoleType.SUPER_ADMIN, "System Administrator with full access", allPermissions);
            log.info("Created SUPER_ADMIN role with {} permissions", allPermissions.size());
        }

        // Create ADMIN role with admin and hospital management permissions
        if (!userRoleRepository.findByRoleName(RoleType.ADMIN).isPresent()) {
            Set<Permission> adminPermissions = getPermissionsByTypes(allPermissions,
                    PermissionType.ADMIN_CREATE, PermissionType.ADMIN_READ, PermissionType.ADMIN_UPDATE,
                    PermissionType.ADMIN_LIST, PermissionType.HOSPITAL_CREATE, PermissionType.HOSPITAL_READ,
                    PermissionType.HOSPITAL_UPDATE, PermissionType.HOSPITAL_LIST,
                    PermissionType.USER_CREATE, PermissionType.USER_READ, PermissionType.USER_LIST,
                    PermissionType.DONATION_CREATE, PermissionType.DONATION_READ, PermissionType.DONATION_UPDATE,
                    PermissionType.DONATION_LIST, PermissionType.QUEUE_CREATE, PermissionType.QUEUE_READ,
                    PermissionType.REPORT_VIEW, PermissionType.ANALYTICS_VIEW, PermissionType.EXPORT_DATA);
            createRole(RoleType.ADMIN, "Hospital/Organization Administrator", adminPermissions);
            log.info("Created ADMIN role");
        }

        // Create HOSPITAL role with limited permissions
        if (!userRoleRepository.findByRoleName(RoleType.HOSPITAL).isPresent()) {
            Set<Permission> hospitalPermissions = getPermissionsByTypes(allPermissions,
                    PermissionType.HOSPITAL_READ, PermissionType.DONATION_READ, PermissionType.DONATION_CREATE,
                    PermissionType.QUEUE_READ, PermissionType.REPORT_VIEW);
            createRole(RoleType.HOSPITAL, "Hospital Staff Member", hospitalPermissions);
            log.info("Created HOSPITAL role");
        }

        // Create USER role with donor permissions
        if (!userRoleRepository.findByRoleName(RoleType.USER).isPresent()) {
            Set<Permission> userPermissions = getPermissionsByTypes(allPermissions,
                    PermissionType.USER_READ, PermissionType.DONATION_CREATE, PermissionType.DONATION_READ);
            createRole(RoleType.USER, "Regular Donor", userPermissions);
            log.info("Created USER role");
        }

        log.info("Default roles initialization completed");
    }

    private Set<Permission> getPermissionsByTypes(Set<Permission> allPermissions, PermissionType... types) {
        Set<Permission> result = new HashSet<>();
        Set<PermissionType> typeSet = Set.of(types);
        for (Permission perm : allPermissions) {
            if (typeSet.contains(perm.getPermissionType())) {
                result.add(perm);
            }
        }
        return result;
    }
}
