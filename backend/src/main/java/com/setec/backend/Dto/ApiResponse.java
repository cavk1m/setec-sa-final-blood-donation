package com.setec.backend.Dto;

import com.setec.backend.Enum.ApiStatus;
import com.setec.backend.Enum.ResponseStatus;
import com.fasterxml.jackson.annotation.JsonInclude;

import java.time.LocalDateTime;

/**
 * Standardized API Response wrapper for all endpoints
 * Provides consistent response structure across the application
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ApiResponse<T> {
    
    private boolean success;
    private ResponseStatus status;
    private Integer code;
    private String statusName;
    private String message;
    private T data;
    private LocalDateTime timestamp;
    
    // Constructors
    public ApiResponse() {
        this.timestamp = LocalDateTime.now();
    }
    
    public ApiResponse(boolean success, ResponseStatus status, String message) {
        this();
        this.success = success;
        this.status = status;
        this.message = message;
    }
    
    public ApiResponse(boolean success, ResponseStatus status, String message, T data) {
        this(success, status, message);
        this.data = data;
    }
    
    public ApiResponse(ApiStatus apiStatus) {
        this();
        this.success = apiStatus.getCode() >= 200 && apiStatus.getCode() < 300;
        this.status = this.success ? ResponseStatus.SUCCESS : ResponseStatus.ERROR;
        this.code = apiStatus.getCode();
        this.statusName = apiStatus.getStatus();
        this.message = apiStatus.getMessage();
    }
    
    public ApiResponse(ApiStatus apiStatus, T data) {
        this(apiStatus);
        this.data = data;
    }
    
    public ApiResponse(ApiStatus apiStatus, String customMessage) {
        this(apiStatus);
        this.message = customMessage;
    }
    
    public ApiResponse(ApiStatus apiStatus, String customMessage, T data) {
        this(apiStatus, customMessage);
        this.data = data;
    }
    
    // Static factory methods for success responses
    public static <T> ApiResponse<T> success() {
        return new ApiResponse<>(true, ResponseStatus.SUCCESS, "Operation completed successfully");
    }
    
    public static <T> ApiResponse<T> success(String message) {
        return new ApiResponse<>(true, ResponseStatus.SUCCESS, message);
    }
    
    public static <T> ApiResponse<T> success(String message, T data) {
        return new ApiResponse<>(true, ResponseStatus.SUCCESS, message, data);
    }
    
    public static <T> ApiResponse<T> success(T data) {
        return new ApiResponse<>(true, ResponseStatus.SUCCESS, "Operation completed successfully", data);
    }
    
    // Static factory methods for error responses
    public static <T> ApiResponse<T> error(String message) {
        return new ApiResponse<>(false, ResponseStatus.ERROR, message);
    }
    
    public static <T> ApiResponse<T> error(String message, T data) {
        return new ApiResponse<>(false, ResponseStatus.ERROR, message, data);
    }
    
    public static <T> ApiResponse<T> error(ApiStatus apiStatus) {
        return new ApiResponse<>(apiStatus);
    }
    
    public static <T> ApiResponse<T> error(ApiStatus apiStatus, String customMessage) {
        return new ApiResponse<>(apiStatus, customMessage);
    }
    
    public static <T> ApiResponse<T> error(ApiStatus apiStatus, T data) {
        return new ApiResponse<>(apiStatus, data);
    }
    
    // Static factory methods for other status types
    public static <T> ApiResponse<T> warning(String message) {
        return new ApiResponse<>(false, ResponseStatus.WARNING, message);
    }
    
    public static <T> ApiResponse<T> info(String message) {
        return new ApiResponse<>(true, ResponseStatus.INFO, message);
    }
    
    public static <T> ApiResponse<T> pending(String message) {
        return new ApiResponse<>(false, ResponseStatus.PENDING, message);
    }
    
    // Getters and Setters
    public boolean isSuccess() {
        return success;
    }
    
    public void setSuccess(boolean success) {
        this.success = success;
    }
    
    public ResponseStatus getStatus() {
        return status;
    }
    
    public void setStatus(ResponseStatus status) {
        this.status = status;
    }
    
    public Integer getCode() {
        return code;
    }
    
    public void setCode(Integer code) {
        this.code = code;
    }
    
    public String getStatusName() {
        return statusName;
    }
    
    public void setStatusName(String statusName) {
        this.statusName = statusName;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public T getData() {
        return data;
    }
    
    public void setData(T data) {
        this.data = data;
    }
    
    public LocalDateTime getTimestamp() {
        return timestamp;
    }
    
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}