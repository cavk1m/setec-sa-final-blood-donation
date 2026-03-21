package com.setec.backend.Service;

import com.setec.backend.Model.otp_codes;
import com.setec.backend.Repository.OtpRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class OtpServiceTest {
    
    @Mock
    private OtpRepository otpRepository;
    
    @Mock
    private EmailService emailService;
    
    @InjectMocks
    private OtpService otpService;
    
    private String testEmail;
    private String testOtpCode;
    private otp_codes testOtpEntity;
    
    @BeforeEach
    void setUp() {
        testEmail = "test@example.com";
        testOtpCode = "123456";
        
        testOtpEntity = new otp_codes();
        testOtpEntity.setId(UUID.randomUUID());
        testOtpEntity.setContact(testEmail);
        testOtpEntity.setOtp_code(testOtpCode);
        testOtpEntity.setExpires_at(LocalDateTime.now().plusMinutes(10));
        testOtpEntity.setVerified(false);
    }
    
    @Test
    void generateAndSendOtp_Success() {
        // Given
        when(otpRepository.countUnverifiedOtpsSince(eq(testEmail), any(LocalDateTime.class)))
            .thenReturn(0L);
        when(otpRepository.save(any(otp_codes.class))).thenReturn(testOtpEntity);
        doNothing().when(emailService).sendOtpEmail(anyString(), anyString(), anyString());
        
        // When & Then
        assertDoesNotThrow(() -> otpService.generateAndSendOtp(testEmail, "registration"));
        
        // Verify
        verify(otpRepository, times(1)).save(any(otp_codes.class));
        verify(emailService, times(1)).sendOtpEmail(eq(testEmail), anyString(), eq("registration"));
    }
    
    @Test
    void generateAndSendOtp_RateLimited() {
        // Given
        when(otpRepository.countUnverifiedOtpsSince(eq(testEmail), any(LocalDateTime.class)))
            .thenReturn(6L); // Exceeds limit of 5
        
        // When & Then
        RuntimeException exception = assertThrows(RuntimeException.class, 
            () -> otpService.generateAndSendOtp(testEmail, "registration"));
        
        assertEquals("Too many OTP requests. Please wait before requesting again.", exception.getMessage());
        
        // Verify
        verify(otpRepository, never()).save(any(otp_codes.class));
        verify(emailService, never()).sendOtpEmail(anyString(), anyString(), anyString());
    }
    
    @Test
    void verifyOtp_Success() {
        // Given
        when(otpRepository.findValidOtpByContactAndCode(eq(testEmail), eq(testOtpCode), any(LocalDateTime.class)))
            .thenReturn(Optional.of(testOtpEntity));
        when(otpRepository.save(any(otp_codes.class))).thenReturn(testOtpEntity);
        
        // When
        boolean result = otpService.verifyOtp(testEmail, testOtpCode);
        
        // Then
        assertTrue(result);
        verify(otpRepository, times(1)).save(any(otp_codes.class));
    }
    
    @Test
    void verifyOtp_InvalidOtp() {
        // Given
        when(otpRepository.findValidOtpByContactAndCode(eq(testEmail), eq(testOtpCode), any(LocalDateTime.class)))
            .thenReturn(Optional.empty());
        
        // When
        boolean result = otpService.verifyOtp(testEmail, testOtpCode);
        
        // Then
        assertFalse(result);
        verify(otpRepository, never()).save(any(otp_codes.class));
    }
    
    @Test
    void hasValidUnverifiedOtp_True() {
        // Given
        testOtpEntity.setExpires_at(LocalDateTime.now().plusMinutes(5));
        when(otpRepository.findLatestUnverifiedByContact(testEmail))
            .thenReturn(Optional.of(testOtpEntity));
        
        // When
        boolean result = otpService.hasValidUnverifiedOtp(testEmail);
        
        // Then
        assertTrue(result);
    }
    
    @Test
    void hasValidUnverifiedOtp_Expired() {
        // Given
        testOtpEntity.setExpires_at(LocalDateTime.now().minusMinutes(5));
        when(otpRepository.findLatestUnverifiedByContact(testEmail))
            .thenReturn(Optional.of(testOtpEntity));
        
        // When
        boolean result = otpService.hasValidUnverifiedOtp(testEmail);
        
        // Then
        assertFalse(result);
    }
    
    @Test
    void hasValidUnverifiedOtp_NoOtp() {
        // Given
        when(otpRepository.findLatestUnverifiedByContact(testEmail))
            .thenReturn(Optional.empty());
        
        // When
        boolean result = otpService.hasValidUnverifiedOtp(testEmail);
        
        // Then
        assertFalse(result);
    }
    
    @Test
    void getOtpRemainingTimeMinutes_Valid() {
        // Given
        testOtpEntity.setExpires_at(LocalDateTime.now().plusMinutes(5));
        when(otpRepository.findLatestUnverifiedByContact(testEmail))
            .thenReturn(Optional.of(testOtpEntity));
        
        // When
        long remainingTime = otpService.getOtpRemainingTimeMinutes(testEmail);
        
        // Then
        assertTrue(remainingTime > 0);
        assertTrue(remainingTime <= 5);
    }
    
    @Test
    void cleanupExpiredOtps_Success() {
        // Given
        int deletedCount = 5;
        when(otpRepository.deleteExpiredOtps(any(LocalDateTime.class)))
            .thenReturn(deletedCount);
        
        // When
        int result = otpService.cleanupExpiredOtps();
        
        // Then
        assertEquals(deletedCount, result);
        verify(otpRepository, times(1)).deleteExpiredOtps(any(LocalDateTime.class));
    }
    
    @Test
    void invalidateAllOtpsForContact_Success() {
        // Given
        doNothing().when(otpRepository).deleteByContact(testEmail);
        
        // When & Then
        assertDoesNotThrow(() -> otpService.invalidateAllOtpsForContact(testEmail));
        
        // Verify
        verify(otpRepository, times(1)).deleteByContact(testEmail);
    }
}