package com.setec.backend.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WebsiteSettingsResponse {
    @JsonProperty("id")
    private UUID id;

    @JsonProperty("hero_background_url")
    private String heroBackgroundUrl;

    @JsonProperty("logo_url")
    private String logoUrl;

    @JsonProperty("updated_at")
    private LocalDateTime updatedAt;
}
