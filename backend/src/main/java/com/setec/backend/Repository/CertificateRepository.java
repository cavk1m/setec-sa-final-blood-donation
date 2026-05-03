package com.setec.backend.Repository;

import com.setec.backend.Model.certificates;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface CertificateRepository extends JpaRepository<certificates, UUID> {

    @Query("SELECT c FROM certificates c LEFT JOIN FETCH c.user WHERE c.user.id = :userId ORDER BY c.created_at DESC")
    List<certificates> findByUserId(@Param("userId") UUID userId);

    @Query("SELECT c FROM certificates c LEFT JOIN FETCH c.user WHERE c.id = :id AND c.user.id = :userId")
    Optional<certificates> findByIdAndUserId(@Param("id") UUID id, @Param("userId") UUID userId);

    // ADD THIS
    @Query("SELECT c FROM certificates c LEFT JOIN FETCH c.user ORDER BY c.created_at DESC")
    List<certificates> findAllWithUser();
}