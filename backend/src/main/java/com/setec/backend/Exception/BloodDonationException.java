package com.setec.backend.Exception;

import com.setec.backend.Enum.ApiStatus;

/**
 * Base Exception class for Blood Donation System
 * All custom exceptions should extend this class
 */
public class BloodDonationException extends RuntimeException {
    
    private final ApiStatus status;
    private final Object data;
    
    public BloodDonationException(ApiStatus status) {
        super(status.getMessage());
        this.status = status;
        this.data = null;
    }
    
    public BloodDonationException(ApiStatus status, String customMessage) {
        super(customMessage);
        this.status = status;
        this.data = null;
    }
    
    public BloodDonationException(ApiStatus status, String customMessage, Object data) {
        super(customMessage);
        this.status = status;
        this.data = data;
    }
    
    public BloodDonationException(ApiStatus status, String customMessage, Throwable cause) {
        super(customMessage, cause);
        this.status = status;
        this.data = null;
    }
    
    public BloodDonationException(ApiStatus status, String customMessage, Throwable cause, Object data) {
        super(customMessage, cause);
        this.status = status;
        this.data = data;
    }
    
    public ApiStatus getStatus() {
        return status;
    }
    
    public Object getData() {
        return data;
    }
    
    public int getStatusCode() {
        return status.getCode();
    }
    
    public String getStatusName() {
        return status.getStatus();
    }
}