package com.setec.backend.Exception;

import com.setec.backend.Enum.ApiStatus;

/**
 * Exception thrown when JWT token has expired
 */
public class JwtExpiredException extends BloodDonationException {
    
    public JwtExpiredException() {
        super(ApiStatus.JWT_EXPIRED);
    }
    
    public JwtExpiredException(String customMessage) {
        super(ApiStatus.JWT_EXPIRED, customMessage);
    }
    
    public JwtExpiredException(String customMessage, Object data) {
        super(ApiStatus.JWT_EXPIRED, customMessage, data);
    }
    
    public JwtExpiredException(String customMessage, Throwable cause) {
        super(ApiStatus.JWT_EXPIRED, customMessage, cause);
    }
}