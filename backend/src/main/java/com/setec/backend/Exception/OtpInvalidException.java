package com.setec.backend.Exception;

import com.setec.backend.Enum.ApiStatus;

/**
 * Exception thrown when OTP is invalid
 */
public class OtpInvalidException extends BloodDonationException {
    
    public OtpInvalidException() {
        super(ApiStatus.OTP_INVALID);
    }
    
    public OtpInvalidException(String customMessage) {
        super(ApiStatus.OTP_INVALID, customMessage);
    }
    
    public OtpInvalidException(String customMessage, Object data) {
        super(ApiStatus.OTP_INVALID, customMessage, data);
    }
}