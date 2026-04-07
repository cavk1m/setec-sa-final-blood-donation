package com.setec.backend.Repository;

import com.setec.backend.Enum.PermissionType;
import com.setec.backend.Model.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface PermissionRepository extends JpaRepository<Permission, UUID> {
    Optional<Permission> findByPermissionType(PermissionType permissionType);
    
    List<Permission> findAllByIsActiveTrue();
    
    List<Permission> findByResourceName(String resourceName);
}
