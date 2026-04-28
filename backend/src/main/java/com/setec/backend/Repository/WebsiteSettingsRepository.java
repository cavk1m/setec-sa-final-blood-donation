package com.setec.backend.Repository;

import com.setec.backend.Model.website_settings;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface WebsiteSettingsRepository extends JpaRepository<website_settings, UUID> {
}