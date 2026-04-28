package com.setec.backend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "survey_answers")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SurveyAnswer {
    @Id
    @Column(name = "id", columnDefinition = "VARCHAR(255)")
    private String id;
    
    @Column(name = "user_id", nullable = false)
    private UUID userId;
    
    @Column(name = "question_id", nullable = false)
    private String questionId;
    
    @Column(name = "answer", nullable = false)
    private String answer;  // "true", "false", "yes", "no", etc.
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
