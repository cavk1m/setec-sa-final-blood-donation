package com.setec.backend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "donation_queue")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DonationQueue {
    @Id
    private String id;  // varchar255
    
    @Column(name = "user_id")
    private UUID userId;  // Link to users table
    
    @Column(name = "location_id")
    private String locationId;  // varchar255
    
    @Column(name = "queue_number")
    private Integer queueNumber;  // int
    
    @Column(name = "status")
    private String status;  // "waiting", "in_progress", "completed", "failed"

      @Column(name = "survey_score")
    private Integer surveyScore;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id", insertable = false, updatable = false)
    private locations location;
}