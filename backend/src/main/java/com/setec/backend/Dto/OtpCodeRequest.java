package com.setec.backend.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class OtpCodeRequest {
    @JsonProperty("contact")
    private String contact;

    @JsonProperty("otp_code")
    private String otpCode;
}
