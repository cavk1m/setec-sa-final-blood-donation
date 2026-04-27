package com.setec.backend.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DonationRegisterRequest {

    @NotNull(message = "Location ID is required")
    @JsonProperty("location_id")
    private String locationId;

    @NotEmpty(message = "Survey answers are required")
    @JsonProperty("answers")
    private List<SurveyAnswerRequest> surveyAnswers;
}