package com.setec.backend.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class DonationQueueRequest {
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
}
