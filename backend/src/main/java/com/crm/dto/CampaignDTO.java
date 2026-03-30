package com.crm.dto;

import com.crm.model.Campaign;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CampaignDTO {
    private Long id;
    private String name;
    private String description;
    private Campaign.CampaignSource source;
    private String status;
    private Double budget;
    private Double spent;
    private Integer impressions;
    private Integer clicks;
    private Integer leads;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime startedAt;
    private LocalDateTime endedAt;
}
