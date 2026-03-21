package com.setec.backend.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.setec.backend.Dto.HospitalAdminRequest;
import com.setec.backend.Model.Hospital;
import com.setec.backend.Model.HospitalAdmin;
import com.setec.backend.Service.HospitalService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.*;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@DisplayName("HospitalAdminController Tests")
class HospitalAdminControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private HospitalService hospitalService;

    @Autowired
    private ObjectMapper objectMapper;

    private Hospital testHospital;
    private HospitalAdmin testAdmin;
    private UUID hospitalId;
    private UUID adminId;

    @BeforeEach
    void setUp() {
        hospitalId = UUID.randomUUID();
        adminId = UUID.randomUUID();

        testHospital = new Hospital();
        testHospital.setId(hospitalId);
        testHospital.setName("Test Hospital");
        testHospital.setEmail("hospital@test.com");
        testHospital.setPhone("1234567890");
        testHospital.setAddress("123 Hospital St");
        testHospital.setCity("Test City");
        testHospital.setState("TS");
        testHospital.setZipCode("12345");
        testHospital.setCountry("Test Country");
        testHospital.setRegistrationNumber("REG-001");
        testHospital.setLicenseNumber("LIC-001");
        testHospital.setIsActive(true);
        testHospital.setIsVerified(false);
        testHospital.setTotalBloodUnits(0);
        testHospital.setCreatedDate(LocalDateTime.now());
        testHospital.setUpdatedDate(LocalDateTime.now());

        testAdmin = new HospitalAdmin();
        testAdmin.setId(adminId);
        testAdmin.setHospital(testHospital);
        testAdmin.setEmail("admin@test.com");
        testAdmin.setFullName("Admin Name");
        testAdmin.setPhone("9876543210");
        testAdmin.setIsActive(true);
        testAdmin.setEmailVerified(false);
    }

    @Test
    @DisplayName("Should register hospital")
    void testRegisterHospital() throws Exception {
        when(hospitalService.registerHospital(anyString(), anyString(), anyString(), anyString(), 
                anyString(), anyString(), anyString(), anyString(), anyString(), anyString()))
                .thenReturn(testHospital);

        HospitalAdminController.HospitalRegistrationRequest request = new HospitalAdminController.HospitalRegistrationRequest(
                "Test Hospital", "hospital@test.com", "1234567890", "123 Hospital St",
                "Test City", "TS", "12345", "Test Country", "REG-001", "LIC-001",
                "Coordinator", "coord@test.com", "5555555555"
        );

        mockMvc.perform(post("/api/hospitals/register")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Test Hospital"));
    }

    @Test
    @DisplayName("Should get hospital by ID")
    void testGetHospital() throws Exception {
        when(hospitalService.getHospitalById(hospitalId)).thenReturn(Optional.of(testHospital));

        mockMvc.perform(get("/api/hospitals/{id}", hospitalId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Test Hospital"));
    }

    @Test
    @DisplayName("Should update hospital")
    void testUpdateHospital() throws Exception {
        when(hospitalService.updateHospital(eq(hospitalId), anyString(), anyString(), anyString(),
                anyString(), anyString(), anyString(), anyString(), anyString()))
                .thenReturn(testHospital);

        HospitalAdminController.HospitalUpdateRequest request = new HospitalAdminController.HospitalUpdateRequest(
                "Updated Hospital", "hospital@test.com", "1234567890", "123 Hospital St",
                "Test City", "TS", "12345", "Test Country"
        );

        mockMvc.perform(put("/api/hospitals/{id}", hospitalId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Should update blood bank coordinator")
    void testUpdateCoordinator() throws Exception {
        when(hospitalService.updateBloodBankCoordinator(eq(hospitalId), anyString(), anyString(), anyString()))
                .thenReturn(testHospital);

        HospitalAdminController.CoordinatorRequest request = new HospitalAdminController.CoordinatorRequest(
                "Coordinator Name", "coord@test.com", "5555555555"
        );

        mockMvc.perform(put("/api/hospitals/{id}/coordinator", hospitalId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Should get hospital admins")
    void testGetHospitalAdmins() throws Exception {
        when(hospitalService.getHospitalAdmins(hospitalId)).thenReturn(Collections.singletonList(testAdmin));

        mockMvc.perform(get("/api/hospitals/{id}/admins", hospitalId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].email").value("admin@test.com"));
    }

    @Test
    @DisplayName("Should add hospital admin")
    void testAddHospitalAdmin() throws Exception {
        when(hospitalService.addHospitalAdmin(eq(hospitalId), anyString(), anyString(), anyString()))
                .thenReturn(testAdmin);

        HospitalAdminRequest request = new HospitalAdminRequest(
                "admin@test.com", "Admin Name", "9876543210", "password123"
        );

        mockMvc.perform(post("/api/hospitals/{id}/admins", hospitalId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Should deactivate admin")
    void testDeactivateAdmin() throws Exception {
        mockMvc.perform(delete("/api/hospitals/admins/{adminId}", adminId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNoContent());
    }

    @Test
    @DisplayName("Should update blood units")
    void testUpdateBloodUnits() throws Exception {
        when(hospitalService.updateTotalBloodUnits(hospitalId, 100)).thenReturn(testHospital);

        mockMvc.perform(put("/api/hospitals/{id}/blood-units", hospitalId)
                .param("units", "100")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Should check if hospital is verified")
    void testIsVerified() throws Exception {
        when(hospitalService.isHospitalVerified(hospitalId)).thenReturn(false);

        mockMvc.perform(get("/api/hospitals/{id}/verified", hospitalId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(false));
    }
}
