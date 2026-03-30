package com.crm.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "whatsapp_connections")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class WhatsAppConnection {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;
    
    @Column(nullable = false)
    private String phoneNumber;
    
    @Column(nullable = false, unique = true)
    private String businessAccountId;
    
    @Column(nullable = false)
    private String accessToken;
    
    private String webhookUrl;
    private String webhookToken;
    
    @Column(nullable = false)
    private String status = "ACTIVE";
    
    private String qrCode;
    
    @Column(name = "connected_at")
    private LocalDateTime connectedAt;
    
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();
}
