package com.setec.backend.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CertificateResponse {
    @JsonProperty("id")
    private UUID id;

    @JsonProperty("user_id")
    private long userId;

    @JsonProperty("donation_id")
    private long donationId;

    @JsonProperty("certificate_number")
    private String certificateNumber;

    @JsonProperty("issued_date")
    private Date issuedDate;

    @JsonProperty("location_name")
    private String locationName;

    @JsonProperty("pdf_url")
    private String pdfUrl;

    @JsonProperty("created_at")
    private Date createdAt;
}
