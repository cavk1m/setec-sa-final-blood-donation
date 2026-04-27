package com.setec.backend.Controller;

import com.setec.backend.Model.survey_questions;
import com.setec.backend.Repository.SurveyQuestionRepository;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/survey")
@RequiredArgsConstructor
@CrossOrigin(origins = "*", allowedHeaders = "*")
@Tag(name = "Survey", description = "Survey questions for blood donation screening")
public class SurveyController {

    private final SurveyQuestionRepository surveyQuestionRepository;

    @GetMapping("/questions")
    @SecurityRequirement(name = "bearer-jwt")
    public ResponseEntity<?> getQuestions() {
        List<survey_questions> questions = surveyQuestionRepository.findAll();

        List<Map<String, Object>> result = questions.stream()
            .map(q -> {
                Map<String, Object> map = new HashMap<>();
                map.put("id", q.getId().toString());
                map.put("question", q.getQuestion());
                return map;
            })
            .collect(Collectors.toList());

        return ResponseEntity.ok(Map.of("questions", result));
    }

    @PostMapping("/questions")
    @SecurityRequirement(name = "bearer-jwt")
    public ResponseEntity<?> createQuestion(@RequestBody Map<String, String> request) {
        try {
            String question = request.get("question");
            if (question == null || question.trim().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Question is required"
                ));
            }
            survey_questions newQuestion = new survey_questions();
            newQuestion.setQuestion(question);
            survey_questions saved = surveyQuestionRepository.save(newQuestion);

            Map<String, Object> result = new HashMap<>();
            result.put("id", saved.getId().toString());
            result.put("question", saved.getQuestion());

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Question created successfully",
                "question", result
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to create question: " + e.getMessage()
            ));
        }
    }

    @PutMapping("/questions/{id}")
    @SecurityRequirement(name = "bearer-jwt")
    public ResponseEntity<?> updateQuestion(@PathVariable String id, @RequestBody Map<String, String> request) {
        try {
            survey_questions question = surveyQuestionRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new RuntimeException("Question not found"));

            if (request.get("question") != null) {
                question.setQuestion(request.get("question"));
            }
            survey_questions saved = surveyQuestionRepository.save(question);

            Map<String, Object> result = new HashMap<>();
            result.put("id", saved.getId().toString());
            result.put("question", saved.getQuestion());

            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Question updated successfully",
                "question", result
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to update question: " + e.getMessage()
            ));
        }
    }

    @DeleteMapping("/questions/{id}")
    @SecurityRequirement(name = "bearer-jwt")
    public ResponseEntity<?> deleteQuestion(@PathVariable String id) {
        try {
            survey_questions question = surveyQuestionRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new RuntimeException("Question not found"));
            surveyQuestionRepository.delete(question);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Question deleted successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to delete question: " + e.getMessage()
            ));
        }
    }
}