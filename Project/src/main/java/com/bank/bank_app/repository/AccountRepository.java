package com.bank.bank_app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bank.bank_app.entity.Account;
import com.bank.bank_app.entity.User;

public interface AccountRepository extends JpaRepository<Account, Long> {

    Optional<Account> findByAccountNumber(String accountNumber);

    boolean existsByAccountNumber(String accountNumber);
    Optional<Account> findByUser_Id(Long userId);
    
    Optional<Account> findByUser(User user);
}