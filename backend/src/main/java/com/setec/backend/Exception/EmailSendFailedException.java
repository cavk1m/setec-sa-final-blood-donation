package com.setec.backend.Exception;

import com.setec.backend.Enum.ApiStatus;

/**
 * Exception thrown when email sending fails
 */
public class EmailSendFailedException extends BloodDonationException {
    
    public EmailSendFailedException() {
        super(ApiStatus.EMAIL_SEND_FAILED);
    }
    
    public EmailSendFailedException(String customMessage) {
        super(ApiStatus.EMAIL_SEND_FAILED, customMessage);
    }
    
    public EmailSendFailedException(String customMessage, Object data) {
        super(ApiStatus.EMAIL_SEND_FAILED, customMessage, data);
    }
    
    public EmailSendFailedException(String customMessage, Throwable cause) {
        super(ApiStatus.EMAIL_SEND_FAILED, customMessage, cause);
    }
}