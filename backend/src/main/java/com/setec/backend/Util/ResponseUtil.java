package com.setec.backend.Util;

import com.setec.backend.Dto.ApiResponse;
import com.setec.backend.Dto.ErrorResponse;
import com.setec.backend.Enum.ApiStatus;
import com.setec.backend.Constants.ApiConstants;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;

/**
 * Utility class for building standardized API responses
 * Provides consistent response formatting across all controllers
 */
public final class ResponseUtil {
    
    // Private constructor to prevent instantiation
    private ResponseUtil() {
        throw new UnsupportedOperationException("This is a utility class and cannot be instantiated");
    }
    
    // ============= SUCCESS RESPONSES =============
    
    /**
     * Create a successful response with data
     */
    public static <T> ResponseEntity<ApiResponse<T>> success(T data) {
        return ResponseEntity.ok(ApiResponse.success(ApiConstants.SUCCESS_MESSAGE, data));
    }
    
    /**
     * Create a successful response with custom message and data
     */
    public static <T> ResponseEntity<ApiResponse<T>> success(String message, T data) {
        return ResponseEntity.ok(ApiResponse.success(message, data));
    }
    
    /**
     * Create a successful response with message only
     */
    public static <T> ResponseEntity<ApiResponse<T>> success(String message) {
        return ResponseEntity.ok(ApiResponse.success(message));
    }
    
    /**
     * Create a successful response for creation (HTTP 201)
     */
    public static <T> ResponseEntity<ApiResponse<T>> created(T data) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Resource created successfully", data));
    }
    
    /**
     * Create a successful response for creation with custom message (HTTP 201)
     */
    public static <T> ResponseEntity<ApiResponse<T>> created(String message, T data) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(message, data));
    }
    
    // ============= ERROR RESPONSES =============
    
    /**
     * Create an error response from ApiStatus
     */
    public static ResponseEntity<ErrorResponse> error(ApiStatus apiStatus) {
        HttpStatus httpStatus = mapApiStatusToHttpStatus(apiStatus);
        ErrorResponse errorResponse = ErrorResponse.of(apiStatus);
        return ResponseEntity.status(httpStatus).body(errorResponse);
    }
    
    /**
     * Create an error response from ApiStatus with custom message
     */
    public static ResponseEntity<ErrorResponse> error(ApiStatus apiStatus, String customMessage) {
        HttpStatus httpStatus = mapApiStatusToHttpStatus(apiStatus);
        ErrorResponse errorResponse = ErrorResponse.of(apiStatus, customMessage);
        return ResponseEntity.status(httpStatus).body(errorResponse);
    }
    
    /**
     * Create an error response from ApiStatus with request context
     */
    public static ResponseEntity<ErrorResponse> error(ApiStatus apiStatus, HttpServletRequest request) {
        HttpStatus httpStatus = mapApiStatusToHttpStatus(apiStatus);
        ErrorResponse errorResponse = ErrorResponse.of(apiStatus)
                .withPath(request.getRequestURI())
                .withMethod(request.getMethod());
        return ResponseEntity.status(httpStatus).body(errorResponse);
    }
    
    /**
     * Create an error response with custom message
     */
    public static ResponseEntity<ErrorResponse> error(String message) {
        ErrorResponse errorResponse = ErrorResponse.of(message);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
    
    /**
     * Create a bad request error response
     */
    public static ResponseEntity<ErrorResponse> badRequest(String message) {
        ErrorResponse errorResponse = ErrorResponse.of(message);
        return ResponseEntity.badRequest().body(errorResponse);
    }
    
    /**
     * Create a not found error response
     */
    public static ResponseEntity<ErrorResponse> notFound(String message) {
        ErrorResponse errorResponse = ErrorResponse.of(message);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }
    
    /**
     * Create an unauthorized error response
     */
    public static ResponseEntity<ErrorResponse> unauthorized(String message) {
        ErrorResponse errorResponse = ErrorResponse.of(message);
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
    }
    
    /**
     * Create a forbidden error response
     */
    public static ResponseEntity<ErrorResponse> forbidden(String message) {
        ErrorResponse errorResponse = ErrorResponse.of(message);
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);
    }
    
    /**
     * Create a conflict error response
     */
    public static ResponseEntity<ErrorResponse> conflict(String message) {
        ErrorResponse errorResponse = ErrorResponse.of(message);
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
    }
    
    // ============= VALIDATION ERROR RESPONSES =============
    
    /**
     * Create a validation error response
     */
    public static ResponseEntity<ErrorResponse> validationError(Map<String, String> validationErrors) {
        ErrorResponse errorResponse = ErrorResponse.validation(validationErrors);
        return ResponseEntity.badRequest().body(errorResponse);
    }
    
    /**
     * Create a validation error response with custom message
     */
    public static ResponseEntity<ErrorResponse> validationError(String message, Map<String, String> validationErrors) {
        ErrorResponse errorResponse = ErrorResponse.validation(message, validationErrors);
        return ResponseEntity.badRequest().body(errorResponse);
    }
    
    // ============= UTILITY METHODS =============
    
    /**
     * Map ApiStatus to appropriate HttpStatus
     */
    public static HttpStatus mapApiStatusToHttpStatus(ApiStatus apiStatus) {
        int code = apiStatus.getCode();
        
        // Success codes (2xx)
        if (code >= 200 && code < 300) {
            return switch (code) {
                case 200 -> HttpStatus.OK;
                case 201 -> HttpStatus.CREATED;
                case 202 -> HttpStatus.ACCEPTED;
                case 204 -> HttpStatus.NO_CONTENT;
                default -> HttpStatus.OK;
            };
        }
        
        // Client error codes (4xx)
        if (code >= 400 && code < 500) {
            return switch (code) {
                case 400 -> HttpStatus.BAD_REQUEST;
                case 401 -> HttpStatus.UNAUTHORIZED;
                case 403 -> HttpStatus.FORBIDDEN;
                case 404 -> HttpStatus.NOT_FOUND;
                case 409 -> HttpStatus.CONFLICT;
                case 413 -> HttpStatus.PAYLOAD_TOO_LARGE;
                case 415 -> HttpStatus.UNSUPPORTED_MEDIA_TYPE;
                case 422 -> HttpStatus.UNPROCESSABLE_ENTITY;
                default -> HttpStatus.BAD_REQUEST;
            };
        }
        
        // Server error codes (5xx)
        if (code >= 500 && code < 600) {
            return switch (code) {
                case 500 -> HttpStatus.INTERNAL_SERVER_ERROR;
                case 502 -> HttpStatus.BAD_GATEWAY;
                case 503 -> HttpStatus.SERVICE_UNAVAILABLE;
                case 504 -> HttpStatus.GATEWAY_TIMEOUT;
                default -> HttpStatus.INTERNAL_SERVER_ERROR;
            };
        }
        
        // Business logic codes (7xxx, 8xxx) - map to appropriate HTTP status
        return switch (apiStatus) {
            case USER_NOT_FOUND -> HttpStatus.NOT_FOUND;
            case USER_ALREADY_EXISTS -> HttpStatus.CONFLICT;
            case INVALID_CREDENTIALS -> HttpStatus.UNAUTHORIZED;
            case OTP_INVALID, OTP_EXPIRED, OTP_ALREADY_VERIFIED -> HttpStatus.BAD_REQUEST;
            case JWT_INVALID, JWT_EXPIRED -> HttpStatus.UNAUTHORIZED;
            case VALIDATION_FAILED -> HttpStatus.BAD_REQUEST;
            case FILE_TOO_LARGE -> HttpStatus.PAYLOAD_TOO_LARGE;
            case FILE_TYPE_NOT_SUPPORTED -> HttpStatus.UNSUPPORTED_MEDIA_TYPE;
            case EMAIL_SEND_FAILED -> HttpStatus.SERVICE_UNAVAILABLE;
            default -> HttpStatus.INTERNAL_SERVER_ERROR;
        };
    }
    
    /**
     * Check if ApiStatus represents a success status
     */
    public static boolean isSuccessStatus(ApiStatus apiStatus) {
        int code = apiStatus.getCode();
        return code >= 200 && code < 300;
    }
    
    /**
     * Check if ApiStatus represents an error status
     */
    public static boolean isErrorStatus(ApiStatus apiStatus) {
        return !isSuccessStatus(apiStatus);
    }
}