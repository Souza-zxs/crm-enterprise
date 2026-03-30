package com.crm.repository;

import com.crm.model.Campaign;
import com.crm.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign, Long> {
    List<Campaign> findByCompany(Company company);
    Optional<Campaign> findByExternalIdAndSource(String externalId, Campaign.CampaignSource source);
}
