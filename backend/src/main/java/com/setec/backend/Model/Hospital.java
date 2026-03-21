package com.setec.backend.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.List;
import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "hospitals", indexes = {
    @Index(name = "idx_hospitals_name", columnList = "name"),
    @Index(name = "idx_hospitals_email", columnList = "email"),
    @Index(name = "idx_hospitals_phone", columnList = "phone"),
    @Index(name = "idx_hospitals_is_active", columnList = "is_active")
})
public class Hospital extends BaseEntity {
    
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
        name = "UUID",
        strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false, columnDefinition = "UUID")
    private UUID id;
    
    @Column(name = "name", nullable = false)
    private String name;
    
    @Column(name = "email", unique = true, nullable = false)
    private String email;
    
    @Column(name = "phone", unique = true, nullable = false)
    private String phone;
    
    @Column(name = "address", nullable = false)
    private String address;
    
    @Column(name = "city", nullable = false)
    private String city;
    
    @Column(name = "state", nullable = false)
    private String state;
    
    @Column(name = "zip_code", nullable = false)
    private String zipCode;
    
    @Column(name = "country", nullable = false)
    private String country;
    
    @Column(name = "registration_number", unique = true, nullable = false)
    private String registrationNumber;
    
    @Column(name = "license_number", unique = true, nullable = false)
    private String licenseNumber;
    
    @Column(name = "blood_bank_coordinator_name")
    private String bloodBankCoordinatorName;
    
    @Column(name = "blood_bank_coordinator_email")
    private String bloodBankCoordinatorEmail;
    
    @Column(name = "blood_bank_coordinator_phone")
    private String bloodBankCoordinatorPhone;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    @Column(name = "is_verified")
    private Boolean isVerified = false;
    
    @Column(name = "total_blood_units")
    private Integer totalBloodUnits = 0;
    
    @OneToMany(mappedBy = "hospital", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<HospitalAdmin> admins;
    
    @OneToMany(mappedBy = "hospital", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<blood_donations> donations;
}
