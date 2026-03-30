package com.crm.repository;

import com.crm.model.Lead;
import com.crm.model.Company;
import com.crm.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface LeadRepository extends JpaRepository<Lead, Long> {
    List<Lead> findByCompany_entity(Company company);
    List<Lead> findByCompany_entityAndStage(Company company, Lead.FunnelStage stage);
    List<Lead> findByAssignedTo(User user);
    List<Lead> findByCompany_entityAndAssignedTo(Company company, User user);
    
    @Query("SELECT COUNT(l) FROM Lead l WHERE l.company_entity = ?1 AND l.stage = ?2")
    long countByCompanyAndStage(Company company, Lead.FunnelStage stage);
}
