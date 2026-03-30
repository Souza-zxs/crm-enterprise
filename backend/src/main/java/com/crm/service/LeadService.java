package com.crm.service;

import com.crm.model.Lead;
import com.crm.model.Company;
import com.crm.model.User;
import com.crm.repository.LeadRepository;
import com.crm.dto.LeadDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class LeadService {
    
    private final LeadRepository leadRepository;
    
    public LeadDTO createLead(LeadDTO leadDTO, Company company) {
        Lead lead = new Lead();
        lead.setName(leadDTO.getName());
        lead.setEmail(leadDTO.getEmail());
        lead.setPhone(leadDTO.getPhone());
        lead.setWhatsappNumber(leadDTO.getWhatsappNumber());
        lead.setCompany(leadDTO.getCompany());
        lead.setCompany_entity(company);
        lead.setStage(Lead.FunnelStage.NEW);
        lead.setLastInteraction(LocalDateTime.now());
        
        Lead saved = leadRepository.save(lead);
        return convertToDTO(saved);
    }
    
    public LeadDTO updateLead(Long id, LeadDTO leadDTO, Company company) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead not found"));
        
        lead.setName(leadDTO.getName());
        lead.setEmail(leadDTO.getEmail());
        lead.setPhone(leadDTO.getPhone());
        lead.setWhatsappNumber(leadDTO.getWhatsappNumber());
        lead.setCompany(leadDTO.getCompany());
        lead.setStage(leadDTO.getStage());
        lead.setNotes(leadDTO.getNotes());
        lead.setValue(leadDTO.getValue());
        lead.setScore(leadDTO.getScore());
        lead.setUpdatedAt(LocalDateTime.now());
        lead.setLastInteraction(LocalDateTime.now());
        
        Lead updated = leadRepository.save(lead);
        return convertToDTO(updated);
    }
    
    public void deleteLead(Long id) {
        leadRepository.deleteById(id);
    }
    
    public LeadDTO getLeadById(Long id) {
        Lead lead = leadRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lead not found"));
        return convertToDTO(lead);
    }
    
    public List<LeadDTO> getLeadsByCompany(Company company) {
        return leadRepository.findByCompany_entity(company)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<LeadDTO> getLeadsByStage(Company company, Lead.FunnelStage stage) {
        return leadRepository.findByCompany_entityAndStage(company, stage)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public List<LeadDTO> getLeadsByUser(User user) {
        return leadRepository.findByAssignedTo(user)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public void assignLeadToUser(Long leadId, User user) {
        Lead lead = leadRepository.findById(leadId)
                .orElseThrow(() -> new RuntimeException("Lead not found"));
        lead.setAssignedTo(user);
        lead.setUpdatedAt(LocalDateTime.now());
        leadRepository.save(lead);
    }
    
    public void moveLeadToStage(Long leadId, Lead.FunnelStage stage) {
        Lead lead = leadRepository.findById(leadId)
                .orElseThrow(() -> new RuntimeException("Lead not found"));
        lead.setStage(stage);
        lead.setUpdatedAt(LocalDateTime.now());
        lead.setLastInteraction(LocalDateTime.now());
        leadRepository.save(lead);
    }
    
    private LeadDTO convertToDTO(Lead lead) {
        return LeadDTO.builder()
                .id(lead.getId())
                .name(lead.getName())
                .email(lead.getEmail())
                .phone(lead.getPhone())
                .whatsappNumber(lead.getWhatsappNumber())
                .company(lead.getCompany())
                .assignedToId(lead.getAssignedTo() != null ? lead.getAssignedTo().getId() : null)
                .assignedToName(lead.getAssignedTo() != null ? lead.getAssignedTo().getName() : null)
                .campaignId(lead.getCampaign() != null ? lead.getCampaign().getId() : null)
                .campaignName(lead.getCampaign() != null ? lead.getCampaign().getName() : null)
                .stage(lead.getStage())
                .notes(lead.getNotes())
                .value(lead.getValue())
                .score(lead.getScore())
                .createdAt(lead.getCreatedAt())
                .updatedAt(lead.getUpdatedAt())
                .lastInteraction(lead.getLastInteraction())
                .build();
    }
}
