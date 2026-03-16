package com.setec.backend.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserRequest {
    @JsonProperty("full_name")
    private String fullName;

    @JsonProperty("email")
    private String email;

    @JsonProperty("phone")
    private String phone;

    @JsonProperty("password")
    private String password;

    @JsonProperty("blood_type")
    private String bloodType;

    @JsonProperty("role")
    private String role;
}
