package com.setec.backend.Controller;

import com.setec.backend.Model.*;
import com.setec.backend.Repository.*;
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
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@Tag(name = "Dashboard", description = "Admin dashboard queue management")
public class DashboardController {

    private static final Logger log = LoggerFactory.getLogger(DashboardController.class);

    private final DonationQueueRepository queueRepository;
    private final UserRepository userRepository;
    private final LocationRepository locationRepository;
    private final CertificateRepository certificateRepository;
    private final BloodDonationRepository bloodDonationRepository;
    private final DonationQueueEntityRepository donationQueueEntityRepository;

    @GetMapping("/queue")
    @SecurityRequirement(name = "bearer-jwt")
    public ResponseEntity<?> getQueue(HttpServletRequest request) {
        try {
            UUID adminId = (UUID) request.getAttribute("currentUserId");

            users admin = userRepository.findById(adminId).orElse(null);
            if (admin == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "success", false,
                    "message", "Admin not found"
                ));
            }

            UUID locationId = admin.getLocationId();
            if (locationId == null) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Admin has no location assigned"
                ));
            }

            List<DonationQueue> queues = queueRepository
                .findAllByLocationIdAndStatusOrderByQueueNumberAsc(locationId, "waiting");

            List<Map<String, Object>> queueList = queues.stream().map(q -> {
                Map<String, Object> queueMap = new HashMap<>();
                queueMap.put("id", q.getId());
                queueMap.put("queue_number", q.getQueueNumber());
                queueMap.put("status", q.getStatus());
                queueMap.put("survey_score", q.getSurveyScore() != null ? q.getSurveyScore() : 0);
                queueMap.put("created_at", q.getCreatedAt());

                users user = userRepository.findById(q.getUserId()).orElse(null);
                if (user != null) {
                    Map<String, Object> userMap = new HashMap<>();
                    userMap.put("id", user.getId());
                    userMap.put("full_name", user.getFullName());
                    userMap.put("blood_type", user.getBloodType());
                    queueMap.put("user", userMap);
                }

                return queueMap;
            }).collect(Collectors.toList());

            return ResponseEntity.ok(Map.of("queue", queueList));

        } catch (Exception e) {
            log.error("Failed to fetch queue: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to fetch queue: " + e.getMessage()
            ));
        }
    }

    @PutMapping("/queue/{id}/complete")
    @SecurityRequirement(name = "bearer-jwt")
    public ResponseEntity<?> completeQueue(
            @PathVariable String id,
            HttpServletRequest request) {
        try {
            // Find queue
            DonationQueue queue = queueRepository.findById(UUID.fromString(id)).orElse(null);
            if (queue == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "success", false,
                    "message", "Queue entry not found"
                ));
            }

            // Update queue status
            queue.setStatus("completed");
            queue.setUpdatedAt(LocalDateTime.now());
            queueRepository.save(queue);

            // Get user and location
            users user = userRepository.findById(queue.getUserId()).orElse(null);
            locations location = locationRepository.findById(queue.getLocationId()).orElse(null);
            String locationName = location != null ? location.getName() : "Blood Center";

            // Get donation_queue entity
            donation_queue donationQueueEntity = donationQueueEntityRepository
                .findById(queue.getId()).orElse(null);

            // Create blood_donation record
            blood_donations donation = new blood_donations();
            donation.setUser(user);
            donation.setLocation(location);
            donation.setQueue(donationQueueEntity);
            donation.setDonation_date(LocalDateTime.now());
            blood_donations savedDonation = bloodDonationRepository.save(donation);

            // Generate certificate number
            String certNumber = "CERT-" + LocalDateTime.now().getYear() + "-" +
                String.format("%05d", new Random().nextInt(99999));

            // Create certificate
            certificates cert = new certificates();
            cert.setUser(user);
            cert.setDonation(savedDonation);
            cert.setCertificate_number(certNumber);
            cert.setIssued_date(LocalDateTime.now());
            cert.setLocation_name(locationName);
            certificates savedCert = certificateRepository.save(cert);

            return ResponseEntity.ok(Map.of(
                "message", "Donation completed successfully",
                "donation", Map.of(
                    "id", savedDonation.getId(),
                    "user_id", queue.getUserId(),
                    "donation_date", savedDonation.getDonation_date().toLocalDate().toString()
                ),
                "certificate", Map.of(
                    "id", savedCert.getId(),
                    "certificate_number", savedCert.getCertificate_number(),
                    "issued_date", savedCert.getIssued_date().toLocalDate().toString(),
                    "pdf_url", ""
                )
            ));

        } catch (Exception e) {
            log.error("Failed to complete queue: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to complete queue: " + e.getMessage()
            ));
        }
    }

    @PutMapping("/queue/{id}/skip")
    @SecurityRequirement(name = "bearer-jwt")
    public ResponseEntity<?> skipQueue(
            @PathVariable String id,
            HttpServletRequest request) {
        try {
            DonationQueue queue = queueRepository.findById(UUID.fromString(id)).orElse(null);
            if (queue == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "success", false,
                    "message", "Queue entry not found"
                ));
            }

            queue.setStatus("skip");
            queue.setUpdatedAt(LocalDateTime.now());
            queueRepository.save(queue);

            return ResponseEntity.ok(Map.of(
                "message", "Donor skipped",
                "queue", Map.of(
                    "id", queue.getId(),
                    "queue_number", queue.getQueueNumber(),
                    "status", queue.getStatus()
                )
            ));

        } catch (Exception e) {
            log.error("Failed to skip queue: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to skip queue: " + e.getMessage()
            ));
        }
    }


    // GET /api/dashboard/certificates
    @GetMapping("/certificates")
    @SecurityRequirement(name = "bearer-jwt")
    public ResponseEntity<?> getAllCertificates(HttpServletRequest request) {
        try {
            UUID adminId = (UUID) request.getAttribute("currentUserId");

            users admin = userRepository.findById(adminId).orElse(null);
            if (admin == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of(
                    "success", false,
                    "message", "Admin not found"
                ));
            }

          List<certificates> certs = certificateRepository.findAllWithUser();

            List<Map<String, Object>> certList = certs.stream().map(cert -> {
                Map<String, Object> map = new HashMap<>();
                map.put("id", cert.getId());
                map.put("certificate_number", cert.getCertificate_number());
                map.put("issued_date", cert.getIssued_date());
                map.put("location_name", cert.getLocation_name());
                map.put("created_at", cert.getCreated_at());

                if (cert.getUser() != null) {
                    Map<String, Object> userMap = new HashMap<>();
                    userMap.put("id", cert.getUser().getId());
                    userMap.put("full_name", cert.getUser().getFullName());
                    userMap.put("blood_type", cert.getUser().getBloodType());
                    map.put("user", userMap);
                }

                return map;
            }).collect(Collectors.toList());

            return ResponseEntity.ok(Map.of("certificates", certList));

        } catch (Exception e) {
            log.error("Failed to fetch certificates: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to fetch certificates: " + e.getMessage()
            ));
        }
    }   
}