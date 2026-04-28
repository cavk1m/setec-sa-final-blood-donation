// package com.setec.backend.Controller;

// import com.setec.backend.Dto.DonationRegisterRequest;
// import com.setec.backend.Dto.SurveyAnswerRequest;
// import com.setec.backend.Model.DonationQueue;
// import com.setec.backend.Model.SurveyAnswer;
// import com.setec.backend.Model.locations;
// import com.setec.backend.Repository.LocationRepository;
// import com.setec.backend.Repository.SurveyAnswerRepository;
// import com.setec.backend.Service.DonationService;
// import io.swagger.v3.oas.annotations.security.SecurityRequirement;
// import io.swagger.v3.oas.annotations.tags.Tag;
// import jakarta.servlet.http.HttpServletRequest;
// // import jakarta.transaction.Transactional;
// import jakarta.validation.Valid;
// import lombok.RequiredArgsConstructor;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.time.LocalDateTime;
// import java.util.Map;
// import java.util.UUID;

// @RestController
// @RequestMapping("/api/donation")
// @RequiredArgsConstructor
// @Tag(name = "Donation", description = "Donation registration and queue management")
// public class DonationController {
    
//     private final DonationService donationService;
//     private final LocationRepository locationRepository;
//     private final SurveyAnswerRepository surveyAnswerRepository;
    
//     private static final Logger log = LoggerFactory.getLogger(DonationController.class);
    
//     /**
//      * Register for donation (submit survey answers + join queue)
//      */
//     @PostMapping("/register")
//     // @Transactional
//     @SecurityRequirement(name = "bearer-jwt")
//     public ResponseEntity<?> registerForDonation(
//             @Valid @RequestBody DonationRegisterRequest request,
//             HttpServletRequest httpRequest) {
//         try {
//             UUID userId = (UUID) httpRequest.getAttribute("currentUserId");
            
            
//             // Step 1: Validate input
//             if (request.getLocationId() == null || request.getLocationId().isEmpty()) {
//                 return ResponseEntity.badRequest().body(Map.of(
//                     "success", false,
//                     "message", "Location ID is required"
//                 ));
//             }
            
//             if (request.getSurveyAnswers() == null || request.getSurveyAnswers().isEmpty()) {
//                 return ResponseEntity.badRequest().body(Map.of(
//                     "success", false,
//                     "message", "Survey answers are required"
//                 ));
//             }
            
//             // Step 2: Validate location exists
//             UUID locationId = UUID.fromString(request.getLocationId());
//             locations location = locationRepository.findById(locationId)
//                 .orElseThrow(() -> new RuntimeException("Location not found with ID: " + request.getLocationId()));
            
//             log.info("Registering user {} for donation at location {}", userId, location.getName());
            
//             // Step 3: Save survey answers
//             for (SurveyAnswerRequest answer : request.getSurveyAnswers()) {
//                 SurveyAnswer surveyAnswer = SurveyAnswer.builder()
//                     .id(UUID.randomUUID().toString())
//                     .userId(userId)
//                     .questionId(answer.getQuestionId())
//                     .answer(answer.getAnswer())
//                     .createdAt(LocalDateTime.now())
//                     .updatedAt(LocalDateTime.now())
//                     .build();
//                 surveyAnswerRepository.save(surveyAnswer);
//             }
            
//             // Step 4: Create queue entry
//             DonationQueue queue = donationService.registerForDonation(userId, request.getLocationId(),  request.getSurveyAnswers());
            
//             return ResponseEntity.ok(Map.of(
//                 "success", true,
//                 "message", "Successfully registered for donation",
//                 "queue", Map.of(
//                     "id", queue.getId(),
//                     "queue_number", queue.getQueueNumber(),
//                     "status", queue.getStatus(),
//                     "location_id", queue.getLocationId(),
//                     "created_at", queue.getCreatedAt()
//                 )
//             ));
            
//         } catch (IllegalArgumentException e) {
//             log.error("Invalid location ID format: {}", e.getMessage());
//             return ResponseEntity.badRequest().body(Map.of(
//                 "success", false,
//                 "message", "Invalid location ID format"
//             ));
//         } catch (RuntimeException e) {
//             log.error("Location validation failed: {}", e.getMessage());
//             return ResponseEntity.badRequest().body(Map.of(
//                 "success", false,
//                 "message", e.getMessage()
//             ));
//         } catch (Exception e) {
//             log.error("Donation registration failed for user {}: {}", 
//                 (UUID) httpRequest.getAttribute("currentUserId"), e.getMessage(), e);
//             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
//                 "success", false,
//                 "message", "Failed to register for donation: " + e.getMessage()
//             ));
//         }
//     }
    
//     /**
//      * Get my current queue status
//      */
//    @GetMapping("/my-queue")
// @SecurityRequirement(name = "bearer-jwt")
// public ResponseEntity<?> getMyQueue(HttpServletRequest request) {
//     try {
//         UUID userId = (UUID) request.getAttribute("currentUserId");

//         DonationQueue queue = donationService.getMyQueue(userId);

//         if (queue == null) {
//             return ResponseEntity.ok(Map.of(
//                 "success", false,
//                 "message", "No active queue entry found"
//             ));
//         }

//         Map<String, Object> locationMap = new java.util.HashMap<>();
//         if (queue.getLocation() != null) {
//             locationMap.put("name", queue.getLocation().getName());
//             locationMap.put("address", queue.getLocation().getAddress());
//         }

//         Map<String, Object> queueMap = new java.util.HashMap<>();
//         queueMap.put("id", queue.getId());
//         queueMap.put("queue_number", queue.getQueueNumber());
//         queueMap.put("status", queue.getStatus());
//         queueMap.put("survey_score", queue.getSurveyScore() != null ? queue.getSurveyScore() : 0);
//         queueMap.put("location", locationMap);
//         queueMap.put("created_at", queue.getCreatedAt());

//         return ResponseEntity.ok(Map.of("queue", queueMap));

//     } catch (Exception e) {
//         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
//             "success", false,
//             "message", "Failed to fetch queue status: " + e.getMessage()
//         ));
//     }
// }
// }

package com.setec.backend.Controller;

import com.setec.backend.Dto.DonationRegisterRequest;
import com.setec.backend.Dto.SurveyAnswerRequest;
import com.setec.backend.Model.DonationQueue;
import com.setec.backend.Model.SurveyAnswer;
import com.setec.backend.Model.locations;
import com.setec.backend.Repository.LocationRepository;
import com.setec.backend.Repository.SurveyAnswerRepository;
import com.setec.backend.Service.DonationService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/donation")
@RequiredArgsConstructor
@Tag(name = "Donation", description = "Donation registration and queue management")
public class DonationController {
    
    private final DonationService donationService;
    private final LocationRepository locationRepository;
    private final SurveyAnswerRepository surveyAnswerRepository;
    
    private static final Logger log = LoggerFactory.getLogger(DonationController.class);
    
    @PostMapping("/register")
    @SecurityRequirement(name = "bearer-jwt")
    public ResponseEntity<?> registerForDonation(
            @RequestBody DonationRegisterRequest request,
            HttpServletRequest httpRequest) {
        try {
            UUID userId = (UUID) httpRequest.getAttribute("currentUserId");

            // DEBUG
            log.info("=== DEBUG ===");
            log.info("locationId: '{}'", request.getLocationId());
            log.info("answers: {}", request.getSurveyAnswers());
            log.info("=== END ===");

            // Step 1: Validate input
            if (request.getLocationId() == null || request.getLocationId().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Location ID is required"
                ));
            }
            
            if (request.getSurveyAnswers() == null || request.getSurveyAnswers().isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Survey answers are required"
                ));
            }
            
            // Step 2: Validate location exists
            UUID locationId = UUID.fromString(request.getLocationId().trim());
            locations location = locationRepository.findById(locationId)
                .orElseThrow(() -> new RuntimeException("Location not found with ID: " + request.getLocationId()));
            
            log.info("Registering user {} for donation at location {}", userId, location.getName());
            
            // Step 3: Save survey answers
            for (SurveyAnswerRequest answer : request.getSurveyAnswers()) {
                SurveyAnswer surveyAnswer = SurveyAnswer.builder()
                    .id(UUID.randomUUID().toString())
                    .userId(userId)
                    .questionId(answer.getQuestionId())
                    .answer(answer.getAnswer())
                    .createdAt(LocalDateTime.now())
                    .updatedAt(LocalDateTime.now())
                    .build();
                surveyAnswerRepository.save(surveyAnswer);
            }
            
            // Step 4: Create queue entry
            DonationQueue queue = donationService.registerForDonation(
                userId,
                request.getLocationId(),
                request.getSurveyAnswers()
            );

            Map<String, Object> locationMap = new java.util.HashMap<>();
            locationMap.put("id", location.getId());
            locationMap.put("name", location.getName());
            locationMap.put("address", location.getAddress());

            Map<String, Object> queueMap = new java.util.HashMap<>();
            queueMap.put("id", queue.getId());
            queueMap.put("queue_number", queue.getQueueNumber());
            queueMap.put("status", queue.getStatus());
            queueMap.put("location", locationMap);
            queueMap.put("created_at", queue.getCreatedAt());

            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "message", "Registered successfully. A confirmation email has been sent.",
                "queue", queueMap
            ));
            
        } catch (IllegalArgumentException e) {
            log.error("Invalid location ID format: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Invalid location ID format: " + e.getMessage()
            ));
        } catch (RuntimeException e) {
            log.error("Location validation failed: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", e.getMessage()
            ));
        } catch (Exception e) {
            log.error("Donation registration failed: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to register for donation: " + e.getMessage()
            ));
        }
    }
    
    @GetMapping("/my-queue")
    @SecurityRequirement(name = "bearer-jwt")
    public ResponseEntity<?> getMyQueue(HttpServletRequest request) {
        try {
            UUID userId = (UUID) request.getAttribute("currentUserId");

            DonationQueue queue = donationService.getMyQueue(userId);

            if (queue == null) {
                return ResponseEntity.ok(Map.of(
                    "success", false,
                    "message", "No active queue entry found"
                ));
            }

            Map<String, Object> locationMap = new java.util.HashMap<>();
            if (queue.getLocation() != null) {
                locationMap.put("name", queue.getLocation().getName());
                locationMap.put("address", queue.getLocation().getAddress());
            }

            Map<String, Object> queueMap = new java.util.HashMap<>();
            queueMap.put("id", queue.getId());
            queueMap.put("queue_number", queue.getQueueNumber());
            queueMap.put("status", queue.getStatus());
            queueMap.put("survey_score", queue.getSurveyScore() != null ? queue.getSurveyScore() : 0);
            queueMap.put("location", locationMap);
            queueMap.put("created_at", queue.getCreatedAt());

            return ResponseEntity.ok(Map.of("queue", queueMap));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to fetch queue status: " + e.getMessage()
            ));
        }
    }
}