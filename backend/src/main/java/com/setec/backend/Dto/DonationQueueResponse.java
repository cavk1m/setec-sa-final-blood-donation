package com.setec.backend.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DonationQueueResponse {
    @JsonProperty("id")
    private UUID id;

    @JsonProperty("user_id")
    private long userId;

    @JsonProperty("location_id")
    private long locationId;

    @JsonProperty("queue_number")
    private long queueNumber;

    @JsonProperty("survey_score")
    private long surveyScore;

    @JsonProperty("status")
    private boolean status;

    @JsonProperty("created_at")
    private String createdAt;

    @JsonProperty("updated_at")
    private String updatedAt;
}
