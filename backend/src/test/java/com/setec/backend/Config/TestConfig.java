package com.setec.backend.Config;

import com.setec.backend.Service.EmailService;
import com.setec.backend.Service.EmailServiceInterface;
import org.mockito.Mockito;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.Profile;

/**
 * Test configuration that provides mock beans for services
 * that are excluded from test profile (@Profile("!test"))
 */
@TestConfiguration
@Profile("test")
public class TestConfig {

    /**
     * Provide a mock EmailService for test profile
     * since EmailService has @Profile("!test")
     */
    @Bean
    @Primary
    public EmailServiceInterface emailService() {
        return Mockito.mock(EmailServiceInterface.class);
    }
}
