package com.setec.backend.Security;

import com.setec.backend.Enum.BloodType;
import com.setec.backend.Enum.Role;
import com.setec.backend.Enum.RoleType;
import com.setec.backend.Model.UserRole;
import com.setec.backend.Model.users;
import com.setec.backend.Repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

/**
 * Integration tests for RoleValidator AspectJ validator
 */
@ExtendWith(MockitoExtension.class)
class RoleValidatorTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private SecurityContext securityContext;

    @Mock
    private Authentication authentication;

    private RoleValidator roleValidator;
    private users testUser;

    @BeforeEach
    void setUp() {
        roleValidator = new RoleValidator(userRepository);

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

        // Create user roles
        UserRole adminRole = new UserRole(RoleType.ADMIN, "Admin role");
        testUser.setUserRoles(new ArrayList<>(Arrays.asList(adminRole)));

        // Setup security context mocks
        SecurityContextHolder.setContext(securityContext);
    }

    @Test
    void validateRole_UserAuthenticated_WithRequiredRole_ShouldSucceed() throws Throwable {
        // Arrange
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.isAuthenticated()).thenReturn(true);
        when(authentication.getName()).thenReturn("test@example.com");
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));

        // Act
        Object result = roleValidator.validateRole(
                mock(org.aspectj.lang.ProceedingJoinPoint.class),
                createRequireRole(new String[]{"ADMIN"})
        );

        // Assert
        assertNull(result); // Method execution succeeded
        verify(userRepository).findByEmail("test@example.com");
    }

    @Test
    void validateRole_UserAuthenticated_WithMultipleRequiredRoles_OneMatches_ShouldSucceed() throws Throwable {
        // Arrange
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.isAuthenticated()).thenReturn(true);
        when(authentication.getName()).thenReturn("test@example.com");
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));

        // Act
        Object result = roleValidator.validateRole(
                mock(org.aspectj.lang.ProceedingJoinPoint.class),
                createRequireRole(new String[]{"SUPER_ADMIN", "ADMIN"})
        );

        // Assert
        assertNull(result); // Method execution succeeded
        verify(userRepository).findByEmail("test@example.com");
    }

    @Test
    void validateRole_UserAuthenticated_WithoutRequiredRole_ShouldThrow() {
        // Arrange
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.isAuthenticated()).thenReturn(true);
        when(authentication.getName()).thenReturn("test@example.com");
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));

        // Act & Assert
        assertThrows(SecurityException.class, () -> {
            roleValidator.validateRole(
                    mock(org.aspectj.lang.ProceedingJoinPoint.class),
                    createRequireRole(new String[]{"SUPER_ADMIN"})
            );
        });

        verify(userRepository).findByEmail("test@example.com");
    }

    @Test
    void validateRole_UserNotAuthenticated_ShouldThrow() {
        // Arrange
        when(securityContext.getAuthentication()).thenReturn(null);

        // Act & Assert
        assertThrows(SecurityException.class, () -> {
            roleValidator.validateRole(
                    mock(org.aspectj.lang.ProceedingJoinPoint.class),
                    createRequireRole(new String[]{"ADMIN"})
            );
        });
    }

    @Test
    void validateRole_UserNotFound_ShouldThrow() {
        // Arrange
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.isAuthenticated()).thenReturn(true);
        when(authentication.getName()).thenReturn("unknown@example.com");
        when(userRepository.findByEmail("unknown@example.com")).thenReturn(Optional.empty());

        // Act & Assert
        assertThrows(SecurityException.class, () -> {
            roleValidator.validateRole(
                    mock(org.aspectj.lang.ProceedingJoinPoint.class),
                    createRequireRole(new String[]{"ADMIN"})
            );
        });
    }

    @Test
    void validateRole_UserWithoutRoles_ShouldThrow() {
        // Arrange
        users userWithoutRoles = new users();
        userWithoutRoles.setId(UUID.randomUUID());
        userWithoutRoles.setEmail("norroles@example.com");
        userWithoutRoles.setUserRoles(new ArrayList<>());

        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.isAuthenticated()).thenReturn(true);
        when(authentication.getName()).thenReturn("norroles@example.com");
        when(userRepository.findByEmail("norroles@example.com")).thenReturn(Optional.of(userWithoutRoles));

        // Act & Assert
        assertThrows(SecurityException.class, () -> {
            roleValidator.validateRole(
                    mock(org.aspectj.lang.ProceedingJoinPoint.class),
                    createRequireRole(new String[]{"ADMIN"})
            );
        });
    }

    @Test
    void validateRole_InvalidRoleName_ShouldThrow() {
        // Arrange
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.isAuthenticated()).thenReturn(true);
        when(authentication.getName()).thenReturn("test@example.com");
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));

        // Act & Assert
        assertThrows(SecurityException.class, () -> {
            roleValidator.validateRole(
                    mock(org.aspectj.lang.ProceedingJoinPoint.class),
                    createRequireRole(new String[]{"INVALID_ROLE"})
            );
        });
    }

    /**
     * Helper method to create a mock RequireRole annotation
     */
    private RequireRole createRequireRole(String[] roles) {
        return new RequireRole() {
            @Override
            public String[] value() {
                return roles;
            }

            @Override
            public boolean requireAll() {
                return false;
            }

            @Override
            public Class<? extends java.lang.annotation.Annotation> annotationType() {
                return RequireRole.class;
            }
        };
    }
}
