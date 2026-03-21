package com.setec.backend.Service;

import com.setec.backend.Enum.PermissionType;
import com.setec.backend.Model.Permission;
import com.setec.backend.Repository.PermissionRepository;
import com.setec.backend.Service.Serviceimpl.PermissionServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@DisplayName("PermissionService Tests")
class PermissionServiceTest {

    @Mock
    private PermissionRepository permissionRepository;

    @InjectMocks
    private PermissionServiceImpl permissionService;

    private Permission testPermission;
    private UUID permissionId;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        permissionId = UUID.randomUUID();
        
        testPermission = new Permission();
        testPermission.setId(permissionId);
        testPermission.setPermissionType(PermissionType.USER_CREATE);
        testPermission.setDescription("Create Users");
        testPermission.setResourceName("users");
        testPermission.setAction("create");
        testPermission.setIsActive(true);
        testPermission.setCreatedDate(LocalDateTime.now());
        testPermission.setUpdatedDate(LocalDateTime.now());
    }

    @Test
    @DisplayName("Should get all active permissions")
    void testGetAllPermissions() {
        Permission perm2 = new Permission();
        perm2.setId(UUID.randomUUID());
        perm2.setPermissionType(PermissionType.USER_READ);
        perm2.setDescription("Read Users");
        perm2.setResourceName("users");
        perm2.setAction("read");
        perm2.setIsActive(true);

        when(permissionRepository.findAllByIsActiveTrue()).thenReturn(Arrays.asList(testPermission, perm2));

        List<Permission> result = permissionService.getAllPermissions();

        assertEquals(2, result.size());
        verify(permissionRepository, times(1)).findAllByIsActiveTrue();
    }

    @Test
    @DisplayName("Should get permission by ID")
    void testGetPermissionById() {
        when(permissionRepository.findById(permissionId)).thenReturn(Optional.of(testPermission));

        Optional<Permission> result = permissionService.getPermissionById(permissionId);

        assertTrue(result.isPresent());
        assertEquals(PermissionType.USER_CREATE, result.get().getPermissionType());
    }

    @Test
    @DisplayName("Should get permission by type")
    void testGetPermissionByType() {
        when(permissionRepository.findByPermissionType(PermissionType.USER_CREATE))
                .thenReturn(Optional.of(testPermission));

        Optional<Permission> result = permissionService.getPermissionByType(PermissionType.USER_CREATE);

        assertTrue(result.isPresent());
        assertEquals("Create Users", result.get().getDescription());
    }

    @Test
    @DisplayName("Should create new permission")
    void testCreatePermission() {
        when(permissionRepository.findByPermissionType(PermissionType.USER_CREATE)).thenReturn(Optional.empty());
        when(permissionRepository.save(any(Permission.class))).thenReturn(testPermission);

        Permission result = permissionService.createPermission(
                PermissionType.USER_CREATE,
                "Create Users",
                "users",
                "create"
        );

        assertNotNull(result);
        assertEquals(PermissionType.USER_CREATE, result.getPermissionType());
        verify(permissionRepository, times(1)).save(any(Permission.class));
    }

    @Test
    @DisplayName("Should throw exception when creating duplicate permission")
    void testCreateDuplicatePermission() {
        when(permissionRepository.findByPermissionType(PermissionType.USER_CREATE))
                .thenReturn(Optional.of(testPermission));

        assertThrows(IllegalArgumentException.class, () -> {
            permissionService.createPermission(
                    PermissionType.USER_CREATE,
                    "Create Users",
                    "users",
                    "create"
            );
        });
    }

    @Test
    @DisplayName("Should update permission")
    void testUpdatePermission() {
        when(permissionRepository.findById(permissionId)).thenReturn(Optional.of(testPermission));
        when(permissionRepository.save(any(Permission.class))).thenReturn(testPermission);

        Permission result = permissionService.updatePermission(permissionId, "Updated Description");

        assertNotNull(result);
        verify(permissionRepository, times(1)).save(any(Permission.class));
    }

    @Test
    @DisplayName("Should throw exception when updating non-existent permission")
    void testUpdateNonExistentPermission() {
        when(permissionRepository.findById(permissionId)).thenReturn(Optional.empty());

        assertThrows(IllegalArgumentException.class, () -> {
            permissionService.updatePermission(permissionId, "Updated Description");
        });
    }

    @Test
    @DisplayName("Should deactivate permission")
    void testDeactivatePermission() {
        when(permissionRepository.findById(permissionId)).thenReturn(Optional.of(testPermission));
        when(permissionRepository.save(any(Permission.class))).thenReturn(testPermission);

        permissionService.deactivatePermission(permissionId);

        verify(permissionRepository, times(1)).save(any(Permission.class));
    }

    @Test
    @DisplayName("Should check if permission exists")
    void testPermissionExists() {
        when(permissionRepository.findByPermissionType(PermissionType.USER_CREATE))
                .thenReturn(Optional.of(testPermission));

        boolean result = permissionService.permissionExists(PermissionType.USER_CREATE);

        assertTrue(result);
    }

    @Test
    @DisplayName("Should return false when permission does not exist")
    void testPermissionNotExists() {
        when(permissionRepository.findByPermissionType(PermissionType.USER_DELETE))
                .thenReturn(Optional.empty());

        boolean result = permissionService.permissionExists(PermissionType.USER_DELETE);

        assertFalse(result);
    }
}
