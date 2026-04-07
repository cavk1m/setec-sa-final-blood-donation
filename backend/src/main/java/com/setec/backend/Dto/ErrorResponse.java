package com.setec.backend.Dto;

import com.setec.backend.Enum.ApiStatus;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.LocalDateTime;
import java.util.Map;

/**
 * Standardized Error Response for exception handling
 * Used specifically for error cases with additional error details
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponse {
    
    private boolean success = false;
    private Integer code;
    private String status;
    private String message;
    private String path;
    private String method;
    private Map<String, String> validationErrors;
    private Object details;
    private LocalDateTime timestamp;
    
    // Constructors
    public ErrorResponse() {
        this.timestamp = LocalDateTime.now();
    }
    
    public ErrorResponse(String message) {
        this();
        this.message = message;
    }
    
    public ErrorResponse(ApiStatus apiStatus) {
        this();
        this.code = apiStatus.getCode();
        this.status = apiStatus.getStatus();
        this.message = apiStatus.getMessage();
    }
    
    public ErrorResponse(ApiStatus apiStatus, String customMessage) {
        this(apiStatus);
        this.message = customMessage;
    }
    
    public ErrorResponse(int code, String status, String message) {
        this();
        this.code = code;
        this.status = status;
        this.message = message;
    }
    
    // Static factory methods
    public static ErrorResponse of(ApiStatus apiStatus) {
        return new ErrorResponse(apiStatus);
    }
    
    public static ErrorResponse of(ApiStatus apiStatus, String customMessage) {
        return new ErrorResponse(apiStatus, customMessage);
    }
    
    public static ErrorResponse of(String message) {
        return new ErrorResponse(message);
    }
    
    public static ErrorResponse validation(Map<String, String> validationErrors) {
        ErrorResponse response = new ErrorResponse("Validation failed");
        response.setValidationErrors(validationErrors);
        return response;
    }
    
    public static ErrorResponse validation(String message, Map<String, String> validationErrors) {
        ErrorResponse response = new ErrorResponse(message);
        response.setValidationErrors(validationErrors);
        return response;
    }
    
    // Builder-style methods for chaining
    public ErrorResponse withPath(String path) {
        this.path = path;
        return this;
    }
    
    public ErrorResponse withMethod(String method) {
        this.method = method;
        return this;
    }
    
    public ErrorResponse withDetails(Object details) {
        this.details = details;
        return this;
    }
    
    public ErrorResponse withValidationErrors(Map<String, String> validationErrors) {
        this.validationErrors = validationErrors;
        return this;
    }
    
    // Getters and Setters
    public boolean isSuccess() {
        return success;
    }
    
    public void setSuccess(boolean success) {
        this.success = success;
    }
    
    public Integer getCode() {
        return code;
    }
    
    public void setCode(Integer code) {
        this.code = code;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public String getPath() {
        return path;
    }
    
    public void setPath(String path) {
        this.path = path;
    }
    
    public String getMethod() {
        return method;
    }
    
    public void setMethod(String method) {
        this.method = method;
    }
    
    public Map<String, String> getValidationErrors() {
        return validationErrors;
    }
    
    public void setValidationErrors(Map<String, String> validationErrors) {
        this.validationErrors = validationErrors;
    }
    
    public Object getDetails() {
        return details;
    }
    
    public void setDetails(Object details) {
        this.details = details;
    }
    
    public LocalDateTime getTimestamp() {
        return timestamp;
    }
    
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}