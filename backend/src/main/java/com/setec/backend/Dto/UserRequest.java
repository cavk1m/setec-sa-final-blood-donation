package com.setec.backend.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
    private String fullName;
    private String email;
    private String phone;
    private String password;
    private String bloodType;
    private String role;

    @JsonProperty("full_name")
    public String getFullName() { return fullName; }

    @JsonProperty("email")
    public String getEmail() { return email; }

    @JsonProperty("phone")
    public String getPhone() { return phone; }

    @JsonProperty("password")
    public String getPassword() { return password; }

    @JsonProperty("blood_type")
    public String getBloodType() { return bloodType; }

    @JsonProperty("role")
    public String getRole() { return role; }
}
