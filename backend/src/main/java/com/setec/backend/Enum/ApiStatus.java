package com.setec.backend.Enum;

/**
 * HTTP Status Codes for Blood Donation System
 * Standardized status codes for consistent API responses
 */
public enum ApiStatus {
    
    // Success Status Codes (2xx)
    SUCCESS(200, "SUCCESS", "Operation completed successfully"),
    CREATED(201, "CREATED", "Resource created successfully"),
    ACCEPTED(202, "ACCEPTED", "Request accepted for processing"),
    NO_CONTENT(204, "NO_CONTENT", "Operation completed with no content to return"),
    
    // Client Error Status Codes (4xx)
    BAD_REQUEST(400, "BAD_REQUEST", "Invalid request parameters"),
    UNAUTHORIZED(401, "UNAUTHORIZED", "Authentication required"),
    FORBIDDEN(403, "FORBIDDEN", "Access denied"),
    NOT_FOUND(404, "NOT_FOUND", "Resource not found"),
    METHOD_NOT_ALLOWED(405, "METHOD_NOT_ALLOWED", "HTTP method not allowed"),
    CONFLICT(409, "CONFLICT", "Resource conflict"),
    UNPROCESSABLE_ENTITY(422, "UNPROCESSABLE_ENTITY", "Validation failed"),
    TOO_MANY_REQUESTS(429, "TOO_MANY_REQUESTS", "Rate limit exceeded"),
    
    // Server Error Status Codes (5xx)
    INTERNAL_SERVER_ERROR(500, "INTERNAL_SERVER_ERROR", "Internal server error"),
    NOT_IMPLEMENTED(501, "NOT_IMPLEMENTED", "Functionality not implemented"),
    BAD_GATEWAY(502, "BAD_GATEWAY", "Bad gateway"),
    SERVICE_UNAVAILABLE(503, "SERVICE_UNAVAILABLE", "Service temporarily unavailable"),
    GATEWAY_TIMEOUT(504, "GATEWAY_TIMEOUT", "Gateway timeout"),
    
    // Business Logic Status Codes (Custom)
    USER_NOT_FOUND(1001, "USER_NOT_FOUND", "User not found"),
    USER_ALREADY_EXISTS(1002, "USER_ALREADY_EXISTS", "User already exists"),
    INVALID_CREDENTIALS(1003, "INVALID_CREDENTIALS", "Invalid email or password"),
    ACCOUNT_NOT_VERIFIED(1004, "ACCOUNT_NOT_VERIFIED", "Account email not verified"),
    ACCOUNT_DISABLED(1005, "ACCOUNT_DISABLED", "Account is disabled"),
    ACCOUNT_LOCKED(1006, "ACCOUNT_LOCKED", "Account is locked"),
    
    // OTP Related Status Codes
    OTP_INVALID(2001, "OTP_INVALID", "Invalid OTP code"),
    OTP_EXPIRED(2002, "OTP_EXPIRED", "OTP code has expired"),
    OTP_ALREADY_VERIFIED(2003, "OTP_ALREADY_VERIFIED", "OTP already verified"),
    OTP_MAX_ATTEMPTS_EXCEEDED(2004, "OTP_MAX_ATTEMPTS_EXCEEDED", "Maximum OTP attempts exceeded"),
    OTP_GENERATION_FAILED(2005, "OTP_GENERATION_FAILED", "Failed to generate OTP"),
    
    // JWT Related Status Codes
    JWT_INVALID(3001, "JWT_INVALID", "Invalid JWT token"),
    JWT_EXPIRED(3002, "JWT_EXPIRED", "JWT token has expired"),
    JWT_MALFORMED(3003, "JWT_MALFORMED", "Malformed JWT token"),
    JWT_SIGNATURE_INVALID(3004, "JWT_SIGNATURE_INVALID", "Invalid JWT signature"),
    
    // File Upload Status Codes
    FILE_TOO_LARGE(4001, "FILE_TOO_LARGE", "File size exceeds maximum limit"),
    FILE_TYPE_NOT_SUPPORTED(4002, "FILE_TYPE_NOT_SUPPORTED", "File type not supported"),
    FILE_UPLOAD_FAILED(4003, "FILE_UPLOAD_FAILED", "File upload failed"),
    FILE_NOT_FOUND(4004, "FILE_NOT_FOUND", "File not found"),
    
    // Email Related Status Codes
    EMAIL_SEND_FAILED(5001, "EMAIL_SEND_FAILED", "Failed to send email"),
    EMAIL_INVALID_FORMAT(5002, "EMAIL_INVALID_FORMAT", "Invalid email format"),
    EMAIL_ALREADY_EXISTS(5003, "EMAIL_ALREADY_EXISTS", "Email already registered"),
    
    // Blood Donation Specific Status Codes
    BLOOD_TYPE_INVALID(6001, "BLOOD_TYPE_INVALID", "Invalid blood type"),
    DONATION_NOT_ELIGIBLE(6002, "DONATION_NOT_ELIGIBLE", "Not eligible for blood donation"),
    DONATION_ALREADY_EXISTS(6003, "DONATION_ALREADY_EXISTS", "Donation record already exists"),
    DONATION_NOT_FOUND(6004, "DONATION_NOT_FOUND", "Donation record not found"),
    
    // Database Related Status Codes
    DATABASE_ERROR(7001, "DATABASE_ERROR", "Database operation failed"),
    DATABASE_CONNECTION_FAILED(7002, "DATABASE_CONNECTION_FAILED", "Database connection failed"),
    DATA_INTEGRITY_VIOLATION(7003, "DATA_INTEGRITY_VIOLATION", "Data integrity constraint violation"),
    
    // Validation Status Codes
    VALIDATION_FAILED(8001, "VALIDATION_FAILED", "Input validation failed"),
    REQUIRED_FIELD_MISSING(8002, "REQUIRED_FIELD_MISSING", "Required field is missing"),
    INVALID_FORMAT(8003, "INVALID_FORMAT", "Invalid data format"),
    VALUE_OUT_OF_RANGE(8004, "VALUE_OUT_OF_RANGE", "Value is out of acceptable range");
    
    private final int code;
    private final String status;
    private final String message;
    
    ApiStatus(int code, String status, String message) {
        this.code = code;
        this.status = status;
        this.message = message;
    }
    
    public int getCode() {
        return code;
    }
    
    public String getStatus() {
        return status;
    }
    
    public String getMessage() {
        return message;
    }
    
    public boolean isSuccess() {
        return code >= 200 && code < 300;
    }
    
    public boolean isClientError() {
        return code >= 400 && code < 500;
    }
    
    public boolean isServerError() {
        return code >= 500 && code < 600;
    }
    
    public boolean isCustomStatus() {
        return code >= 1000;
    }
    
    @Override
    public String toString() {
        return String.format("%d %s: %s", code, status, message);
    }
}