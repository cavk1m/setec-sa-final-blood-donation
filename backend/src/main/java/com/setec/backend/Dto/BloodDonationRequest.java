package com.setec.backend.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BloodDonationRequest {
    @JsonProperty("user_id")
    private long userId;

    @JsonProperty("location_id")
    private long locationId;

    @JsonProperty("queue_id")
    private long queueId;

    @JsonProperty("donation_date")
    private Date donationDate;

//    @JsonProperty("Create_at")
//    private Date created_at;

}
