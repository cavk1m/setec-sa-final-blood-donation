package com.setec.backend.Service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;

/**
 * Mock Email Service for testing without Gmail credentials
 * This service simulates email sending for development and testing
 */
@Service
@Slf4j
@Profile("test")
@Primary  // Ensure this takes precedence in test profile
public class MockEmailService implements EmailServiceInterface {
    
    @Override
    public void sendOtpEmail(String email, String otpCode, String purpose) {
        log.info("🎯 MOCK EMAIL SENT - OTP Email");
        log.info("   To: {}", email);
        log.info("   OTP Code: {}", otpCode);
        log.info("   Purpose: {}", purpose);
        log.info("   Subject: Your {} Verification Code", purpose);
        log.info("   ✅ In real mode, this would be sent via Gmail SMTP");
        
        // Simulate email sending delay
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
    
    @Override
    public void sendWelcomeEmail(String email, String fullName) {
        log.info("🎯 MOCK EMAIL SENT - Welcome Email");
        log.info("   To: {}", email);
        log.info("   Name: {}", fullName);
        log.info("   Subject: Welcome to Blood Donation System!");
        log.info("   ✅ In real mode, this would be sent via Gmail SMTP");
        
        // Simulate email sending delay
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
    
    @Override
    public void sendPasswordChangeNotification(String email, String fullName) {
        log.info("🎯 MOCK EMAIL SENT - Password Change Notification");
        log.info("   To: {}", email);
        log.info("   Name: {}", fullName);
        log.info("   Subject: Password Changed Successfully");
        log.info("   ✅ In real mode, this would be sent via Gmail SMTP");
        
        // Simulate email sending delay
        try {
            Thread.sleep(100);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }
}