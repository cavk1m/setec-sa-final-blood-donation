package com.setec.backend.Service;

import com.setec.backend.Enum.PermissionType;
import com.setec.backend.Enum.RoleType;
import com.setec.backend.Model.Permission;
import com.setec.backend.Model.UserRole;
import com.setec.backend.Repository.PermissionRepository;
import com.setec.backend.Repository.UserRoleRepository;
import com.setec.backend.Service.Serviceimpl.RoleServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@DisplayName("RoleService Tests")
class RoleServiceTest {

    @Mock
    private UserRoleRepository userRoleRepository;

    @Mock
    private PermissionRepository permissionRepository;

    @InjectMocks
    private RoleServiceImpl roleService;

    private UserRole testRole;
    private Permission testPermission;
    private UUID roleId;
    private UUID permissionId;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        roleId = UUID.randomUUID();
        permissionId = UUID.randomUUID();

        testPermission = new Permission();
        testPermission.setId(permissionId);
        testPermission.setPermissionType(PermissionType.USER_CREATE);
        testPermission.setDescription("Create Users");
        testPermission.setResourceName("users");
        testPermission.setAction("create");
        testPermission.setIsActive(true);

        testRole = new UserRole();
        testRole.setId(roleId);
        testRole.setRoleName(RoleType.ADMIN);
        testRole.setDescription("Administrator Role");
        testRole.setIsActive(true);
        testRole.setPermissions(new HashSet<>(Collections.singletonList(testPermission)));
        testRole.setUsers(new HashSet<>());
    }

    @Test
    @DisplayName("Should get all active roles")
    void testGetAllRoles() {
        when(userRoleRepository.findAllByIsActiveTrue()).thenReturn(Collections.singletonList(testRole));

        List<UserRole> result = roleService.getAllRoles();

        assertEquals(1, result.size());
        assertEquals(RoleType.ADMIN, result.get(0).getRoleName());
        verify(userRoleRepository, times(1)).findAllByIsActiveTrue();
    }

    @Test
    @DisplayName("Should get role by ID")
    void testGetRoleById() {
        when(userRoleRepository.findById(roleId)).thenReturn(Optional.of(testRole));

        Optional<UserRole> result = roleService.getRoleById(roleId);

        assertTrue(result.isPresent());
        assertEquals(RoleType.ADMIN, result.get().getRoleName());
    }

    @Test
    @DisplayName("Should get role by name")
    void testGetRoleByName() {
        when(userRoleRepository.findByRoleName(RoleType.ADMIN)).thenReturn(Optional.of(testRole));

        Optional<UserRole> result = roleService.getRoleByName(RoleType.ADMIN);

        assertTrue(result.isPresent());
        assertEquals("Administrator Role", result.get().getDescription());
    }

    @Test
    @DisplayName("Should create new role")
    void testCreateRole() {
        Set<Permission> permissions = new HashSet<>(Collections.singletonList(testPermission));
        when(userRoleRepository.findByRoleName(RoleType.ADMIN)).thenReturn(Optional.empty());
        when(userRoleRepository.save(any(UserRole.class))).thenReturn(testRole);

        UserRole result = roleService.createRole(RoleType.ADMIN, "Administrator Role", permissions);

        assertNotNull(result);
        assertEquals(RoleType.ADMIN, result.getRoleName());
        verify(userRoleRepository, times(1)).save(any(UserRole.class));
    }

    @Test
    @DisplayName("Should throw exception when creating duplicate role")
    void testCreateDuplicateRole() {
        when(userRoleRepository.findByRoleName(RoleType.ADMIN)).thenReturn(Optional.of(testRole));

        assertThrows(IllegalArgumentException.class, () -> {
            roleService.createRole(RoleType.ADMIN, "Administrator Role", new HashSet<>());
        });
    }

    @Test
    @DisplayName("Should update role")
    void testUpdateRole() {
        when(userRoleRepository.findById(roleId)).thenReturn(Optional.of(testRole));
        when(userRoleRepository.save(any(UserRole.class))).thenReturn(testRole);

        UserRole result = roleService.updateRole(roleId, "Updated Description");

        assertNotNull(result);
        verify(userRoleRepository, times(1)).save(any(UserRole.class));
    }

    @Test
    @DisplayName("Should deactivate role")
    void testDeactivateRole() {
        when(userRoleRepository.findById(roleId)).thenReturn(Optional.of(testRole));
        when(userRoleRepository.save(any(UserRole.class))).thenReturn(testRole);

        roleService.deactivateRole(roleId);

        verify(userRoleRepository, times(1)).save(any(UserRole.class));
    }

    @Test
    @DisplayName("Should add permission to role")
    void testAddPermissionToRole() {
        when(userRoleRepository.findById(roleId)).thenReturn(Optional.of(testRole));
        when(permissionRepository.findById(permissionId)).thenReturn(Optional.of(testPermission));
        when(userRoleRepository.save(any(UserRole.class))).thenReturn(testRole);

        roleService.addPermissionToRole(roleId, permissionId);

        verify(userRoleRepository, times(1)).save(any(UserRole.class));
    }

    @Test
    @DisplayName("Should remove permission from role")
    void testRemovePermissionFromRole() {
        when(userRoleRepository.findById(roleId)).thenReturn(Optional.of(testRole));
        when(permissionRepository.findById(permissionId)).thenReturn(Optional.of(testPermission));
        when(userRoleRepository.save(any(UserRole.class))).thenReturn(testRole);

        roleService.removePermissionFromRole(roleId, permissionId);

        verify(userRoleRepository, times(1)).save(any(UserRole.class));
    }

    @Test
    @DisplayName("Should get role permissions")
    void testGetRolePermissions() {
        when(userRoleRepository.findById(roleId)).thenReturn(Optional.of(testRole));

        Set<Permission> result = roleService.getRolePermissions(roleId);

        assertNotNull(result);
        assertTrue(result.size() > 0);
    }

    @Test
    @DisplayName("Should check if role has permission")
    void testRoleHasPermission() {
        when(userRoleRepository.findById(roleId)).thenReturn(Optional.of(testRole));

        boolean result = roleService.roleHasPermission(roleId, "USER_CREATE");

        assertTrue(result);
    }

    @Test
    @DisplayName("Should get user count by role")
    void testGetUserCountByRole() {
        testRole.getUsers().add(new com.setec.backend.Model.users()); // Add dummy user
        when(userRoleRepository.findById(roleId)).thenReturn(Optional.of(testRole));

        long result = roleService.getUserCountByRole(roleId);

        assertEquals(1, result);
    }
}
