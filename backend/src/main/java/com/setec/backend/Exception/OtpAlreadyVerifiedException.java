package com.setec.backend.Exception;

import com.setec.backend.Enum.ApiStatus;

/**
 * Exception thrown when trying to verify an already verified OTP
 */
public class OtpAlreadyVerifiedException extends BloodDonationException {
    
    public OtpAlreadyVerifiedException() {
        super(ApiStatus.OTP_ALREADY_VERIFIED);
    }
    
    public OtpAlreadyVerifiedException(String customMessage) {
        super(ApiStatus.OTP_ALREADY_VERIFIED, customMessage);
    }
    
    public OtpAlreadyVerifiedException(String customMessage, Object data) {
        super(ApiStatus.OTP_ALREADY_VERIFIED, customMessage, data);
    }
}