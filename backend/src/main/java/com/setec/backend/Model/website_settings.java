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
@Table(name = "website_settings", indexes = {
    @Index(name = "idx_website_settings_updated_at", columnList = "updated_at")
})
public class website_settings {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", columnDefinition = "VARCHAR(255)")
    private UUID id;

    @Column(name = "hero_background_url")
    private String heroBackgroundUrl;
    
    @Column(name = "logo_url")
    private String logoUrl;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    

}
