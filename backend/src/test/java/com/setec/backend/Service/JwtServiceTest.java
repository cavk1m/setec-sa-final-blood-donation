package com.setec.backend.Service;

import com.setec.backend.Enum.BloodType;
import com.setec.backend.Enum.Role;
import com.setec.backend.Model.users;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class JwtServiceTest {
    
    @Mock
    private PermissionService permissionService;
    
    private JwtService jwtService;
    private users testUser;
    
    @BeforeEach
    void setUp() {
        jwtService = new JwtService(permissionService);
        
        // Set up JWT configuration
        ReflectionTestUtils.setField(jwtService, "secret", "myVerySecretJwtKeyForBloodDonationSystemThatIsLongEnoughForSecurity");
        ReflectionTestUtils.setField(jwtService, "jwtExpiration", 86400000L); // 24 hours
        
        // Create test user
         testUser = new users();
         testUser.setId(UUID.randomUUID());
         testUser.setFullName("John Doe");
         testUser.setEmail("john.doe@example.com");
         testUser.setPhone("1234567890");
         testUser.setAddress("123 Main St");
         testUser.setDateOfBirth(new Date());
         testUser.setPasswordHash("hashedPassword");
         testUser.setBloodType(BloodType.A_POSITIVE);
        testUser.setRole(Role.USER);
        testUser.setIsActive(true);
        testUser.setEmailVerified(true);
        testUser.setLastLoginDate(LocalDateTime.now());
    }
    
    @Test
    void generateToken_Success() {
        // When
        String token = jwtService.generateToken(testUser);
        
        // Then
        assertNotNull(token);
        assertFalse(token.isEmpty());
        assertTrue(token.contains("."));
    }
    
    @Test
    void extractUsername_Success() {
        // Given
        String token = jwtService.generateToken(testUser);
        
        // When
        String extractedUsername = jwtService.extractUsername(token);
        
        // Then
        assertEquals(testUser.getEmail(), extractedUsername);
    }
    
    @Test
    void extractUserId_Success() {
        // Given
        String token = jwtService.generateToken(testUser);
        
        // When
        UUID extractedUserId = jwtService.extractUserId(token);
        
        // Then
        assertEquals(testUser.getId(), extractedUserId);
    }
    
    @Test
    void extractUserRole_Success() {
        // Given
        String token = jwtService.generateToken(testUser);
        
        // When
        String extractedRole = jwtService.extractUserRole(token);
        
        // Then
        assertEquals(testUser.getRole().toString(), extractedRole);
    }
    
    @Test
    void extractExpiration_Success() {
        // Given
        String token = jwtService.generateToken(testUser);
        
        // When
        Date expiration = jwtService.extractExpiration(token);
        
        // Then
        assertNotNull(expiration);
        assertTrue(expiration.after(new Date()));
    }
    
    @Test
    void isTokenExpired_FalseForValidToken() {
        // Given
        String token = jwtService.generateToken(testUser);
        
        // When
        Boolean isExpired = jwtService.isTokenExpired(token);
        
        // Then
        assertFalse(isExpired);
    }
    
    @Test
    void validateToken_Success() {
        // Given
        String token = jwtService.generateToken(testUser);
        
        // When
        Boolean isValid = jwtService.validateToken(token, testUser);
        
        // Then
        assertTrue(isValid);
    }
    
    @Test
    void validateToken_InvalidUser() {
        // Given
        String token = jwtService.generateToken(testUser);
        
        users differentUser = new users();
        differentUser.setId(UUID.randomUUID());
        differentUser.setEmail("different@example.com");
        
        // When
        Boolean isValid = jwtService.validateToken(token, differentUser);
        
        // Then
        assertFalse(isValid);
    }
    
    @Test
    void getTokenRemainingTime_Success() {
        // Given
        String token = jwtService.generateToken(testUser);
        
        // When
        long remainingTime = jwtService.getTokenRemainingTime(token);
        
        // Then
        assertTrue(remainingTime > 0);
        assertTrue(remainingTime <= 86400000L); // Should be less than or equal to 24 hours
    }
    
    @Test
    void needsRefresh_FalseForNewToken() {
        // Given
        String token = jwtService.generateToken(testUser);
        
        // When
        boolean needsRefresh = jwtService.needsRefresh(token);
        
        // Then
        assertFalse(needsRefresh); // New token shouldn't need refresh
    }
    
    @Test
    void refreshToken_Success() throws InterruptedException {
        // Given
        String originalToken = jwtService.generateToken(testUser);
        // Small delay to ensure different timestamp
        Thread.sleep(100);
        
        // When
        String refreshedToken = jwtService.refreshToken(originalToken, testUser);
        
        // Then
        assertNotNull(refreshedToken);
        // Tokens may be different due to timestamp, but at minimum should be valid
        assertTrue(jwtService.validateToken(refreshedToken, testUser));
        assertEquals(testUser.getEmail(), jwtService.extractUsername(refreshedToken));
    }
    
    @Test
    void refreshToken_InvalidToken() {
        // Given
        String invalidToken = "invalid.token.here";
        
        // When & Then
        assertThrows(RuntimeException.class, () -> {
            jwtService.refreshToken(invalidToken, testUser);
        });
    }
}