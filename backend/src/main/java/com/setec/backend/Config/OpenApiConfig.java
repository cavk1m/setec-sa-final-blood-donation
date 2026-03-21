package com.setec.backend.Config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.Components;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * OpenAPI/Swagger Configuration for Blood Donation System API
 * 
 * Provides API documentation accessible at:
 * - Swagger UI: http://localhost:8081/swagger-ui.html
 * - OpenAPI JSON: http://localhost:8081/v3/api-docs
 * - OpenAPI YAML: http://localhost:8081/v3/api-docs.yaml
 */
@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Blood Donation Management System API")
                        .version("1.0.0")
                        .description("Comprehensive REST API for managing blood donations with Role-Based Access Control (RBAC), OTP verification, and JWT authentication")
                        .contact(new Contact()
                                .name("SETEC Blood Donation System")
                                .url("https://github.com/anomalyco/opencode")
                                .email("support@setec.com"))
                        .license(new License()
                                .name("Apache 2.0")
                                .url("https://www.apache.org/licenses/LICENSE-2.0.html")))
                .components(new Components()
                        .addSecuritySchemes("bearerAuth", new SecurityScheme()
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .description("JWT token obtained after email verification via OTP")))
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"));
    }
}
