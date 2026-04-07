package com.setec.backend.Service;

import com.setec.backend.Model.Hospital;
import com.setec.backend.Model.HospitalAdmin;
import com.setec.backend.Repository.HospitalAdminRepository;
import com.setec.backend.Repository.HospitalRepository;
import com.setec.backend.Service.Serviceimpl.HospitalServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@DisplayName("HospitalService Tests")
class HospitalServiceTest {

    @Mock
    private HospitalRepository hospitalRepository;

    @Mock
    private HospitalAdminRepository hospitalAdminRepository;

    @InjectMocks
    private HospitalServiceImpl hospitalService;

    private Hospital testHospital;
    private UUID hospitalId;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        hospitalId = UUID.randomUUID();

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
    }

    @Test
    @DisplayName("Should register new hospital")
    void testRegisterHospital() {
        when(hospitalRepository.findByEmail("hospital@test.com")).thenReturn(Optional.empty());
        when(hospitalRepository.findByRegistrationNumber("REG-001")).thenReturn(Optional.empty());
        when(hospitalRepository.save(any(Hospital.class))).thenReturn(testHospital);

        Hospital result = hospitalService.registerHospital(
                "Test Hospital",
                "hospital@test.com",
                "1234567890",
                "123 Hospital St",
                "Test City",
                "TS",
                "12345",
                "Test Country",
                "REG-001",
                "LIC-001"
        );

        assertNotNull(result);
        assertEquals("Test Hospital", result.getName());
        verify(hospitalRepository, times(1)).save(any(Hospital.class));
    }

    @Test
    @DisplayName("Should throw exception when registering with duplicate email")
    void testRegisterHospitalDuplicateEmail() {
        when(hospitalRepository.findByEmail("hospital@test.com")).thenReturn(Optional.of(testHospital));

        assertThrows(IllegalArgumentException.class, () -> {
            hospitalService.registerHospital(
                    "Test Hospital",
                    "hospital@test.com",
                    "1234567890",
                    "123 Hospital St",
                    "Test City",
                    "TS",
                    "12345",
                    "Test Country",
                    "REG-001",
                    "LIC-001"
            );
        });
    }

    @Test
    @DisplayName("Should get hospital by ID")
    void testGetHospitalById() {
        when(hospitalRepository.findById(hospitalId)).thenReturn(Optional.of(testHospital));

        Optional<Hospital> result = hospitalService.getHospitalById(hospitalId);

        assertTrue(result.isPresent());
        assertEquals("Test Hospital", result.get().getName());
    }

    @Test
    @DisplayName("Should get hospital by email")
    void testGetHospitalByEmail() {
        when(hospitalRepository.findByEmail("hospital@test.com")).thenReturn(Optional.of(testHospital));

        Optional<Hospital> result = hospitalService.getHospitalByEmail("hospital@test.com");

        assertTrue(result.isPresent());
        assertEquals("Test Hospital", result.get().getName());
    }

    @Test
    @DisplayName("Should get hospital by registration number")
    void testGetHospitalByRegistrationNumber() {
        when(hospitalRepository.findByRegistrationNumber("REG-001")).thenReturn(Optional.of(testHospital));

        Optional<Hospital> result = hospitalService.getHospitalByRegistrationNumber("REG-001");

        assertTrue(result.isPresent());
        assertEquals("Test Hospital", result.get().getName());
    }

    @Test
    @DisplayName("Should get all active hospitals")
    void testGetAllActiveHospitals() {
        when(hospitalRepository.findAllByIsActiveTrue()).thenReturn(Collections.singletonList(testHospital));

        List<Hospital> result = hospitalService.getAllActiveHospitals();

        assertEquals(1, result.size());
        assertEquals("Test Hospital", result.get(0).getName());
    }

    @Test
    @DisplayName("Should get all verified hospitals")
    void testGetAllVerifiedHospitals() {
        when(hospitalRepository.findAllByIsVerifiedTrue()).thenReturn(Collections.singletonList(testHospital));

        List<Hospital> result = hospitalService.getAllVerifiedHospitals();

        assertNotNull(result);
        verify(hospitalRepository, times(1)).findAllByIsVerifiedTrue();
    }

    @Test
    @DisplayName("Should search hospitals by name")
    void testSearchHospitalsByName() {
        when(hospitalRepository.findByNameContainingIgnoreCase("Test"))
                .thenReturn(Collections.singletonList(testHospital));

        List<Hospital> result = hospitalService.searchHospitalsByName("Test");

        assertEquals(1, result.size());
    }

    @Test
    @DisplayName("Should update hospital information")
    void testUpdateHospital() {
        when(hospitalRepository.findById(hospitalId)).thenReturn(Optional.of(testHospital));
        when(hospitalRepository.findByEmail("hospital@test.com")).thenReturn(Optional.of(testHospital));
        when(hospitalRepository.save(any(Hospital.class))).thenReturn(testHospital);

        Hospital result = hospitalService.updateHospital(
                hospitalId,
                "Updated Hospital",
                "hospital@test.com",
                "9876543210",
                "123 Hospital St",
                "Test City",
                "TS",
                "12345",
                "Test Country"
        );

        assertNotNull(result);
        verify(hospitalRepository, times(1)).save(any(Hospital.class));
    }

    @Test
    @DisplayName("Should verify hospital")
    void testVerifyHospital() {
        when(hospitalRepository.findById(hospitalId)).thenReturn(Optional.of(testHospital));
        when(hospitalRepository.save(any(Hospital.class))).thenReturn(testHospital);

        Hospital result = hospitalService.verifyHospital(hospitalId);

        assertNotNull(result);
        verify(hospitalRepository, times(1)).save(any(Hospital.class));
    }

    @Test
    @DisplayName("Should deactivate hospital")
    void testDeactivateHospital() {
        when(hospitalRepository.findById(hospitalId)).thenReturn(Optional.of(testHospital));
        when(hospitalRepository.save(any(Hospital.class))).thenReturn(testHospital);

        hospitalService.deactivateHospital(hospitalId);

        verify(hospitalRepository, times(1)).save(any(Hospital.class));
    }

    @Test
    @DisplayName("Should check if hospital is verified")
    void testIsHospitalVerified() {
        testHospital.setIsVerified(true);
        when(hospitalRepository.findById(hospitalId)).thenReturn(Optional.of(testHospital));

        boolean result = hospitalService.isHospitalVerified(hospitalId);

        assertTrue(result);
    }

    @Test
    @DisplayName("Should update total blood units")
    void testUpdateTotalBloodUnits() {
        when(hospitalRepository.findById(hospitalId)).thenReturn(Optional.of(testHospital));
        when(hospitalRepository.save(any(Hospital.class))).thenReturn(testHospital);

        Hospital result = hospitalService.updateTotalBloodUnits(hospitalId, 100);

        assertNotNull(result);
        verify(hospitalRepository, times(1)).save(any(Hospital.class));
    }

    @Test
    @DisplayName("Should update blood bank coordinator")
    void testUpdateBloodBankCoordinator() {
        when(hospitalRepository.findById(hospitalId)).thenReturn(Optional.of(testHospital));
        when(hospitalRepository.save(any(Hospital.class))).thenReturn(testHospital);

        Hospital result = hospitalService.updateBloodBankCoordinator(
                hospitalId,
                "Coordinator Name",
                "coordinator@test.com",
                "9876543210"
        );

        assertNotNull(result);
        verify(hospitalRepository, times(1)).save(any(Hospital.class));
    }

    @Test
    @DisplayName("Should add hospital admin")
    void testAddHospitalAdmin() {
        when(hospitalRepository.findById(hospitalId)).thenReturn(Optional.of(testHospital));
        when(hospitalAdminRepository.findByEmail("admin@test.com")).thenReturn(Optional.empty());
        
        HospitalAdmin admin = new HospitalAdmin();
        admin.setId(UUID.randomUUID());
        admin.setHospital(testHospital);
        admin.setEmail("admin@test.com");
        admin.setFullName("Admin Name");
        admin.setPhone("1111111111");
        admin.setIsActive(true);

        when(hospitalAdminRepository.save(any(HospitalAdmin.class))).thenReturn(admin);
        when(hospitalRepository.save(any(Hospital.class))).thenReturn(testHospital);

        HospitalAdmin result = hospitalService.addHospitalAdmin(
                hospitalId,
                "admin@test.com",
                "Admin Name",
                "1111111111"
        );

        assertNotNull(result);
        assertEquals("admin@test.com", result.getEmail());
    }

    @Test
    @DisplayName("Should get hospital admins")
    void testGetHospitalAdmins() {
        List<HospitalAdmin> admins = new ArrayList<>();
        when(hospitalAdminRepository.findByHospitalId(hospitalId)).thenReturn(admins);

        List<HospitalAdmin> result = hospitalService.getHospitalAdmins(hospitalId);

        assertNotNull(result);
        verify(hospitalAdminRepository, times(1)).findByHospitalId(hospitalId);
    }
}
