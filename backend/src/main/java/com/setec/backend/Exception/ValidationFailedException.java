package com.setec.backend.Exception;

import com.setec.backend.Enum.ApiStatus;

/**
 * Exception thrown when validation fails
 */
public class ValidationFailedException extends BloodDonationException {
    
    public ValidationFailedException() {
        super(ApiStatus.VALIDATION_FAILED);
    }
    
    public ValidationFailedException(String customMessage) {
        super(ApiStatus.VALIDATION_FAILED, customMessage);
    }
    
    public ValidationFailedException(String customMessage, Object data) {
        super(ApiStatus.VALIDATION_FAILED, customMessage, data);
    }
}