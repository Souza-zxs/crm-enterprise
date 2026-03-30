package com.crm.repository;

import com.crm.model.User;
import com.crm.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmailAndCompany(String email, Company company);
    Optional<User> findByEmail(String email);
    List<User> findByCompany(Company company);
    List<User> findByCompanyAndRole(Company company, User.UserRole role);
}
