package com.setec.backend.Config;

import com.setec.backend.Service.RoleService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component
@Profile("!test")
public class DataInitializer implements CommandLineRunner {

    private final RoleService roleService;

    public DataInitializer(RoleService roleService) {
        this.roleService = roleService;
    }

    @Override
    public void run(String... args) throws Exception {
        log.info("=== Starting Data Initialization ===");
        
        try {
            // Initialize roles with permissions
            // RoleService handles permission creation internally with its own @Transactional
            roleService.initializeDefaultRoles();
            
            log.info("=== Data Initialization Completed Successfully ===");
        } catch (Exception e) {
            // Log error but don't fail startup - allows API to work even if init fails
            log.warn("Data initialization error: {}", e.getMessage());
            log.debug("Full error:", e);
        }
    }
}
