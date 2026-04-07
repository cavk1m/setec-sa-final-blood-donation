package com.setec.backend.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HospitalResponse {
    private UUID id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String city;
    private String state;
    private String zipCode;
    private String country;
    private String registrationNumber;
    private String licenseNumber;
    private String bloodBankCoordinatorName;
    private String bloodBankCoordinatorEmail;
    private String bloodBankCoordinatorPhone;
    
    @JsonProperty("isActive")
    private Boolean isActive;
    
    @JsonProperty("isVerified")
    private Boolean isVerified;
    
    private Integer totalBloodUnits;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
}
