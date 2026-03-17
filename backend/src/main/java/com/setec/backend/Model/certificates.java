package com.setec.backend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "certificates", indexes = {
    @Index(name = "idx_certificates_user_id", columnList = "user_id"),
    @Index(name = "idx_certificates_donation_id", columnList = "donation_id"),
    @Index(name = "idx_certificates_certificate_number", columnList = "certificate_number", unique = true),
    @Index(name = "idx_certificates_issued_date", columnList = "issued_date"),
    @Index(name = "idx_certificates_created_at", columnList = "created_at")
})
public class certificates {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", columnDefinition = "VARCHAR(255)")
    private UUID id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private users user;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "donation_id", nullable = false)
    private blood_donations donation;
    
    @Column(name = "certificate_number", unique = true, nullable = false)
    private String certificate_number;
    
    @Column(name = "issued_date", nullable = false)
    private LocalDateTime issued_date;
    
    @Column(name = "location_name", nullable = false)
    private String location_name;
    
    @Column(name = "pdf_url")
    private String pdf_url;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime created_at;
    
    @PrePersist
    protected void onCreate() {
        created_at = LocalDateTime.now();
        if (issued_date == null) {
            issued_date = LocalDateTime.now();
        }
    }
}
