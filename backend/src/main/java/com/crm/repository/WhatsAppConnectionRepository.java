package com.crm.repository;

import com.crm.model.WhatsAppConnection;
import com.crm.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface WhatsAppConnectionRepository extends JpaRepository<WhatsAppConnection, Long> {
    List<WhatsAppConnection> findByCompany(Company company);
    Optional<WhatsAppConnection> findByPhoneNumber(String phoneNumber);
    Optional<WhatsAppConnection> findByBusinessAccountId(String businessAccountId);
}
