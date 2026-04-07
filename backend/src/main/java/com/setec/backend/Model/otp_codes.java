package com.setec.backend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "otp_codes", indexes = {
    @Index(name = "idx_otp_codes_contact", columnList = "contact"),
    @Index(name = "idx_otp_codes_otp_code", columnList = "otp_code"),
    @Index(name = "idx_otp_codes_expires_at", columnList = "expires_at"),
    @Index(name = "idx_otp_codes_verified", columnList = "verified")
})
public class otp_codes {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
        name = "UUID",
        strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false, columnDefinition = "UUID")
    private UUID id;
    
    @Column(name = "contact", nullable = false)
    private String contact;
    
    @Column(name = "otp_code", nullable = false)
    private String otp_code;
    
    @Column(name = "expires_at", nullable = false)
    private LocalDateTime expires_at;
    
    @Column(name = "verified", nullable = false)
    private boolean verified = false;
}
