package com.setec.backend.Model;

import com.setec.backend.Enum.PermissionType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.util.Set;
import java.util.UUID;

@EqualsAndHashCode(callSuper = true)
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name = "permissions", indexes = {
    @Index(name = "idx_permissions_type", columnList = "permission_type")
})
public class Permission extends BaseEntity {
    
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
        name = "UUID",
        strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "id", updatable = false, nullable = false, columnDefinition = "UUID")
    private UUID id;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "permission_type", unique = true, nullable = false)
    private PermissionType permissionType;
    
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "resource_name", nullable = false)
    private String resourceName;
    
    @Column(name = "action", nullable = false)
    private String action;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    @ManyToMany(mappedBy = "permissions", fetch = FetchType.LAZY)
    private Set<UserRole> userRoles;
    
    public Permission(PermissionType permissionType, String description, String resourceName, String action) {
        this.permissionType = permissionType;
        this.description = description;
        this.resourceName = resourceName;
        this.action = action;
        this.isActive = true;
    }
}
