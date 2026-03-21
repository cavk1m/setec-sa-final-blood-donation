package com.setec.backend.Repository;

import com.setec.backend.Model.users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<users, UUID> {

    Optional<users> findByEmail(String email);

    Optional<users> findByPhone(String phone);

    // Safe queries to avoid UUID casting issues with VARCHAR(255) UUID storage
    @Query("SELECT u FROM users u WHERE u.email = :email")
    Optional<users> findByEmailSafe(@Param("email") String email);
    
    @Query("SELECT u FROM users u WHERE u.phone = :phone")
    Optional<users> findByPhoneSafe(@Param("phone") String phone);

    // Custom count-based query to avoid UUID casting issues
    @Query("SELECT COUNT(u) > 0 FROM users u WHERE u.email = :email")
    boolean existsByEmailSafe(@Param("email") String email);
    
    // Custom count-based query to avoid UUID casting issues  
    @Query("SELECT COUNT(u) > 0 FROM users u WHERE u.phone = :phone")
    boolean existsByPhoneSafe(@Param("phone") String phone);

    boolean existsByEmail(String email);

    boolean existsByPhone(String phone);

    @Query("SELECT u FROM users u WHERE u.email = :email AND u.isActive = true")
    Optional<users> findActiveUserByEmail(@Param("email") String email);
}