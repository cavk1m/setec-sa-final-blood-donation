package com.setec.backend.Model;

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
@Table(name = "blood_donations", indexes = {
    @Index(name = "idx_blood_donations_user_id", columnList = "user_id"),
    @Index(name = "idx_blood_donations_location_id", columnList = "location_id"),
    @Index(name = "idx_blood_donations_queue_id", columnList = "queue_id"),
    @Index(name = "idx_blood_donations_donation_date", columnList = "donation_date"),
    @Index(name = "idx_blood_donations_created_at", columnList = "created_at")
})
public class blood_donations {
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
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "queue_id", nullable = false)
    private donation_queue queue;
    
    @Column(name = "donation_date", nullable = false)
    private LocalDateTime donation_date;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime created_at;

    @OneToMany(mappedBy = "donation", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<certificates> certificates;
    
    @PrePersist
    protected void onCreate() {
        created_at = LocalDateTime.now();
        if (donation_date == null) {
            donation_date = LocalDateTime.now();
        }
    }
}
