package com.crm.repository;

import com.crm.model.Conversation;
import com.crm.model.Lead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ConversationRepository extends JpaRepository<Conversation, Long> {
    List<Conversation> findByLead(Lead lead);
    Optional<Conversation> findByLeadAndStatus(Lead lead, String status);
    List<Conversation> findByLeadOrderByCreatedAtDesc(Lead lead);
}
