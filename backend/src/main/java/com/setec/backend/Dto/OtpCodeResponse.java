package com.setec.backend.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OtpCodeResponse {
    @JsonProperty("id")
    private UUID id;

    @JsonProperty("contact")
    private String contact;

    @JsonProperty("otp_code")
    private String otpCode;

    @JsonProperty("expires_at")
    private String expiresAt;

    @JsonProperty("verified")
    private boolean verified;
}
