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
public class BloodDonationResponse {
    @JsonProperty("id")
    private UUID id;

    @JsonProperty("user_id")
    private long userId;

    @JsonProperty("location_id")
    private long locationId;

    @JsonProperty("queue_id")
    private long queueId;

    @JsonProperty("donation_date")
    private Date donationDate;

    @JsonProperty("created_at")
    private Date createdAt;
}
