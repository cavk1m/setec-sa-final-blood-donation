package com.setec.backend.Exception;

import com.setec.backend.Enum.ApiStatus;

/**
 * Exception thrown when user already exists
 */
public class UserAlreadyExistsException extends BloodDonationException {
    
    public UserAlreadyExistsException() {
        super(ApiStatus.USER_ALREADY_EXISTS);
    }
    
    public UserAlreadyExistsException(String email) {
        super(ApiStatus.USER_ALREADY_EXISTS, "User with email '" + email + "' already exists");
    }
}