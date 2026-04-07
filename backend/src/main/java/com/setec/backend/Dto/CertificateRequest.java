package com.setec.backend.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CertificateRequest {
    @JsonProperty("user_id")
    private long userId;

    @JsonProperty("donation_id")
    private long donationId;

    @JsonProperty("location_name")
    private String locationName;

    @JsonProperty("pdf_url")
    private String pdfUrl;
}
