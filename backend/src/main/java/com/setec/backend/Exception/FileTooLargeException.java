package com.setec.backend.Exception;

import com.setec.backend.Enum.ApiStatus;

/**
 * Exception thrown when uploaded file is too large
 */
public class FileTooLargeException extends BloodDonationException {
    
    public FileTooLargeException() {
        super(ApiStatus.FILE_TOO_LARGE);
    }
    
    public FileTooLargeException(String customMessage) {
        super(ApiStatus.FILE_TOO_LARGE, customMessage);
    }
    
    public FileTooLargeException(String customMessage, Object data) {
        super(ApiStatus.FILE_TOO_LARGE, customMessage, data);
    }
}