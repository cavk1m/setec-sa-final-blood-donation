package com.setec.backend.Repository;

import com.setec.backend.Model.DonationQueue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DonationQueueRepository extends JpaRepository<DonationQueue, UUID> {

    @Query("SELECT q FROM DonationQueue q LEFT JOIN FETCH q.location WHERE q.userId = :userId ORDER BY q.createdAt DESC LIMIT 1")
    Optional<DonationQueue> findFirstByUserIdWithLocation(@Param("userId") UUID userId);

    @Query("SELECT MAX(q.queueNumber) FROM DonationQueue q WHERE q.locationId = :locationId")
    Integer findMaxQueueNumberByLocationId(@Param("locationId") UUID locationId);

    List<DonationQueue> findAllByLocationIdAndStatusOrderByQueueNumberAsc(UUID locationId, String status);
}