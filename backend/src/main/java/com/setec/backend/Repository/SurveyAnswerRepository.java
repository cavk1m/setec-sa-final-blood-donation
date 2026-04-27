package com.setec.backend.Repository;

import com.setec.backend.Model.SurveyAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SurveyAnswerRepository extends JpaRepository<SurveyAnswer, String> {
    
    // Get all survey answers for a user
    List<SurveyAnswer> findByUserId(UUID userId);
    
    // Delete all survey answers for a user (useful for cleanup)
    void deleteByUserId(UUID userId);
}
