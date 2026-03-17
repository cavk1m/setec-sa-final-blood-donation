package com.setec.backend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "survey_questions", indexes = {
    @Index(name = "idx_survey_questions_question", columnList = "question")
})
public class survey_questions {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", columnDefinition = "VARCHAR(255)")
    private UUID id;
    
    @Column(name = "question", nullable = false, columnDefinition = "TEXT")
    private String question;
}
