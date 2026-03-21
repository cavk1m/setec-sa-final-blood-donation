package com.setec.backend.Controller;

import com.setec.backend.Dto.*;
import com.setec.backend.Enum.BloodType;
import com.setec.backend.Enum.Role;
import com.setec.backend.Model.users;
import com.setec.backend.Repository.UserRepository;
import com.setec.backend.Service.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Tag(name = "User Management", description = "APIs for user registration, authentication, profile management, and account operations")
public class UserController {
    
    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    
    private final UserService userService;
    private final UserRepository userRepository;
    private final OtpService otpService;
    private final EmailService emailService;
    private final JwtService jwtService;
    private final FileUploadService fileUploadService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    
    @Autowired
    public UserController(
            UserService userService,
            UserRepository userRepository,
            OtpService otpService,
            EmailService emailService,
            JwtService jwtService,
            FileUploadService fileUploadService,
            PasswordEncoder passwordEncoder,
            AuthenticationManager authenticationManager
    ) {
        this.userService = userService;
        this.userRepository = userRepository;
        this.otpService = otpService;
        this.emailService = emailService;
        this.jwtService = jwtService;
        this.fileUploadService = fileUploadService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }
    
    /**
     * User Registration - Step 1: Register and send OTP
     */
    @PostMapping("/register")
    @Operation(summary = "Register new user", description = "Register a new user account and send OTP to email")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Registration successful, OTP sent to email"),
        @ApiResponse(responseCode = "400", description = "Email or phone already registered, or validation failed"),
        @ApiResponse(responseCode = "500", description = "Server error during registration or email sending")
    })
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegistrationRequest request) {
        try {
            // Check if user already exists using safe count-based query
            if (userRepository.existsByEmailSafe(request.getEmail())) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Email already registered"
                ));
            }
            
            // Check if phone number already exists using safe count-based query
            if (userRepository.existsByPhoneSafe(request.getPhone())) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Phone number already registered"
                ));
            }
            
            // Create user but don't activate yet
            users newUser = new users();
            newUser.setFullName(request.getFullName());  // DTO camelCase -> entity underscore
            newUser.setEmail(request.getEmail());
            newUser.setPhone(request.getPhone());
            newUser.setAddress(request.getAddress());
            newUser.setDateOfBirth(request.getDateOfBirth());  // DTO camelCase -> entity underscore
            newUser.setPasswordHash(passwordEncoder.encode(request.getPassword()));  // DTO camelCase -> entity underscore
            newUser.setRole(Role.USER);
            newUser.setEmailVerified(false);
            newUser.setIsActive(false);
            
            // Set timestamps
            LocalDateTime now = LocalDateTime.now();
            newUser.setCreatedDate(now);
            newUser.setUpdatedDate(now);
            
            if (request.getBloodType() != null && !request.getBloodType().isEmpty()) {
                newUser.setBloodType(BloodType.valueOf(request.getBloodType().toUpperCase()));  // DTO camelCase -> entity underscore
            }
            
            // Save user directly using repository
            users savedUser = userRepository.save(newUser);
            
            // Generate and send OTP
            otpService.generateAndSendOtp(request.getEmail(), "registration");
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Registration successful. Please verify your email with the OTP sent to " + request.getEmail(),
                "user_id", savedUser.getId(),
                "email", request.getEmail()
            ));
            
        } catch (Exception e) {
            log.error("Registration failed for email {}: {}", request.getEmail(), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Registration failed: " + e.getMessage()
            ));
        }
    }
    
    /**
     * User Registration - Step 2: Verify OTP and activate account
     */
    @PostMapping("/verify-otp")
    @Operation(summary = "Verify OTP and activate account", description = "Verify the OTP code sent to email and activate the user account")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "OTP verified successfully, JWT token returned"),
        @ApiResponse(responseCode = "400", description = "Invalid or expired OTP"),
        @ApiResponse(responseCode = "500", description = "Server error during verification")
    })
    public ResponseEntity<?> verifyOtp(@Valid @RequestBody OtpVerificationRequest request) {
         try {
             boolean isValid = otpService.verifyOtp(request.getEmail(), request.getOtpCode());
             
             if (isValid) {
                 log.info("OTP verification successful for email: {}", request.getEmail());
                 
                 // Get user and activate account
                 users user = userRepository.findByEmailSafe(request.getEmail())
                     .orElseThrow(() -> new RuntimeException("User not found with email: " + request.getEmail()));
                 
                 // Activate user account
                 user.setIsActive(true);
                 user.setEmailVerified(true);
                 user.setUpdatedDate(LocalDateTime.now());
                 users updatedUser = userRepository.save(user);
                 
                 // Generate JWT token
                 String token = jwtService.generateToken(updatedUser);
                 
                 // Send welcome email
                 emailService.sendWelcomeEmail(user.getEmail(), user.getFullName());
                 
                 return ResponseEntity.ok(Map.of(
                     "success", true,
                     "message", "OTP verified successfully! Your account is now active.",
                     "email", request.getEmail(),
                     "token", token
                 ));
             } else {
                 return ResponseEntity.badRequest().body(Map.of(
                     "success", false,
                     "message", "Invalid or expired OTP code"
                 ));
             }
             
         } catch (Exception e) {
             log.error("OTP verification failed for email {}: {}", request.getEmail(), e.getMessage());
             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                 "success", false,
                 "message", "OTP verification failed: " + e.getMessage()
             ));
         }
     }
    
    /**
     * Resend OTP Code
     */
    @PostMapping("/resend-otp")
    public ResponseEntity<?> resendOtp(@Valid @RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            
            if (email == null || email.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Email is required"
                ));
            }
            
            // Check if user exists using safe query to avoid UUID casting issues
            users user = userRepository.findByEmailSafe(email)
                .orElse(null);
                
            if (user == null) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "No account found with this email address"
                ));
            }
            
            // Check if account is already verified
            if (user.getEmailVerified() && user.getIsActive()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Your account is already verified and active"
                ));
            }
            
            // Check rate limiting for OTP requests
            if (otpService.hasValidUnverifiedOtp(email)) {
                long remainingMinutes = otpService.getOtpRemainingTimeMinutes(email);
                return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(Map.of(
                    "success", false,
                    "message", String.format("Please wait %d more minutes before requesting a new OTP", remainingMinutes),
                    "remainingMinutes", remainingMinutes
                ));
            }
            
            // Generate and send new OTP
            otpService.generateAndSendOtp(email, "registration");
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "New OTP has been sent to your email address",
                "email", email
            ));
            
        } catch (Exception e) {
            log.error("Resend OTP failed for email {}: {}", request.get("email"), e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to resend OTP: " + e.getMessage()
            ));
        }
    }
    
    /**
     * User Login
     */
    @PostMapping("/login")
    @Operation(summary = "User login", description = "Authenticate user with email and password")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Login successful, JWT token returned"),
        @ApiResponse(responseCode = "400", description = "Invalid credentials or user not activated"),
        @ApiResponse(responseCode = "401", description = "Authentication failed"),
        @ApiResponse(responseCode = "500", description = "Server error during login")
    })
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest request) {
        try {
            // Authenticate user
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
            // Get user details directly from repository using safe query to avoid UUID casting issues
            users user = userRepository.findByEmailSafe(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found with email: " + request.getEmail()));
            
            if (!user.getIsActive()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of(
                    "success", false,
                    "message", "Account is not active. Please verify your email first."
                ));
            }
            
            // Update last login
            user.setLastLoginDate(LocalDateTime.now());
            user.setUpdatedDate(LocalDateTime.now());
            users updatedUser = userRepository.save(user);
            
            // Generate JWT token
            String token = jwtService.generateToken(updatedUser);
            
            // Create user response
            UserResponse userResponse = createUserResponse(updatedUser);
            
            return ResponseEntity.ok(new AuthResponse(
                token,
                jwtService.extractExpiration(token).getTime() - System.currentTimeMillis(),
                userResponse,
                "Login successful"
            ));
            
        } catch (Exception e) {
            log.error("Login failed for email {}: {}", request.getEmail(), e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                "success", false,
                "message", "Login failed: Invalid credentials"
            ));
        }
    }
    
    /**
     * Get user profile
     */
    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(HttpServletRequest request) {
        try {
            UUID userId = (UUID) request.getAttribute("currentUserId");
            users user = userService.getUserById(userId);
            
            UserResponse userResponse = createUserResponse(user);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "user", userResponse
            ));
            
        } catch (Exception e) {
            log.error("Failed to get user profile: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to get profile: " + e.getMessage()
            ));
        }
    }
    
    /**
     * Update user profile
     */
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@Valid @RequestBody UserRequest request, HttpServletRequest httpRequest) {
        try {
            UUID userId = (UUID) httpRequest.getAttribute("currentUserId");
            users user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
            
            // Update user details
            if (request.getFullName() != null) user.setFullName(request.getFullName());
            if (request.getPhone() != null) user.setPhone(request.getPhone());
            if (request.getBloodType() != null) user.setBloodType(BloodType.valueOf(request.getBloodType().toUpperCase()));
            
            user.setUpdatedDate(LocalDateTime.now());
            users updatedUser = userRepository.save(user);
            UserResponse userResponse = createUserResponse(updatedUser);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Profile updated successfully",
                "user", userResponse
            ));
            
        } catch (Exception e) {
            log.error("Failed to update profile: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to update profile: " + e.getMessage()
            ));
        }
    }
    
    /**
     * Upload profile picture
     */
    @PostMapping("/profile/picture")
    public ResponseEntity<?> uploadProfilePicture(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
        try {
            UUID userId = (UUID) request.getAttribute("currentUserId");
            users user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
            
            // Delete old profile picture if exists
            if (user.getProfilePicturePath() != null) {
                fileUploadService.cleanupOldProfilePicture(user.getProfilePicturePath());
            }
            
            // Upload new profile picture
            String filePath = fileUploadService.uploadProfilePicture(file, userId);
            
            // Update user profile picture path
            user.setProfilePicturePath(filePath);
            user.setUpdatedDate(LocalDateTime.now());
            users updatedUser = userRepository.save(user);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Profile picture uploaded successfully",
                "profile_picture_url", "/uploads/" + filePath
            ));
            
        } catch (Exception e) {
            log.error("Failed to upload profile picture: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to upload profile picture: " + e.getMessage()
            ));
        }
    }
    
    /**
     * Delete profile picture
     */
    @DeleteMapping("/profile/picture")
    public ResponseEntity<?> deleteProfilePicture(HttpServletRequest request) {
        try {
            UUID userId = (UUID) request.getAttribute("currentUserId");
            users user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
            
            if (user.getProfilePicturePath() != null) {
                fileUploadService.deleteProfilePicture(user.getProfilePicturePath());
                user.setProfilePicturePath(null);
                user.setUpdatedDate(LocalDateTime.now());
                userRepository.save(user);
                
                return ResponseEntity.ok(Map.of(
                    "success", true,
                    "message", "Profile picture deleted successfully"
                ));
            } else {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "No profile picture to delete"
                ));
            }
            
        } catch (Exception e) {
            log.error("Failed to delete profile picture: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to delete profile picture: " + e.getMessage()
            ));
        }
    }
    
    /**
     * Change password
     */
    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePasswordRequest request, HttpServletRequest httpRequest) {
        try {
            UUID userId = (UUID) httpRequest.getAttribute("currentUserId");
            users user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
            
            // Verify current password
            if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPasswordHash())) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Current password is incorrect"
                ));
            }
            
            // Update password
            user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
            user.setUpdatedDate(LocalDateTime.now());
            users updatedUser = userRepository.save(user);
            
            // Send password change notification
            emailService.sendPasswordChangeNotification(updatedUser.getEmail(), updatedUser.getFullName());
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Password changed successfully"
            ));
            
        } catch (Exception e) {
            log.error("Failed to change password: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to change password: " + e.getMessage()
            ));
        }
    }
    
    /**
     * Forgot password - Request OTP
     */
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            
            if (email == null || email.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Email is required"
                ));
            }
            
            // Check if user exists
            users user = userService.getUserByEmail(email);
            if (user == null) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "No account found with this email"
                ));
            }
            
            // Generate and send OTP
            otpService.generateAndSendOtp(email, "password_reset");
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Password reset OTP sent to your email"
            ));
            
        } catch (Exception e) {
            log.error("Failed to process forgot password request: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to process request: " + e.getMessage()
            ));
        }
    }
    
    /**
     * Reset password with OTP
     */
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            String otpCode = request.get("otp_code");
            String newPassword = request.get("new_password");
            
            if (email == null || otpCode == null || newPassword == null) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Email, OTP code, and new password are required"
                ));
            }
            
            // Verify OTP
            boolean isValid = otpService.verifyOtp(email, otpCode);
            if (!isValid) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Invalid or expired OTP code"
                ));
            }
            
             // Update password using safe query to avoid UUID casting issues
             users user = userRepository.findByEmailSafe(email)
                 .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
             user.setPasswordHash(passwordEncoder.encode(newPassword));
             user.setUpdatedDate(LocalDateTime.now());
             users updatedUser = userRepository.save(user);
             
             // Send password change notification
             emailService.sendPasswordChangeNotification(updatedUser.getEmail(), updatedUser.getFullName());
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Password reset successfully"
            ));
            
        } catch (Exception e) {
            log.error("Failed to reset password: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to reset password: " + e.getMessage()
            ));
        }
    }
    
    /**
     * Deactivate account
     */
    @DeleteMapping("/account")
    public ResponseEntity<?> deactivateAccount(HttpServletRequest request) {
        try {
            UUID userId = (UUID) request.getAttribute("currentUserId");
            users user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));
            
            // Deactivate account
            user.setIsActive(false);
            user.setUpdatedDate(LocalDateTime.now());
            userRepository.save(user);
            
            // Clean up profile picture
            if (user.getProfilePicturePath() != null) {
                fileUploadService.deleteProfilePicture(user.getProfilePicturePath());
            }
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Account deactivated successfully"
            ));
            
        } catch (Exception e) {
            log.error("Failed to deactivate account: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to deactivate account: " + e.getMessage()
            ));
        }
    }
    
    /**
     * Serve uploaded files
     */
    @GetMapping("/uploads/{filename:.+}")
    public ResponseEntity<Resource> serveFile(@PathVariable String filename) {
        try {
            Path file = fileUploadService.getFilePath("profiles/" + filename);
            Resource resource = new UrlResource(file.toUri());
            
            if (resource.exists() || resource.isReadable()) {
                String contentType = Files.probeContentType(file);
                if (contentType == null) {
                    contentType = "application/octet-stream";
                }
                
                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + resource.getFilename() + "\"")
                        .body(resource);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (MalformedURLException e) {
            return ResponseEntity.badRequest().build();
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Helper method to create UserResponse
     */
    private UserResponse createUserResponse(users user) {
         UserResponse response = new UserResponse();
         response.setId(user.getId());
         response.setFullName(user.getFullName());
         response.setEmail(user.getEmail());
         response.setPhone(user.getPhone());
         response.setAddress(user.getAddress());
         response.setDateOfBirth(user.getDateOfBirth());
         response.setBloodType(user.getBloodType() != null ? user.getBloodType().toString() : null);
         response.setRole(user.getRole().toString());
         response.setIsActive(user.getIsActive());
         response.setLastLoginDate(user.getLastLoginDate());
         response.setCreatedDate(user.getCreatedDate());
         response.setUpdatedDate(user.getUpdatedDate());
        
        if (user.getProfilePicturePath() != null) {
            response.setProfilePictureUrl("/uploads/" + user.getProfilePicturePath());
        }
        
        return response;
    }
}