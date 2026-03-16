package com.setec.backend.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SurveyQuestionResponse {
    @JsonProperty("id")
    private UUID id;

    @JsonProperty("question")
    private String question;
}
