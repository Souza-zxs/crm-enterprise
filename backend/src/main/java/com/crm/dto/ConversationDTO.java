package com.crm.dto;

import com.crm.model.Conversation;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConversationDTO {
    private Long id;
    private Long leadId;
    private String leadName;
    private String leadPhone;
    private Conversation.ConversationChannel channel;
    private String status;
    private List<MessageDTO> messages;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime closedAt;
}
