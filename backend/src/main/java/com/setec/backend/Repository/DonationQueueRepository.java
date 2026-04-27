package com.setec.backend.Repository;

import com.setec.backend.Model.DonationQueue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;
import java.util.List;

@Repository
public interface DonationQueueRepository extends JpaRepository<DonationQueue, String> {
    
    Optional<DonationQueue> findFirstByUserIdOrderByCreatedAtDesc(UUID userId);
    
    @Query("SELECT MAX(q.queueNumber) FROM DonationQueue q WHERE q.locationId = :locationId")
    Integer findMaxQueueNumberByLocationId(@Param("locationId") String locationId);
    
    List<DonationQueue> findAllByLocationIdAndStatusOrderByQueueNumberAsc(String locationId, String status);

    // ADD inside the interface, before the closing }
   @Query("SELECT q FROM DonationQueue q LEFT JOIN FETCH q.location WHERE q.userId = :userId ORDER BY q.createdAt DESC LIMIT 1")
Optional<DonationQueue> findFirstByUserIdWithLocation(@Param("userId") UUID userId);
}