package com.setec.backend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "otp_codes")
public class otp_codes {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "id", columnDefinition = "VARCHAR(255)")
    private UUID id;
    private String contact;
    private String otp_code;
    private String expires_at;
    private boolean verified;
}
