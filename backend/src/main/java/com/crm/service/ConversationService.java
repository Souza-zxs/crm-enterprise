package com.crm.service;

import com.crm.model.Conversation;
import com.crm.model.Message;
import com.crm.model.Lead;
import com.crm.repository.ConversationRepository;
import com.crm.repository.MessageRepository;
import com.crm.dto.ConversationDTO;
import com.crm.dto.MessageDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ConversationService {
    
    private final ConversationRepository conversationRepository;
    private final MessageRepository messageRepository;
    
    public ConversationDTO createConversation(Lead lead, Conversation.ConversationChannel channel) {
        Conversation conversation = new Conversation();
        conversation.setLead(lead);
        conversation.setChannel(channel);
        conversation.setStatus("ACTIVE");
        
        Conversation saved = conversationRepository.save(conversation);
        return convertToDTO(saved);
    }
    
    public MessageDTO addMessage(Long conversationId, String content, Message.MessageDirection direction, String senderName, String senderPhone) {
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));
        
        Message message = new Message();
        message.setConversation(conversation);
        message.setContent(content);
        message.setDirection(direction);
        message.setStatus(Message.MessageStatus.RECEIVED);
        message.setSenderName(senderName);
        message.setSenderPhone(senderPhone);
        
        Message saved = messageRepository.save(message);
        
        conversation.setUpdatedAt(LocalDateTime.now());
        conversationRepository.save(conversation);
        
        return convertMessageToDTO(saved);
    }
    
    public ConversationDTO getConversationById(Long id) {
        Conversation conversation = conversationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));
        return convertToDTO(conversation);
    }
    
    public List<ConversationDTO> getConversationsByLead(Lead lead) {
        return conversationRepository.findByLeadOrderByCreatedAtDesc(lead)
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public void closeConversation(Long conversationId) {
        Conversation conversation = conversationRepository.findById(conversationId)
                .orElseThrow(() -> new RuntimeException("Conversation not found"));
        conversation.setStatus("CLOSED");
        conversation.setClosedAt(LocalDateTime.now());
        conversationRepository.save(conversation);
    }
    
    private ConversationDTO convertToDTO(Conversation conversation) {
        List<MessageDTO> messages = conversation.getMessages()
                .stream()
                .map(this::convertMessageToDTO)
                .collect(Collectors.toList());
        
        return ConversationDTO.builder()
                .id(conversation.getId())
                .leadId(conversation.getLead().getId())
                .leadName(conversation.getLead().getName())
                .leadPhone(conversation.getLead().getPhone())
                .channel(conversation.getChannel())
                .status(conversation.getStatus())
                .messages(messages)
                .createdAt(conversation.getCreatedAt())
                .updatedAt(conversation.getUpdatedAt())
                .closedAt(conversation.getClosedAt())
                .build();
    }
    
    private MessageDTO convertMessageToDTO(Message message) {
        return MessageDTO.builder()
                .id(message.getId())
                .conversationId(message.getConversation().getId())
                .content(message.getContent())
                .direction(message.getDirection())
                .status(message.getStatus())
                .senderName(message.getSenderName())
                .senderPhone(message.getSenderPhone())
                .createdAt(message.getCreatedAt())
                .build();
    }
}
