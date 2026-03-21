package com.setec.backend.Service;

/**
 * Interface for Email Service implementations
 * Allows for different implementations (real SMTP, mock, TestMail.app, etc.)
 */
public interface EmailServiceInterface {
    
    /**
     * Send OTP verification email
     * @param email recipient email
     * @param otpCode the OTP code
     * @param purpose the purpose (registration, password reset, etc.)
     */
    void sendOtpEmail(String email, String otpCode, String purpose);
    
    /**
     * Send welcome email after successful registration
     * @param email recipient email
     * @param fullName user's full name
     */
    void sendWelcomeEmail(String email, String fullName);
    
    /**
     * Send notification when password is changed
     * @param email recipient email
     * @param fullName user's full name
     */
    void sendPasswordChangeNotification(String email, String fullName);
}