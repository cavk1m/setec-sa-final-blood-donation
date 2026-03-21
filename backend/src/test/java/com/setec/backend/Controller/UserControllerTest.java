package com.setec.backend.Controller;

import com.setec.backend.Dto.*;
import com.setec.backend.Enum.BloodType;
import com.setec.backend.Enum.Role;
import com.setec.backend.Model.users;
import com.setec.backend.Service.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UserController.class)
class UserControllerTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @MockBean
    private UserService userService;
    
    @MockBean
    private OtpService otpService;
    
    @MockBean
    private EmailService emailService;
    
    @MockBean
    private JwtService jwtService;
    
    @MockBean
    private FileUploadService fileUploadService;
    
    @MockBean
    private PasswordEncoder passwordEncoder;
    
    @MockBean
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    private users testUser;
    private UserRegistrationRequest registrationRequest;
    private LoginRequest loginRequest;
    
    @BeforeEach
    void setUp() {
        // Create test user
         testUser = new users();
         testUser.setId(UUID.randomUUID());
         testUser.setFullName("John Doe");
         testUser.setEmail("john.doe@example.com");
         testUser.setPhone("1234567890");
         testUser.setAddress("123 Main St");
         testUser.setDateOfBirth(new Date());
         testUser.setPasswordHash("hashedPassword");
         testUser.setBloodType(BloodType.A_POSITIVE);
        testUser.setRole(Role.USER);
        testUser.setIsActive(true);
        testUser.setEmailVerified(true);
        testUser.setLastLoginDate(LocalDateTime.now());
        
        // Create registration request
        registrationRequest = new UserRegistrationRequest();
        registrationRequest.setFullName("John Doe");
        registrationRequest.setEmail("john.doe@example.com");
        registrationRequest.setPhone("1234567890");
        registrationRequest.setAddress("123 Main St");
        registrationRequest.setDateOfBirth(new Date());
        registrationRequest.setPassword("password123");
        registrationRequest.setBloodType("A_POSITIVE");
        
        // Create login request
        loginRequest = new LoginRequest();
        loginRequest.setEmail("john.doe@example.com");
        loginRequest.setPassword("password123");
    }
    
    @Test
    void registerUser_Success() throws Exception {
        // Given
        when(userService.existsByEmail(registrationRequest.getEmail())).thenReturn(false);
        when(passwordEncoder.encode(registrationRequest.getPassword())).thenReturn("hashedPassword");
        when(userService.createUser(any(users.class))).thenReturn(testUser);
        doNothing().when(otpService).generateAndSendOtp(anyString(), anyString());
        
        // When & Then
        mockMvc.perform(post("/api/users/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registrationRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value(containsString("Registration successful")))
                .andExpect(jsonPath("$.user_id").exists())
                .andExpect(jsonPath("$.email").value(registrationRequest.getEmail()));
        
        verify(userService, times(1)).createUser(any(users.class));
        verify(otpService, times(1)).generateAndSendOtp(registrationRequest.getEmail(), "registration");
    }
    
    @Test
    void registerUser_EmailAlreadyExists() throws Exception {
        // Given
        when(userService.existsByEmail(registrationRequest.getEmail())).thenReturn(true);
        
        // When & Then
        mockMvc.perform(post("/api/users/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(registrationRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Email already registered"));
        
        verify(userService, never()).createUser(any(users.class));
        verify(otpService, never()).generateAndSendOtp(anyString(), anyString());
    }
    
    @Test
    void verifyOtp_Success() throws Exception {
        // Given
        OtpVerificationRequest otpRequest = new OtpVerificationRequest();
        otpRequest.setEmail("john.doe@example.com");
        otpRequest.setOtpCode("123456");
        
        when(otpService.verifyOtp(otpRequest.getEmail(), otpRequest.getOtpCode())).thenReturn(true);
        when(userService.getUserByEmail(otpRequest.getEmail())).thenReturn(testUser);
        when(userService.updateUser(any(UUID.class), any(users.class))).thenReturn(testUser);
        when(jwtService.generateToken(testUser)).thenReturn("jwt.token.here");
        when(jwtService.extractExpiration("jwt.token.here")).thenReturn(new Date(System.currentTimeMillis() + 86400000));
        doNothing().when(emailService).sendWelcomeEmail(anyString(), anyString());
        
        // When & Then
        mockMvc.perform(post("/api/users/verify-otp")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(otpRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.token").exists())
                .andExpect(jsonPath("$.user").exists())
                .andExpect(jsonPath("$.message").value(containsString("Email verified successfully")));
        
        verify(otpService, times(1)).verifyOtp(otpRequest.getEmail(), otpRequest.getOtpCode());
         verify(emailService, times(1)).sendWelcomeEmail(testUser.getEmail(), testUser.getFullName());
    }
    
    @Test
    void verifyOtp_InvalidOtp() throws Exception {
        // Given
        OtpVerificationRequest otpRequest = new OtpVerificationRequest();
        otpRequest.setEmail("john.doe@example.com");
        otpRequest.setOtpCode("wrong-otp");
        
        when(otpService.verifyOtp(otpRequest.getEmail(), otpRequest.getOtpCode())).thenReturn(false);
        
        // When & Then
        mockMvc.perform(post("/api/users/verify-otp")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(otpRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Invalid or expired OTP code"));
        
        verify(userService, never()).getUserByEmail(anyString());
        verify(emailService, never()).sendWelcomeEmail(anyString(), anyString());
    }
    
    @Test
    @WithMockUser
    void getUserProfile_Success() throws Exception {
        // Given
        UUID userId = testUser.getId();
        when(userService.getUserById(userId)).thenReturn(testUser);
        
        // When & Then
        mockMvc.perform(get("/api/users/profile")
                .requestAttr("currentUserId", userId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.user").exists())
                .andExpect(jsonPath("$.user.email").value(testUser.getEmail()));
        
        verify(userService, times(1)).getUserById(userId);
    }
    
    @Test
    @WithMockUser
    void updateProfile_Success() throws Exception {
        // Given
        UUID userId = testUser.getId();
        UserRequest updateRequest = new UserRequest();
        updateRequest.setFullName("John Updated");
        updateRequest.setPhone("0987654321");
        updateRequest.setBloodType("B_POSITIVE");
        
        when(userService.getUserById(userId)).thenReturn(testUser);
        when(userService.updateUser(eq(userId), any(users.class))).thenReturn(testUser);
        
        // When & Then
        mockMvc.perform(put("/api/users/profile")
                .requestAttr("currentUserId", userId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updateRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Profile updated successfully"))
                .andExpect(jsonPath("$.user").exists());
        
        verify(userService, times(1)).getUserById(userId);
        verify(userService, times(1)).updateUser(eq(userId), any(users.class));
    }
    
    @Test
    @WithMockUser
    void changePassword_Success() throws Exception {
        // Given
        UUID userId = testUser.getId();
        ChangePasswordRequest changeRequest = new ChangePasswordRequest();
        changeRequest.setCurrentPassword("currentPassword");
        changeRequest.setNewPassword("newPassword123");
        
        when(userService.getUserById(userId)).thenReturn(testUser);
         when(passwordEncoder.matches(changeRequest.getCurrentPassword(), testUser.getPasswordHash())).thenReturn(true);
        when(passwordEncoder.encode(changeRequest.getNewPassword())).thenReturn("newHashedPassword");
        when(userService.updateUser(eq(userId), any(users.class))).thenReturn(testUser);
        doNothing().when(emailService).sendPasswordChangeNotification(anyString(), anyString());
        
        // When & Then
        mockMvc.perform(post("/api/users/change-password")
                .requestAttr("currentUserId", userId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(changeRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Password changed successfully"));
        
         verify(passwordEncoder, times(1)).matches(changeRequest.getCurrentPassword(), testUser.getPasswordHash());
        verify(userService, times(1)).updateUser(eq(userId), any(users.class));
         verify(emailService, times(1)).sendPasswordChangeNotification(testUser.getEmail(), testUser.getFullName());
    }
    
    @Test
    @WithMockUser
    void changePassword_IncorrectCurrentPassword() throws Exception {
        // Given
        UUID userId = testUser.getId();
        ChangePasswordRequest changeRequest = new ChangePasswordRequest();
        changeRequest.setCurrentPassword("wrongPassword");
        changeRequest.setNewPassword("newPassword123");
        
        when(userService.getUserById(userId)).thenReturn(testUser);
         when(passwordEncoder.matches(changeRequest.getCurrentPassword(), testUser.getPasswordHash())).thenReturn(false);
        
        // When & Then
        mockMvc.perform(post("/api/users/change-password")
                .requestAttr("currentUserId", userId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(changeRequest)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("Current password is incorrect"));
        
        verify(userService, never()).updateUser(any(UUID.class), any(users.class));
        verify(emailService, never()).sendPasswordChangeNotification(anyString(), anyString());
    }
    
    @Test
    @WithMockUser
    void deactivateAccount_Success() throws Exception {
        // Given
        UUID userId = testUser.getId();
        when(userService.getUserById(userId)).thenReturn(testUser);
        when(userService.updateUser(eq(userId), any(users.class))).thenReturn(testUser);
        when(fileUploadService.deleteProfilePicture(anyString())).thenReturn(true);
        
        // When & Then
        mockMvc.perform(delete("/api/users/account")
                .requestAttr("currentUserId", userId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("Account deactivated successfully"));
        
        verify(userService, times(1)).getUserById(userId);
        verify(userService, times(1)).updateUser(eq(userId), any(users.class));
    }
}