package com.setec.backend.Config;

import com.setec.backend.Enum.PermissionType;
import com.setec.backend.Enum.RoleType;
import com.setec.backend.Service.PermissionService;
import com.setec.backend.Service.RoleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@Profile("!test")
public class DataInitializer implements CommandLineRunner {

    private final PermissionService permissionService;
    private final RoleService roleService;

    public DataInitializer(PermissionService permissionService, RoleService roleService) {
        this.permissionService = permissionService;
        this.roleService = roleService;
    }

    @Override
    public void run(String... args) throws Exception {
        log.info("=== Starting Data Initialization ===");
        
        try {
            // Initialize permissions
            initializePermissions();
            
            // Initialize roles with permissions
            roleService.initializeDefaultRoles();
            
            log.info("=== Data Initialization Completed Successfully ===");
        } catch (Exception e) {
            log.error("Error during data initialization", e);
            throw e;
        }
    }

    private void initializePermissions() {
        log.info("Initializing permissions...");
        
        for (PermissionType permType : PermissionType.values()) {
            if (!permissionService.permissionExists(permType)) {
                permissionService.createPermission(
                        permType,
                        permType.getDescription(),
                        permType.getResourceName(),
                        permType.getAction()
                );
                log.debug("Created permission: {}", permType.name());
            }
        }
        
        log.info("Permissions initialization completed");
    }
}
