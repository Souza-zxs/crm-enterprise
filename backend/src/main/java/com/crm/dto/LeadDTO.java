package com.crm.dto;

import com.crm.model.Lead;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LeadDTO {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String whatsappNumber;
    private String company;
    private Long assignedToId;
    private String assignedToName;
    private Long campaignId;
    private String campaignName;
    private Lead.FunnelStage stage;
    private String notes;
    private Double value;
    private Integer score;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime lastInteraction;
}
