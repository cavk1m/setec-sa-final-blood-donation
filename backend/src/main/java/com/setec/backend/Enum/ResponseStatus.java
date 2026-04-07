package com.setec.backend.Enum;

/**
 * Response Status for API Operations
 * Used to indicate the result of API operations
 */
public enum ResponseStatus {
    
    SUCCESS("success", "Operation completed successfully"),
    ERROR("error", "Operation failed"),
    WARNING("warning", "Operation completed with warnings"),
    INFO("info", "Informational response"),
    PENDING("pending", "Operation is in progress"),
    PARTIAL_SUCCESS("partial_success", "Operation partially successful");
    
    private final String status;
    private final String description;
    
    ResponseStatus(String status, String description) {
        this.status = status;
        this.description = description;
    }
    
    public String getStatus() {
        return status;
    }
    
    public String getDescription() {
        return description;
    }
    
    @Override
    public String toString() {
        return status;
    }
}