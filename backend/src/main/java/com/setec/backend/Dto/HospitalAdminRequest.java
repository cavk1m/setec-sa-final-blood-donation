package com.setec.backend.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HospitalAdminRequest {
    private String email;
    private String fullName;
    private String phone;
    private String password;
}
