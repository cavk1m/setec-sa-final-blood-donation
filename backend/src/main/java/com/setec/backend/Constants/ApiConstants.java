package com.setec.backend.Constants;

/**
 * API Constants for the Blood Donation System
 * Contains common constants used across the application
 */
public final class ApiConstants {
    
    // Private constructor to prevent instantiation
    private ApiConstants() {
        throw new UnsupportedOperationException("This is a utility class and cannot be instantiated");
    }
    
    // HTTP Status Messages
    public static final String SUCCESS_MESSAGE = "Operation completed successfully";
    public static final String ERROR_MESSAGE = "An error occurred while processing the request";
    public static final String VALIDATION_ERROR_MESSAGE = "Validation failed";
    public static final String AUTHENTICATION_ERROR_MESSAGE = "Authentication failed";
    public static final String AUTHORIZATION_ERROR_MESSAGE = "Authorization failed";
    public static final String NOT_FOUND_MESSAGE = "Resource not found";
    public static final String CONFLICT_MESSAGE = "Resource already exists";
    
    // User-related constants
    public static final String USER_NOT_FOUND = "User not found";
    public static final String USER_ALREADY_EXISTS = "User already exists with this email";
    public static final String USER_CREATED_SUCCESSFULLY = "User registered successfully";
    public static final String USER_UPDATED_SUCCESSFULLY = "User profile updated successfully";
    public static final String USER_DELETED_SUCCESSFULLY = "User account deactivated successfully";
    
    // Authentication constants
    public static final String LOGIN_SUCCESSFUL = "Login successful";
    public static final String INVALID_CREDENTIALS = "Invalid email or password";
    public static final String PASSWORD_CHANGED_SUCCESSFULLY = "Password changed successfully";
    public static final String PASSWORD_RESET_SUCCESSFUL = "Password reset successful";
    
    // OTP-related constants
    public static final String OTP_SENT_SUCCESSFULLY = "OTP sent successfully to your email";
    public static final String OTP_VERIFIED_SUCCESSFULLY = "OTP verified successfully";
    public static final String OTP_INVALID = "Invalid OTP code";
    public static final String OTP_EXPIRED = "OTP code has expired";
    public static final String OTP_ALREADY_VERIFIED = "OTP has already been verified";
    
    // JWT-related constants
    public static final String JWT_TOKEN_GENERATED = "JWT token generated successfully";
    public static final String JWT_TOKEN_INVALID = "Invalid JWT token";
    public static final String JWT_TOKEN_EXPIRED = "JWT token has expired";
    
    // File upload constants
    public static final String FILE_UPLOADED_SUCCESSFULLY = "File uploaded successfully";
    public static final String FILE_DELETED_SUCCESSFULLY = "File deleted successfully";
    public static final String FILE_TOO_LARGE = "File size exceeds maximum limit";
    public static final String FILE_TYPE_NOT_SUPPORTED = "File type not supported";
    public static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    public static final String[] SUPPORTED_IMAGE_TYPES = {"image/jpeg", "image/jpg", "image/png", "image/gif"};
    
    // Email constants
    public static final String EMAIL_SENT_SUCCESSFULLY = "Email sent successfully";
    public static final String EMAIL_SEND_FAILED = "Failed to send email";
    
    // Blood donation constants
    public static final String DONATION_CREATED_SUCCESSFULLY = "Blood donation record created successfully";
    public static final String DONATION_UPDATED_SUCCESSFULLY = "Blood donation record updated successfully";
    public static final String DONATION_NOT_FOUND = "Blood donation record not found";
    
    // Profile picture constants
    public static final String PROFILE_PICTURE_UPDATED = "Profile picture updated successfully";
    public static final String PROFILE_PICTURE_REMOVED = "Profile picture removed successfully";
    
    // Validation constants
    public static final String FIELD_REQUIRED = "This field is required";
    public static final String INVALID_EMAIL_FORMAT = "Invalid email format";
    public static final String INVALID_PHONE_FORMAT = "Invalid phone number format";
    public static final String PASSWORD_TOO_SHORT = "Password must be at least 8 characters long";
    public static final String INVALID_BLOOD_TYPE = "Invalid blood type";
    
    // Request path constants
    public static final String API_BASE_PATH = "/api";
    public static final String USER_BASE_PATH = "/users";
    public static final String AUTH_BASE_PATH = "/auth";
    
    // Header constants
    public static final String AUTHORIZATION_HEADER = "Authorization";
    public static final String BEARER_PREFIX = "Bearer ";
    public static final String CONTENT_TYPE_JSON = "application/json";
    
    // Date format constants
    public static final String DATE_TIME_FORMAT = "yyyy-MM-dd HH:mm:ss";
    public static final String DATE_FORMAT = "yyyy-MM-dd";
    
    // Default values
    public static final int DEFAULT_PAGE_SIZE = 20;
    public static final int DEFAULT_PAGE_NUMBER = 0;
    public static final String DEFAULT_SORT_DIRECTION = "ASC";
    public static final String DEFAULT_SORT_FIELD = "createdDate";
}