package com.setec.backend.Model;

import com.setec.backend.Enum.DonationType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "locations", indexes = {
    @Index(name = "idx_locations_name", columnList = "name"),
    @Index(name = "idx_locations_donation_type", columnList = "donation_type"),
    @Index(name = "idx_locations_coordinates", columnList = "latitude, longitude")
})
public class locations {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", columnDefinition = "VARCHAR(255)")
    private UUID id;
    
    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "address", nullable = false)
    private String address;
    
    @Column(name = "latitude", precision = 10, scale = 7)
    private BigDecimal latitude;
    
    @Column(name = "longitude", precision = 10, scale = 7)
    private BigDecimal longitude;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "donation_type")
    private DonationType donation_type;
    
    @Column(name = "payment_qr_url")
    private String payment_qr_url;

    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<blood_donations> bloodDonations;
    
    @OneToMany(mappedBy = "location", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<donation_queue> donationQueues;
}
