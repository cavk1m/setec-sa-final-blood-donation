package com.setec.backend.Security;

import com.setec.backend.Enum.BloodType;
import com.setec.backend.Enum.PermissionType;
import com.setec.backend.Enum.Role;
import com.setec.backend.Enum.RoleType;
import com.setec.backend.Model.Permission;
import com.setec.backend.Model.UserRole;
import com.setec.backend.Model.users;
import com.setec.backend.Repository.UserRepository;
import com.setec.backend.Service.PermissionService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * Integration tests for PermissionValidator AspectJ validator
 */
@ExtendWith(MockitoExtension.class)
class PermissionValidatorTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PermissionService permissionService;

    @Mock
    private SecurityContext securityContext;

    @Mock
    private Authentication authentication;

    private PermissionValidator permissionValidator;
    private users testUser;

    @BeforeEach
    void setUp() {
        permissionValidator = new PermissionValidator(userRepository, permissionService);

        // Create test user
        testUser = new users();
        testUser.setId(UUID.randomUUID());
        testUser.setEmail("test@example.com");
        testUser.setFullName("Test User");
        testUser.setPhone("1234567890");
        testUser.setAddress("123 Main St");
        testUser.setPasswordHash("hash");
        testUser.setRole(Role.ADMIN);
        testUser.setBloodType(BloodType.O_POSITIVE);
        testUser.setIsActive(true);
        testUser.setEmailVerified(true);

        // Setup security context mocks
        SecurityContextHolder.setContext(securityContext);
    }

    @Test
    void validatePermission_UserAuthenticated_WithRequiredPermission_ShouldSucceed() throws Throwable {
        // Arrange
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.isAuthenticated()).thenReturn(true);
        when(authentication.getName()).thenReturn("test@example.com");
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(permissionService.userHasPermission(testUser.getId(), PermissionType.USER_CREATE))
                .thenReturn(true);

        // Act
        Object result = permissionValidator.validatePermission(
                mock(org.aspectj.lang.ProceedingJoinPoint.class),
                createRequirePermission("USER_CREATE")
        );

        // Assert
        assertNull(result); // Method execution succeeded
        verify(userRepository).findByEmail("test@example.com");
        verify(permissionService).userHasPermission(testUser.getId(), PermissionType.USER_CREATE);
    }

    @Test
    void validatePermission_UserAuthenticated_WithoutRequiredPermission_ShouldThrow() {
        // Arrange
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.isAuthenticated()).thenReturn(true);
        when(authentication.getName()).thenReturn("test@example.com");
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(permissionService.userHasPermission(testUser.getId(), PermissionType.ADMIN_DELETE))
                .thenReturn(false);

        // Act & Assert
        assertThrows(SecurityException.class, () -> {
            permissionValidator.validatePermission(
                    mock(org.aspectj.lang.ProceedingJoinPoint.class),
                    createRequirePermission("ADMIN_DELETE")
            );
        });

        verify(permissionService).userHasPermission(testUser.getId(), PermissionType.ADMIN_DELETE);
    }

    @Test
    void validatePermission_UserNotAuthenticated_ShouldThrow() {
        // Arrange
        when(securityContext.getAuthentication()).thenReturn(null);

        // Act & Assert
        assertThrows(SecurityException.class, () -> {
            permissionValidator.validatePermission(
                    mock(org.aspectj.lang.ProceedingJoinPoint.class),
                    createRequirePermission("USER_CREATE")
            );
        });
    }

    @Test
    void validatePermission_UserNotFound_ShouldThrow() {
        // Arrange
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.isAuthenticated()).thenReturn(true);
        when(authentication.getName()).thenReturn("unknown@example.com");
        when(userRepository.findByEmail("unknown@example.com")).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(SecurityException.class, () -> {
            permissionValidator.validatePermission(
                    mock(org.aspectj.lang.ProceedingJoinPoint.class),
                    createRequirePermission("USER_CREATE")
            );
        });
    }

    @Test
    void validatePermission_InvalidPermissionName_ShouldThrow() {
        // Arrange
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.isAuthenticated()).thenReturn(true);
        when(authentication.getName()).thenReturn("test@example.com");
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));

        // Act & Assert
        assertThrows(SecurityException.class, () -> {
            permissionValidator.validatePermission(
                    mock(org.aspectj.lang.ProceedingJoinPoint.class),
                    createRequirePermission("INVALID_PERMISSION")
            );
        });
    }

    /**
     * Helper method to create a mock RequirePermission annotation
     */
    private RequirePermission createRequirePermission(String permissionValue) {
        return new RequirePermission() {
            @Override
            public String value() {
                return permissionValue;
            }

            @Override
            public Class<? extends java.lang.annotation.Annotation> annotationType() {
                return RequirePermission.class;
            }
        };
    }
}
