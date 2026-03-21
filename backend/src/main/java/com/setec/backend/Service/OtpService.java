package com.setec.backend.Service;

import com.setec.backend.Model.otp_codes;
import com.setec.backend.Repository.OtpRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class OtpService {
    
    private static final Logger log = LoggerFactory.getLogger(OtpService.class);
    
    private final OtpRepository otpRepository;
    private final EmailService emailService;
    private final SecureRandom secureRandom;
    
    // OTP Configuration
    private static final int OTP_LENGTH = 6;
    private static final int OTP_EXPIRY_MINUTES = 10;
    private static final int MAX_OTP_REQUESTS_PER_HOUR = 5;
    
    @Autowired
    public OtpService(OtpRepository otpRepository, EmailService emailService) {
        this.otpRepository = otpRepository;
        this.emailService = emailService;
        this.secureRandom = new SecureRandom();
    }
    
    /**
     * Generate and send OTP for email verification
     */
    @Transactional
    public void generateAndSendOtp(String email, String purpose) {
        // Check rate limiting
        if (isRateLimited(email)) {
            throw new RuntimeException("Too many OTP requests. Please wait before requesting again.");
        }
        
        // Generate OTP
        String otpCode = generateOtpCode();
        LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(OTP_EXPIRY_MINUTES);
        
        // Save OTP to database
        otp_codes otpEntity = new otp_codes();
        otpEntity.setContact(email);
        otpEntity.setOtp_code(otpCode);
        otpEntity.setExpires_at(expiryTime);
        otpEntity.setVerified(false);
        
        otpRepository.save(otpEntity);
        
        // Send OTP via email
        try {
            emailService.sendOtpEmail(email, otpCode, purpose);
            log.info("OTP generated and sent successfully for email: {} | DEBUG OTP: {}", email, otpCode);
        } catch (Exception e) {
            log.error("Failed to send OTP email for {}: {}", email, e.getMessage());
            throw new RuntimeException("Failed to send OTP email", e);
        }
    }
    
    /**
     * Verify OTP code using native SQL to bypass UUID casting issues
     */
    @Transactional
    public boolean verifyOtp(String email, String otpCode) {
        try {
            log.info("Attempting to verify OTP for email: {} with code: {}", email, otpCode);
            
            // Use native SQL to avoid UUID casting issues
            Optional<otp_codes> otpOptional = otpRepository.findValidOtpNative(
                email, otpCode, LocalDateTime.now()
            );
            
            if (otpOptional.isPresent()) {
                log.info("Found valid OTP for email: {}", email);
                
                // Mark as verified using native SQL to avoid UUID casting issues
                int updatedRows = otpRepository.markOtpAsVerifiedNative(email, otpCode);
                
                if (updatedRows > 0) {
                    log.info("OTP verified successfully for email: {}, updated {} rows", email, updatedRows);
                    return true;
                } else {
                    log.warn("Failed to mark OTP as verified for email: {}", email);
                }
            } else {
                log.warn("No valid OTP found for email: {} with code: {}", email, otpCode);
            }
            
        } catch (Exception e) {
            log.error("Error during OTP verification for email {}: {}", email, e.getMessage(), e);
            throw new RuntimeException("OTP verification failed: " + e.getMessage());
        }
        
        log.warn("Invalid or expired OTP provided for email: {}", email);
        return false;
    }
    
    /**
     * Check if the latest unverified OTP is still valid
     */
    public boolean hasValidUnverifiedOtp(String email) {
        Optional<otp_codes> otpOptional = otpRepository.findLatestUnverifiedByContact(email);
        
        if (otpOptional.isPresent()) {
            otp_codes otp = otpOptional.get();
            return otp.getExpires_at().isAfter(LocalDateTime.now());
        }
        
        return false;
    }
    
    /**
     * Get remaining time for current OTP in minutes
     */
    public long getOtpRemainingTimeMinutes(String email) {
        Optional<otp_codes> otpOptional = otpRepository.findLatestUnverifiedByContact(email);
        
        if (otpOptional.isPresent()) {
            otp_codes otp = otpOptional.get();
            LocalDateTime now = LocalDateTime.now();
            if (otp.getExpires_at().isAfter(now)) {
                return java.time.Duration.between(now, otp.getExpires_at()).toMinutes();
            }
        }
        
        return 0;
    }
    
    /**
     * Clean up expired OTPs (should be called periodically)
     */
    @Transactional
    public int cleanupExpiredOtps() {
        int deletedCount = otpRepository.deleteExpiredOtps(LocalDateTime.now());
        log.info("Cleaned up {} expired OTPs", deletedCount);
        return deletedCount;
    }
    
    /**
     * Invalidate all OTPs for a contact
     */
    @Transactional
    public void invalidateAllOtpsForContact(String email) {
        otpRepository.deleteByContact(email);
        log.info("Invalidated all OTPs for email: {}", email);
    }
    
    /**
     * Generate random OTP code
     */
    private String generateOtpCode() {
        StringBuilder otp = new StringBuilder();
        for (int i = 0; i < OTP_LENGTH; i++) {
            otp.append(secureRandom.nextInt(10));
        }
        return otp.toString();
    }
    
    /**
     * Check if user is rate limited for OTP requests
     */
    private boolean isRateLimited(String email) {
        LocalDateTime oneHourAgo = LocalDateTime.now().minusHours(1);
        long recentOtpCount = otpRepository.countUnverifiedOtpsSince(email, oneHourAgo);
        return recentOtpCount >= MAX_OTP_REQUESTS_PER_HOUR;
    }
}