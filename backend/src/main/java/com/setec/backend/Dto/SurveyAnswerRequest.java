package com.setec.backend.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SurveyAnswerRequest {

    @NotNull
    @JsonProperty("question_id")
    private String questionId;

    @NotNull
    @JsonProperty("answer")
    private String answer;
}