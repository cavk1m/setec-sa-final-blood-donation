package com.setec.backend.Exception;

import com.setec.backend.Enum.ApiStatus;

/**
 * Exception thrown when JWT token is invalid
 */
public class JwtInvalidException extends BloodDonationException {
    
    public JwtInvalidException() {
        super(ApiStatus.JWT_INVALID);
    }
    
    public JwtInvalidException(String customMessage) {
        super(ApiStatus.JWT_INVALID, customMessage);
    }
    
    public JwtInvalidException(String customMessage, Object data) {
        super(ApiStatus.JWT_INVALID, customMessage, data);
    }
    
    public JwtInvalidException(String customMessage, Throwable cause) {
        super(ApiStatus.JWT_INVALID, customMessage, cause);
    }
}