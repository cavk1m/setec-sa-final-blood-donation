package com.setec.backend.Controller;

import com.setec.backend.Model.campaigns;
import com.setec.backend.Repository.CampaignRepository;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/campaigns")
@RequiredArgsConstructor
@Tag(name = "Campaigns", description = "Charity campaign management")
public class CampaignController {

    private final CampaignRepository campaignRepository;

    // GET /api/campaigns - public
    @GetMapping
    public ResponseEntity<?> getAllCampaigns() {
        try {
            List<campaigns> camps = campaignRepository.findAll();

            List<Map<String, Object>> list = camps.stream().map(c -> {
                Map<String, Object> map = new HashMap<>();
                map.put("id", c.getId());
                map.put("title", c.getTitle());
                map.put("description", c.getDescription());
                map.put("target_amount", c.getTargetAmount());
                map.put("current_amount", c.getCurrentAmount());
                map.put("image_url", c.getImageUrl() != null ? c.getImageUrl() : "");
                map.put("campaign_type", c.getCampaignType() != null ? c.getCampaignType() : "blood");
                int progress = 0;
                if (c.getTargetAmount() != null && c.getTargetAmount().compareTo(BigDecimal.ZERO) > 0) {
                    progress = c.getCurrentAmount()
                        .multiply(BigDecimal.valueOf(100))
                        .divide(c.getTargetAmount(), 0, java.math.RoundingMode.DOWN)
                        .intValue();
                }
                map.put("progress_percent", progress);
                map.put("created_at", c.getCreatedAt());
                return map;
            }).collect(Collectors.toList());

            return ResponseEntity.ok(Map.of("campaigns", list));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to fetch campaigns: " + e.getMessage()
            ));
        }
    }

    // POST /api/campaigns - admin only
    @PostMapping
    @SecurityRequirement(name = "bearer-jwt")
    public ResponseEntity<?> createCampaign(@RequestBody Map<String, Object> request) {
        try {
            campaigns campaign = new campaigns();
            campaign.setTitle((String) request.get("title"));
            campaign.setDescription((String) request.get("description"));
            campaign.setTargetAmount(new BigDecimal(request.get("target_amount").toString()));
            campaign.setCurrentAmount(BigDecimal.ZERO);
            if (request.get("image_url") != null) campaign.setImageUrl(request.get("image_url").toString());
            if (request.get("campaign_type") != null) campaign.setCampaignType(request.get("campaign_type").toString());

            campaigns saved = campaignRepository.save(campaign);

            return ResponseEntity.status(HttpStatus.CREATED).body(Map.of(
                "message", "Campaign created successfully",
                "campaign", Map.of(
                    "id", saved.getId(),
                    "title", saved.getTitle(),
                    "target_amount", saved.getTargetAmount(),
                    "current_amount", saved.getCurrentAmount(),
                    "image_url", saved.getImageUrl() != null ? saved.getImageUrl() : "",
                    "campaign_type", saved.getCampaignType() != null ? saved.getCampaignType() : "blood"
                )
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to create campaign: " + e.getMessage()
            ));
        }
    }

    // PUT /api/campaigns/{id} - admin only
    @PutMapping("/{id}")
    @SecurityRequirement(name = "bearer-jwt")
    public ResponseEntity<?> updateCampaign(
            @PathVariable String id,
            @RequestBody Map<String, Object> request) {
        try {
            campaigns campaign = campaignRepository.findById(UUID.fromString(id)).orElse(null);

            if (campaign == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "success", false,
                    "message", "Campaign not found"
                ));
            }

            if (request.get("title") != null) campaign.setTitle((String) request.get("title"));
            if (request.get("description") != null) campaign.setDescription((String) request.get("description"));
            if (request.get("target_amount") != null) campaign.setTargetAmount(new BigDecimal(request.get("target_amount").toString()));
            if (request.get("image_url") != null) campaign.setImageUrl(request.get("image_url").toString());
            if (request.get("campaign_type") != null) campaign.setCampaignType(request.get("campaign_type").toString());

            campaigns updated = campaignRepository.save(campaign);

            return ResponseEntity.ok(Map.of(
                "message", "Campaign updated successfully",
                "campaign", Map.of(
                    "id", updated.getId(),
                    "title", updated.getTitle(),
                    "target_amount", updated.getTargetAmount(),
                    "image_url", updated.getImageUrl() != null ? updated.getImageUrl() : "",
                    "campaign_type", updated.getCampaignType() != null ? updated.getCampaignType() : "blood"
                )
            ));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to update campaign: " + e.getMessage()
            ));
        }
    }

    // DELETE /api/campaigns/{id} - admin only
    @DeleteMapping("/{id}")
    @SecurityRequirement(name = "bearer-jwt")
    public ResponseEntity<?> deleteCampaign(@PathVariable String id) {
        try {
            campaigns campaign = campaignRepository.findById(UUID.fromString(id)).orElse(null);

            if (campaign == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of(
                    "success", false,
                    "message", "Campaign not found"
                ));
            }

            campaignRepository.delete(campaign);

            return ResponseEntity.ok(Map.of("message", "Campaign deleted successfully"));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "success", false,
                "message", "Failed to delete campaign: " + e.getMessage()
            ));
        }
    }
}