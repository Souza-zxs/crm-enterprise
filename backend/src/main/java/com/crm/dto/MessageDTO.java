package com.crm.dto;

import com.crm.model.Message;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MessageDTO {
    private Long id;
    private Long conversationId;
    private String content;
    private Message.MessageDirection direction;
    private Message.MessageStatus status;
    private String senderName;
    private String senderPhone;
    private LocalDateTime createdAt;
}
