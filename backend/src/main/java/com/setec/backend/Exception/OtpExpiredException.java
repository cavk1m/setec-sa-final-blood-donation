package com.setec.backend.Exception;

import com.setec.backend.Enum.ApiStatus;

/**
 * Exception thrown when OTP has expired
 */
public class OtpExpiredException extends BloodDonationException {
    
    public OtpExpiredException() {
        super(ApiStatus.OTP_EXPIRED);
    }
    
    public OtpExpiredException(String customMessage) {
        super(ApiStatus.OTP_EXPIRED, customMessage);
    }
    
    public OtpExpiredException(String customMessage, Object data) {
        super(ApiStatus.OTP_EXPIRED, customMessage, data);
    }
}