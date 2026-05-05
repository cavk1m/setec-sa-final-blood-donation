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
    private UUID id;
    private String firstName;
    private String lastName;
    private String email;
    private Boolean emailVerified;
    private String phone;
    private Boolean phoneVerified;
    private String avatarUrl;
    private Date dateOfBirth;
    private String address;
    private String role;
    private Boolean isActive;
    private LocalDateTime lastLoginAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @JsonProperty("id")
    public UUID getId() { return id; }

    @JsonProperty("first_name")
    public String getFirstName() { return firstName; }

    @JsonProperty("last_name")
    public String getLastName() { return lastName; }

    @JsonProperty("email")
    public String getEmail() { return email; }

    @JsonProperty("email_verified")
    public Boolean getEmailVerified() { return emailVerified; }

    @JsonProperty("phone")
    public String getPhone() { return phone; }

    @JsonProperty("phone_verified")
    public Boolean getPhoneVerified() { return phoneVerified; }

    @JsonProperty("avatar_url")
    public String getAvatarUrl() { return avatarUrl; }

    @JsonProperty("date_of_birth")
    public Date getDateOfBirth() { return dateOfBirth; }

    @JsonProperty("address")
    public String getAddress() { return address; }

    @JsonProperty("role")
    public String getRole() { return role; }

    @JsonProperty("is_active")
    public Boolean getIsActive() { return isActive; }

    @JsonProperty("last_login_at")
    public LocalDateTime getLastLoginAt() { return lastLoginAt; }

    @JsonProperty("created_at")
    public LocalDateTime getCreatedAt() { return createdAt; }

    @JsonProperty("updated_at")
    public LocalDateTime getUpdatedAt() { return updatedAt; }
}
