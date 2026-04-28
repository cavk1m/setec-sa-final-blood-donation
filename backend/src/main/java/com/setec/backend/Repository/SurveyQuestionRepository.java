package com.setec.backend.Repository;

import com.setec.backend.Model.survey_questions;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SurveyQuestionRepository extends JpaRepository<survey_questions, UUID> {
}