package com.setec.backend.Controller;

import com.setec.backend.Model.website_settings;
import com.setec.backend.Repository.WebsiteSettingsRepository;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/settings")
@RequiredArgsConstructor
@Tag(name = "Settings", description = "Website settings management")
public class SettingsController {

    private final WebsiteSettingsRepository settingsRepository;

    // GET /api/settings - public
    @GetMapping
    public ResponseEntity<?> getSettings() {
        try {
            List<website_settings> settings = settingsRepository.findAll();

            if (settings.isEmpty()) {
                return ResponseEntity.ok(Map.of(
                    "hero_background_url", "",
                    "logo_url", "",
                    "updated_at", ""
                ));
            }

            website_settings s = settings.get(0);
            return ResponseEntity.ok(Map.of(
                "hero_background_url", s.getHeroBackgroundUrl() != null ? s.getHeroBackgroundUrl() : "",
                "logo_url", s.getLogoUrl() != null ? s.getLogoUrl() : "",
                "updated_at", s.getUpdatedAt() != null ? s.getUpdatedAt().toString() : ""
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to fetch settings: " + e.getMessage()
            ));
        }
    }

    // PUT /api/settings - admin only
    @PutMapping
    @SecurityRequirement(name = "bearer-jwt")
    public ResponseEntity<?> updateSettings(@RequestBody Map<String, Object> request) {
        try {
            List<website_settings> existing = settingsRepository.findAll();

            website_settings settings;
            if (existing.isEmpty()) {
                settings = new website_settings();
            } else {
                settings = existing.get(0);
            }

            if (request.get("hero_background_url") != null) {
                settings.setHeroBackgroundUrl(request.get("hero_background_url").toString());
            }
            if (request.get("logo_url") != null) {
                settings.setLogoUrl(request.get("logo_url").toString());
            }

            website_settings saved = settingsRepository.save(settings);

            return ResponseEntity.ok(Map.of(
                "message", "Settings updated successfully",
                "settings", Map.of(
                    "hero_background_url", saved.getHeroBackgroundUrl() != null ? saved.getHeroBackgroundUrl() : "",
                    "logo_url", saved.getLogoUrl() != null ? saved.getLogoUrl() : "",
                    "updated_at", saved.getUpdatedAt() != null ? saved.getUpdatedAt().toString() : ""
                )
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to update settings: " + e.getMessage()
            ));
        }
    }
}