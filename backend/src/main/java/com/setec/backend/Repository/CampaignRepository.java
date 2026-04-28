package com.setec.backend.Repository;

import com.setec.backend.Model.campaigns;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CampaignRepository extends JpaRepository<campaigns, UUID> {
}