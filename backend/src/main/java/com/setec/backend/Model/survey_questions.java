package com.setec.backend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
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

//    @Column(name = "Create_at")
//    private String create_at;
//
//    @Column(name = "Update_at")
//    private Date update_at;
//
//    @Column(name = "Delete_at")
//    private Date delete_at;
//
//    @Column(name = "Create_by")
//    private String create_by;
//
//    @Column(name = "Update_by")
//    private String update_by;
//
//    @Column(name = "Delete_by")
//    private String delete_by;
//
//    @Column(name = "expire_time")
//    private Date expire_time;



}
