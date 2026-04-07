package com.setec.backend.Model;

import com.setec.backend.Enum.QueueStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "donation_queue", indexes = {
    @Index(name = "idx_donation_queue_user_id", columnList = "user_id"),
    @Index(name = "idx_donation_queue_location_id", columnList = "location_id"),
    @Index(name = "idx_donation_queue_queue_number", columnList = "queue_number"),
    @Index(name = "idx_donation_queue_status", columnList = "status"),
    @Index(name = "idx_donation_queue_created_at", columnList = "created_at")
})
public class donation_queue {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", columnDefinition = "VARCHAR(255)")
    private UUID id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private users user;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id", nullable = false)
    private locations location;
    
    @Column(name = "queue_number", nullable = false)
    private long queue_number;
    
    @Column(name = "survey_score")
    private long survey_score;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "status", nullable = false)
    private QueueStatus status;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime created_at;
    
    @Column(name = "updated_at")
    private LocalDateTime updated_at;
    @OneToMany(mappedBy = "queue", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<blood_donations> bloodDonations;
    
    @PrePersist
    protected void onCreate() {
        created_at = LocalDateTime.now();
        updated_at = LocalDateTime.now();
    }


    @PreUpdate
    protected void onUpdate() {
        updated_at = LocalDateTime.now();
    }
}
