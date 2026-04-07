package com.setec.backend.Exception;

import com.setec.backend.Enum.ApiStatus;

/**
 * Exception thrown when file type is not supported
 */
public class FileTypeNotSupportedException extends BloodDonationException {
    
    public FileTypeNotSupportedException() {
        super(ApiStatus.FILE_TYPE_NOT_SUPPORTED);
    }
    
    public FileTypeNotSupportedException(String customMessage) {
        super(ApiStatus.FILE_TYPE_NOT_SUPPORTED, customMessage);
    }
    
    public FileTypeNotSupportedException(String customMessage, Object data) {
        super(ApiStatus.FILE_TYPE_NOT_SUPPORTED, customMessage, data);
    }
}