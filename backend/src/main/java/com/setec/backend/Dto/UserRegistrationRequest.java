package com.setec.backend.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRegistrationRequest {
    
    @NotBlank(message = "Full name is required")
    @Size(min = 2, max = 100, message = "Full name must be between 2 and 100 characters")
    @JsonProperty("full_name")
    private String fullName;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    @JsonProperty("email")
    private String email;
    
    @NotBlank(message = "Phone number is required")
    @JsonProperty("phone")
    private String phone;
    
    @NotBlank(message = "Password is required")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    @JsonProperty("password")
    private String password;
    
    @NotBlank(message = "Address is required")
    @JsonProperty("address")
    private String address;
    
    @NotNull(message = "Date of birth is required")
    @Past(message = "Date of birth must be in the past")
    @JsonProperty("date_of_birth")
    private Date dateOfBirth;
    
    @JsonProperty("blood_type")
    private String bloodType;
}