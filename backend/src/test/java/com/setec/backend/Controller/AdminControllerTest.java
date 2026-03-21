package com.setec.backend.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.setec.backend.Enum.PermissionType;
import com.setec.backend.Enum.RoleType;
import com.setec.backend.Model.Hospital;
import com.setec.backend.Model.Permission;
import com.setec.backend.Model.UserRole;
import com.setec.backend.Service.HospitalService;
import com.setec.backend.Service.PermissionService;
import com.setec.backend.Service.RoleService;
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
@DisplayName("AdminController Tests")
class AdminControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private HospitalService hospitalService;

    @MockBean
    private RoleService roleService;

    @MockBean
    private PermissionService permissionService;

    @Autowired
    private ObjectMapper objectMapper;

    private Hospital testHospital;
    private UserRole testRole;
    private Permission testPermission;
    private UUID hospitalId;
    private UUID roleId;
    private UUID permissionId;

    @BeforeEach
    void setUp() {
        hospitalId = UUID.randomUUID();
        roleId = UUID.randomUUID();
        permissionId = UUID.randomUUID();

        testHospital = new Hospital();
        testHospital.setId(hospitalId);
        testHospital.setName("Test Hospital");
        testHospital.setEmail("hospital@test.com");
        testHospital.setIsActive(true);
        testHospital.setIsVerified(false);

        testPermission = new Permission();
        testPermission.setId(permissionId);
        testPermission.setPermissionType(PermissionType.USER_CREATE);
        testPermission.setDescription("Create Users");
        testPermission.setResourceName("users");
        testPermission.setAction("create");
        testPermission.setIsActive(true);

        testRole = new UserRole();
        testRole.setId(roleId);
        testRole.setRoleName(RoleType.ADMIN);
        testRole.setDescription("Administrator");
        testRole.setIsActive(true);
        testRole.setPermissions(new HashSet<>(Collections.singletonList(testPermission)));
    }

    @Test
    @DisplayName("Should get all hospitals")
    void testGetAllHospitals() throws Exception {
        when(hospitalService.getAllActiveHospitals()).thenReturn(Collections.singletonList(testHospital));

        mockMvc.perform(get("/api/admin/hospitals")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Test Hospital"));
    }

    @Test
    @DisplayName("Should get hospital by ID")
    void testGetHospital() throws Exception {
        when(hospitalService.getHospitalById(hospitalId)).thenReturn(Optional.of(testHospital));

        mockMvc.perform(get("/api/admin/hospitals/{id}", hospitalId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Test Hospital"));
    }

    @Test
    @DisplayName("Should verify hospital")
    void testVerifyHospital() throws Exception {
        testHospital.setIsVerified(true);
        when(hospitalService.verifyHospital(hospitalId)).thenReturn(testHospital);

        mockMvc.perform(put("/api/admin/hospitals/{id}/verify", hospitalId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.isVerified").value(true));
    }

    @Test
    @DisplayName("Should get all roles")
    void testGetAllRoles() throws Exception {
        when(roleService.getAllRoles()).thenReturn(Collections.singletonList(testRole));

        mockMvc.perform(get("/api/admin/roles")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].roleName").value("ADMIN"));
    }

    @Test
    @DisplayName("Should get role by ID")
    void testGetRole() throws Exception {
        when(roleService.getRoleById(roleId)).thenReturn(Optional.of(testRole));

        mockMvc.perform(get("/api/admin/roles/{id}", roleId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.roleName").value("ADMIN"));
    }

    @Test
    @DisplayName("Should get all permissions")
    void testGetAllPermissions() throws Exception {
        when(permissionService.getAllPermissions()).thenReturn(Collections.singletonList(testPermission));

        mockMvc.perform(get("/api/admin/permissions")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].permissionType").value("USER_CREATE"));
    }

    @Test
    @DisplayName("Should get role permissions")
    void testGetRolePermissions() throws Exception {
        when(roleService.getRolePermissions(roleId)).thenReturn(new HashSet<>(Collections.singletonList(testPermission)));

        mockMvc.perform(get("/api/admin/roles/{id}/permissions", roleId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].permissionType").value("USER_CREATE"));
    }
}
