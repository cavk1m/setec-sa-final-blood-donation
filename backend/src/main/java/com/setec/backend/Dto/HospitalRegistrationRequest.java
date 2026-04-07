package com.setec.backend.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HospitalRegistrationRequest {
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
}
