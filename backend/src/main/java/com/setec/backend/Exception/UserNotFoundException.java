package com.setec.backend.Exception;

import com.setec.backend.Enum.ApiStatus;

/**
 * Exception thrown when user is not found
 */
public class UserNotFoundException extends BloodDonationException {
    
    public UserNotFoundException() {
        super(ApiStatus.USER_NOT_FOUND);
    }
    
    public UserNotFoundException(String message) {
        super(ApiStatus.USER_NOT_FOUND, message);
    }
    
    public UserNotFoundException(String message, Object data) {
        super(ApiStatus.USER_NOT_FOUND, message, data);
    }
}