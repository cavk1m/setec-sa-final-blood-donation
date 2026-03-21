package com.setec.backend.Exception;

import com.setec.backend.Dto.ErrorResponse;
import com.setec.backend.Enum.ApiStatus;
import com.setec.backend.Util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);
    
    /**
     * Handle all custom BloodDonationException and its subclasses
     */
    @ExceptionHandler(BloodDonationException.class)
    public ResponseEntity<ErrorResponse> handleBloodDonationException(BloodDonationException ex, HttpServletRequest request) {
        log.warn("BloodDonationException occurred: {} - Status: {}", ex.getMessage(), ex.getStatusName());
        
        ErrorResponse errorResponse = ErrorResponse.of(ex.getStatus(), ex.getMessage())
                .withPath(request.getRequestURI())
                .withMethod(request.getMethod());
        
        if (ex.getData() != null) {
            errorResponse.withDetails(ex.getData());
        }
        
        HttpStatus httpStatus = ResponseUtil.mapApiStatusToHttpStatus(ex.getStatus());
        return ResponseEntity.status(httpStatus).body(errorResponse);
    }
    
    /**
     * Handle User Not Found exceptions
     */
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleUserNotFoundException(UserNotFoundException ex, HttpServletRequest request) {
        log.warn("User not found: {}", ex.getMessage());
        return ResponseUtil.error(ex.getStatus(), request);
    }
    
    /**
     * Handle User Already Exists exceptions
     */
    @ExceptionHandler(UserAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleUserAlreadyExistsException(UserAlreadyExistsException ex, HttpServletRequest request) {
        log.warn("User already exists: {}", ex.getMessage());
        return ResponseUtil.error(ex.getStatus(), request);
    }
    
    /**
     * Handle OTP-related exceptions
     */
    @ExceptionHandler({OtpInvalidException.class, OtpExpiredException.class, OtpAlreadyVerifiedException.class})
    public ResponseEntity<ErrorResponse> handleOtpExceptions(BloodDonationException ex, HttpServletRequest request) {
        log.warn("OTP exception occurred: {} - Status: {}", ex.getMessage(), ex.getStatusName());
        return ResponseUtil.error(ex.getStatus(), request);
    }
    
    /**
     * Handle JWT-related exceptions
     */
    @ExceptionHandler({JwtInvalidException.class, JwtExpiredException.class})
    public ResponseEntity<ErrorResponse> handleJwtExceptions(BloodDonationException ex, HttpServletRequest request) {
        log.warn("JWT exception occurred: {} - Status: {}", ex.getMessage(), ex.getStatusName());
        return ResponseUtil.error(ex.getStatus(), request);
    }
    
    /**
     * Handle validation exceptions
     */
    @ExceptionHandler(ValidationFailedException.class)
    public ResponseEntity<ErrorResponse> handleValidationFailedException(ValidationFailedException ex, HttpServletRequest request) {
        log.warn("Validation failed: {}", ex.getMessage());
        return ResponseUtil.error(ex.getStatus(), request);
    }
    
    /**
     * Handle credentials exceptions
     */
    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleInvalidCredentialsException(InvalidCredentialsException ex, HttpServletRequest request) {
        log.warn("Invalid credentials: {}", ex.getMessage());
        return ResponseUtil.error(ex.getStatus(), request);
    }
    
    /**
     * Handle file-related exceptions
     */
    @ExceptionHandler({FileTooLargeException.class, FileTypeNotSupportedException.class})
    public ResponseEntity<ErrorResponse> handleFileExceptions(BloodDonationException ex, HttpServletRequest request) {
        log.warn("File exception occurred: {} - Status: {}", ex.getMessage(), ex.getStatusName());
        return ResponseUtil.error(ex.getStatus(), request);
    }
    
    /**
     * Handle email exceptions
     */
    @ExceptionHandler(EmailSendFailedException.class)
    public ResponseEntity<ErrorResponse> handleEmailSendFailedException(EmailSendFailedException ex, HttpServletRequest request) {
        log.error("Email send failed: {}", ex.getMessage(), ex);
        return ResponseUtil.error(ex.getStatus(), request);
    }
    
    /**
     * Handle validation errors from @Valid annotations
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(MethodArgumentNotValidException ex, HttpServletRequest request) {
        Map<String, String> errors = new HashMap<>();
        
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        
        log.warn("Validation failed for request {}: {}", request.getRequestURI(), errors);
        
        ErrorResponse errorResponse = ErrorResponse.validation("Validation failed", errors)
                .withPath(request.getRequestURI())
                .withMethod(request.getMethod());
        
        return ResponseEntity.badRequest().body(errorResponse);
    }
    
    /**
     * Handle bind exceptions
     */
    @ExceptionHandler(BindException.class)
    public ResponseEntity<ErrorResponse> handleBindException(BindException ex, HttpServletRequest request) {
        Map<String, String> errors = new HashMap<>();
        
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        
        log.warn("Binding failed for request {}: {}", request.getRequestURI(), errors);
        
        ErrorResponse errorResponse = ErrorResponse.validation("Binding failed", errors)
                .withPath(request.getRequestURI())
                .withMethod(request.getMethod());
        
        return ResponseEntity.badRequest().body(errorResponse);
    }
    
    /**
     * Handle authentication exceptions from Spring Security
     */
    @ExceptionHandler({AuthenticationException.class, BadCredentialsException.class})
    public ResponseEntity<ErrorResponse> handleAuthenticationException(AuthenticationException ex, HttpServletRequest request) {
        log.warn("Authentication failed for request {}: {}", request.getRequestURI(), ex.getMessage());
        
        ErrorResponse errorResponse = ErrorResponse.of(ApiStatus.INVALID_CREDENTIALS)
                .withPath(request.getRequestURI())
                .withMethod(request.getMethod());
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
    }
    
    /**
     * Handle file upload size exceeded exceptions
     */
    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ErrorResponse> handleMaxUploadSizeExceeded(MaxUploadSizeExceededException ex, HttpServletRequest request) {
        log.warn("File upload size exceeded for request {}: {}", request.getRequestURI(), ex.getMessage());
        
        ErrorResponse errorResponse = ErrorResponse.of(ApiStatus.FILE_TOO_LARGE)
                .withPath(request.getRequestURI())
                .withMethod(request.getMethod());
        
        return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE).body(errorResponse);
    }
    
    /**
     * Handle illegal argument exceptions
     */
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(IllegalArgumentException ex, HttpServletRequest request) {
        log.warn("Illegal argument for request {}: {}", request.getRequestURI(), ex.getMessage());
        
        ErrorResponse errorResponse = ErrorResponse.of("Invalid argument: " + ex.getMessage())
                .withPath(request.getRequestURI())
                .withMethod(request.getMethod());
        
        return ResponseEntity.badRequest().body(errorResponse);
    }
    
    /**
     * Handle runtime exceptions
     */
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<ErrorResponse> handleRuntimeException(RuntimeException ex, HttpServletRequest request) {
        log.error("Runtime exception for request {}: {}", request.getRequestURI(), ex.getMessage(), ex);
        
        ErrorResponse errorResponse = ErrorResponse.of("An error occurred: " + ex.getMessage())
                .withPath(request.getRequestURI())
                .withMethod(request.getMethod());
        
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
    
    /**
     * Handle generic exceptions (fallback)
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception ex, HttpServletRequest request) {
        log.error("Unexpected exception for request {}: {}", request.getRequestURI(), ex.getMessage(), ex);
        
        ErrorResponse errorResponse = ErrorResponse.of("An unexpected error occurred")
                .withPath(request.getRequestURI())
                .withMethod(request.getMethod())
                .withDetails(ex.getClass().getSimpleName());
        
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
}