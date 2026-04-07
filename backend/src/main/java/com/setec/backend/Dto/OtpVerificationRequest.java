package com.setec.backend.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OtpVerificationRequest {
    
    @NotBlank(message = "Email is required")
    @JsonProperty("email")
    private String email;
    
    @NotBlank(message = "OTP code is required")
    @JsonProperty("otp_code")
    private String otpCode;
}