package com.setec.backend.Dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoleResponse {
    private UUID id;
    private String roleName;
    private String description;
    
    @JsonProperty("isActive")
    private Boolean isActive;
    
    private Set<PermissionResponse> permissions;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
}
