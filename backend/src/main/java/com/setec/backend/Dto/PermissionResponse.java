package com.setec.backend.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PermissionResponse {
    private UUID id;
    private String permissionType;
    private String description;
    private String resourceName;
    private String action;
    
    @JsonProperty("isActive")
    private Boolean isActive;
    
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
}
