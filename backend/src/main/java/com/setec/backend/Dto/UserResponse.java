package com.setec.backend.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {
    @JsonProperty("id")
    private UUID id;

    @JsonProperty("full_name")
    private String fullName;

    @JsonProperty("email")
    private String email;

    @JsonProperty("phone")
    private String phone;
    
    @JsonProperty("address")
    private String address;
    
    @JsonProperty("date_of_birth")
    private Date dateOfBirth;

    @JsonProperty("blood_type")
    private String bloodType;

    @JsonProperty("role")
    private String role;
    
    @JsonProperty("is_active")
    private Boolean isActive;
    
    @JsonProperty("last_login_date")
    private LocalDateTime lastLoginDate;

    @JsonProperty("created_date")
    private LocalDateTime createdDate;

    @JsonProperty("updated_date")
    private LocalDateTime updatedDate;
    
    @JsonProperty("profile_picture_url")
    private String profilePictureUrl;
}
