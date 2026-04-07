package com.setec.backend.Repository;

import com.setec.backend.Enum.RoleType;
import com.setec.backend.Model.UserRole;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, UUID> {
    Optional<UserRole> findByRoleName(RoleType roleName);
    
    List<UserRole> findAllByIsActiveTrue();
}
