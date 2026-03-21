package com.setec.backend.Exception;

import com.setec.backend.Enum.ApiStatus;

/**
 * Exception thrown when credentials are invalid
 */
public class InvalidCredentialsException extends BloodDonationException {
    
    public InvalidCredentialsException() {
        super(ApiStatus.INVALID_CREDENTIALS);
    }
    
    public InvalidCredentialsException(String customMessage) {
        super(ApiStatus.INVALID_CREDENTIALS, customMessage);
    }
    
    public InvalidCredentialsException(String customMessage, Object data) {
        super(ApiStatus.INVALID_CREDENTIALS, customMessage, data);
    }
}