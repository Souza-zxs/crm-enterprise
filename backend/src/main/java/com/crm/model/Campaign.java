package com.crm.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "campaigns")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Campaign {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;
    
    @Enumerated(EnumType.STRING)
    private CampaignSource source = CampaignSource.FACEBOOK;
    
    private String externalId;
    private String externalUrl;
    
    @Column(nullable = false)
    private String status = "ACTIVE";
    
    private Double budget;
    private Double spent;
    private Integer impressions = 0;
    private Integer clicks = 0;
    private Integer leads = 0;
    
    @OneToMany(mappedBy = "campaign", cascade = CascadeType.ALL)
    private Set<Lead> campaignLeads = new HashSet<>();
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
    
    @Column(name = "started_at")
    private LocalDateTime startedAt;
    
    @Column(name = "ended_at")
    private LocalDateTime endedAt;
    
    public enum CampaignSource {
        FACEBOOK, GOOGLE_ADS, INSTAGRAM, TIKTOK, LINKEDIN, OTHER
    }
}
