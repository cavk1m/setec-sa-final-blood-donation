package com.setec.backend.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Profile;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
@Profile("!test") // Not active in test profile
public class EmailService implements EmailServiceInterface {
    
    private static final Logger log = LoggerFactory.getLogger(EmailService.class);
    
    private final JavaMailSender mailSender;
    
    @Autowired
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }
    
    /**
     * Send OTP verification email
     */
    public void sendOtpEmail(String toEmail, String otpCode, String purpose) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setTo(toEmail);
            helper.setSubject(getSubject(purpose));
            helper.setText(buildOtpEmailContent(otpCode, purpose), true);
            helper.setFrom("bunthengseng9@gmail.com");
            
            mailSender.send(message);
            log.info("OTP email sent successfully to: {}", toEmail);
            
        } catch (MessagingException e) {
            log.error("Failed to send OTP email to {}: {}", toEmail, e.getMessage());
            throw new RuntimeException("Failed to send OTP email", e);
        }
    }
    
    /**
     * Send welcome email after successful registration
     */
    public void sendWelcomeEmail(String toEmail, String fullName) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setTo(toEmail);
            helper.setSubject("Welcome to Blood Donation System");
            helper.setText(buildWelcomeEmailContent(fullName), true);
            helper.setFrom("bunthengseng9@gmail.com");
            
            mailSender.send(message);
            log.info("Welcome email sent successfully to: {}", toEmail);
            
        } catch (MessagingException e) {
            log.error("Failed to send welcome email to {}: {}", toEmail, e.getMessage());
            // Don't throw exception for welcome email failure
        }
    }
    
    /**
     * Send password change notification email
     */
    public void sendPasswordChangeNotification(String toEmail, String fullName) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setTo(toEmail);
            helper.setSubject("Password Changed - Blood Donation System");
            helper.setText(buildPasswordChangeContent(fullName), true);
            helper.setFrom("bunthengseng9@gmail.com");
            
            mailSender.send(message);
            log.info("Password change notification sent successfully to: {}", toEmail);
            
        } catch (MessagingException e) {
            log.error("Failed to send password change notification to {}: {}", toEmail, e.getMessage());
            // Don't throw exception for notification email failure
        }
    }
    
    private String getSubject(String purpose) {
        return switch (purpose.toLowerCase()) {
            case "registration" -> "Verify Your Email - Blood Donation System";
            case "password_reset" -> "Password Reset Code - Blood Donation System";
            case "login_verification" -> "Login Verification Code - Blood Donation System";
            default -> "Verification Code - Blood Donation System";
        };
    }
    
    private String buildOtpEmailContent(String otpCode, String purpose) {
        String action = switch (purpose.toLowerCase()) {
            case "registration" -> "complete your registration";
            case "password_reset" -> "reset your password";
            case "login_verification" -> "verify your login";
            default -> "complete your verification";
        };
        
        return """
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
                        .header { background-color: #dc3545; color: white; padding: 20px; text-align: center; }
                        .content { padding: 20px; background-color: #f8f9fa; }
                        .otp-box { background-color: white; border: 2px solid #dc3545; border-radius: 8px; 
                                   padding: 20px; text-align: center; margin: 20px 0; }
                        .otp-code { font-size: 32px; font-weight: bold; color: #dc3545; letter-spacing: 5px; }
                        .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🩸 Blood Donation System</h1>
                        </div>
                        <div class="content">
                            <h2>Verification Code</h2>
                            <p>You have requested to %s. Please use the following verification code:</p>
                            <div class="otp-box">
                                <div class="otp-code">%s</div>
                            </div>
                            <p><strong>Important:</strong></p>
                            <ul>
                                <li>This code will expire in 10 minutes</li>
                                <li>Use this code only once</li>
                                <li>Never share this code with anyone</li>
                            </ul>
                            <p>If you didn't request this code, please ignore this email or contact support.</p>
                        </div>
                        <div class="footer">
                            <p>Blood Donation System - Saving Lives Together</p>
                        </div>
                    </div>
                </body>
                </html>
                """.formatted(action, otpCode);
    }
    
    private String buildWelcomeEmailContent(String fullName) {
        return """
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
                        .header { background-color: #28a745; color: white; padding: 20px; text-align: center; }
                        .content { padding: 20px; background-color: #f8f9fa; }
                        .welcome-box { background-color: white; border-radius: 8px; padding: 20px; margin: 20px 0; }
                        .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🩸 Welcome to Blood Donation System</h1>
                        </div>
                        <div class="content">
                            <div class="welcome-box">
                                <h2>Welcome, %s!</h2>
                                <p>Your account has been successfully created and verified.</p>
                                <p>Thank you for joining our blood donation community. Your willingness to help save lives is truly appreciated.</p>
                                <h3>What's next?</h3>
                                <ul>
                                    <li>Complete your profile information</li>
                                    <li>Upload a profile picture</li>
                                    <li>Find nearby donation centers</li>
                                    <li>Schedule your first donation</li>
                                </ul>
                                <p>Together, we can save lives!</p>
                            </div>
                        </div>
                        <div class="footer">
                            <p>Blood Donation System - Saving Lives Together</p>
                        </div>
                    </div>
                </body>
                </html>
                """.formatted(fullName);
    }
    
    private String buildPasswordChangeContent(String fullName) {
        return """
                <!DOCTYPE html>
                <html>
                <head>
                    <style>
                        .container { max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif; }
                        .header { background-color: #ffc107; color: black; padding: 20px; text-align: center; }
                        .content { padding: 20px; background-color: #f8f9fa; }
                        .alert-box { background-color: #fff3cd; border: 1px solid #ffeaa7; 
                                    border-radius: 8px; padding: 20px; margin: 20px 0; }
                        .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>🔐 Password Changed</h1>
                        </div>
                        <div class="content">
                            <div class="alert-box">
                                <h2>Hello %s,</h2>
                                <p>Your password has been successfully changed.</p>
                                <p><strong>If you made this change:</strong> No further action is needed.</p>
                                <p><strong>If you didn't make this change:</strong> Please contact our support team immediately.</p>
                                <p>For your security, we recommend:</p>
                                <ul>
                                    <li>Using a strong, unique password</li>
                                    <li>Not sharing your login credentials</li>
                                    <li>Logging out from shared devices</li>
                                </ul>
                            </div>
                        </div>
                        <div class="footer">
                            <p>Blood Donation System - Saving Lives Together</p>
                        </div>
                    </div>
                </body>
                </html>
                """.formatted(fullName);
    }
}