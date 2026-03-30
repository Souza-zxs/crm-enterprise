package com.crm.service;

import com.crm.model.Campaign;
import com.crm.model.Company;
import com.crm.repository.CampaignRepository;
import com.crm.dto.CampaignDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CampaignService {
    
    private final CampaignRepository campaignRepository;
    
    public CampaignDTO createCampaign(CampaignDTO campaignDTO, Company company) {
        Campaign campaign = new Campaign();
        campaign.setName(campaignDTO.getName());
        campaign.setDescription(campaignDTO.getDescription());
        campaign.setCompany(company);
        campaign.setSource(campaignDTO.getSource());
        campaign.setBudget(campaignDTO.getBudget());
        campaign.setStatus("ACTIVE");
        campaign.setStartedAt(LocalDateTime.now());
        
        Campaign saved = campaignRepository.save(campaign);
        return convertToDTO(saved);
    }
    
    public CampaignDTO updateCampaign(Long id, CampaignDTO campaignDTO) {
        Campaign campaign = campaignRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Campaign not found"));
        
        campaign.setName(campaignDTO.getName());
        campaign.setDescription(campaignDTO.getDescription());
        campaign.setSource(campaignDTO.getSource());
        campaign.setBudget(campaignDTO.getBudget());
        campaign.setSpent(campaignDTO.getSpent());
        campaign.setImpressions(campaignDTO.getImpressions());
        campaign.setClicks(campaignDTO.getClicks());
        campaign.setLeads(campaignDTO.getLeads());
        campaign.setUpdatedAt(LocalDateTime.now());
        
        Campaign updated = campaignRepository.save(campaign);
        return convertToDTO(updated);
    }
    
    public void deleteCampaign(Long id) {
        campaignRepository.deleteById(id);
    }
    
    public CampaignDTO getCampaignById(Long id) {
        Campaign campaign = campaignRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Campaign not found"));
        return convertToDTO(campaign);
    }
    
    public List<CampaignDTO> getCampaignsByCompany(Company company) {
        return campaignRepository.findByCompany(company)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    private CampaignDTO convertToDTO(Campaign campaign) {
        return CampaignDTO.builder()
                .id(campaign.getId())
                .name(campaign.getName())
                .description(campaign.getDescription())
                .source(campaign.getSource())
                .status(campaign.getStatus())
                .budget(campaign.getBudget())
                .spent(campaign.getSpent())
                .impressions(campaign.getImpressions())
                .clicks(campaign.getClicks())
                .leads(campaign.getLeads())
                .createdAt(campaign.getCreatedAt())
                .updatedAt(campaign.getUpdatedAt())
                .startedAt(campaign.getStartedAt())
                .endedAt(campaign.getEndedAt())
                .build();
    }
}
