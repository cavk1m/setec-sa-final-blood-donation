package com.setec.backend.Service;

import com.setec.backend.Dto.SurveyAnswerRequest;
import com.setec.backend.Model.DonationQueue;
import com.setec.backend.Model.locations;
import com.setec.backend.Model.survey_questions;
import com.setec.backend.Model.users;
import com.setec.backend.Repository.DonationQueueRepository;
import com.setec.backend.Repository.LocationRepository;
import com.setec.backend.Repository.SurveyQuestionRepository;
import com.setec.backend.Repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DonationService {

    private static final Logger log = LoggerFactory.getLogger(DonationService.class);

    private final DonationQueueRepository queueRepository;
    private final SurveyQuestionRepository surveyQuestionRepository;
    private final EmailServiceInterface emailService;
    private final UserRepository userRepository;
    private final LocationRepository locationRepository;

    public DonationQueue registerForDonation(UUID userId, String locationId, List<SurveyAnswerRequest> answers) {

        // Calculate score
        int score = 0;
        for (SurveyAnswerRequest answer : answers) {
            survey_questions question = surveyQuestionRepository
                .findById(UUID.fromString(answer.getQuestionId()))
                .orElse(null);

            if (question != null &&
                question.getCorrectAnswer() != null &&
                answer.getAnswer().equalsIgnoreCase(question.getCorrectAnswer())) {
                score++;
            }
        }

        // Get next queue number
        Integer maxQueueNum = queueRepository.findMaxQueueNumberByLocationId(locationId);
        Integer nextQueueNum = (maxQueueNum != null) ? maxQueueNum + 1 : 1;

        // Create queue entry
        DonationQueue queue = DonationQueue.builder()
            .id(UUID.randomUUID().toString())
            .userId(userId)
            .locationId(locationId)
            .queueNumber(nextQueueNum)
            .status("waiting")
            .surveyScore(score)
            .createdAt(LocalDateTime.now())
            .updatedAt(LocalDateTime.now())
            .build();

        queueRepository.save(queue);

        // Send confirmation email
        try {
            users user = userRepository.findById(userId).orElse(null);
            locations location = locationRepository
                .findById(UUID.fromString(locationId)).orElse(null);

            if (user != null && location != null) {
                emailService.sendDonationQueueEmail(
                    user.getEmail(),
                  user.getFullName(),
                    queue.getQueueNumber(),
                    location.getName()
                );
                log.info("Donation queue email sent to: {}", user.getEmail());
            } else {
                log.warn("User or location not found, skipping email");
            }
        } catch (Exception e) {
            log.warn("Failed to send queue email: {}", e.getMessage());
        }

        return queue;
    }

    public DonationQueue getMyQueue(UUID userId) {
        return queueRepository.findFirstByUserIdWithLocation(userId)
            .orElse(null);
    }
}