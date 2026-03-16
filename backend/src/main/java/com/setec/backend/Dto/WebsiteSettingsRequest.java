package com.setec.backend.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class WebsiteSettingsRequest {
    @JsonProperty("hero_background_url")
    private String heroBackgroundUrl;

    @JsonProperty("logo_url")
    private String logoUrl;
}
