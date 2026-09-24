package com.bank.bank_app.service;

import org.springframework.stereotype.Service;

import com.bank.bank_app.dto.CustomerProfileResponse;
import com.bank.bank_app.entity.Account;
import com.bank.bank_app.entity.User;
import com.bank.bank_app.repository.AccountRepository;

@Service
public class CustomerProfileService {

    private final AccountRepository accountRepository;

    public CustomerProfileService(AccountRepository accountRepository) {
        this.accountRepository = accountRepository;
    }

    public CustomerProfileResponse getProfile(Long userId) {

        Account account = accountRepository
                .findByUser_Id(userId)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        User user = account.getUser();

        return new CustomerProfileResponse(
                user.getUserId(),
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                account.getAccountNumber(),
                account.getAccountType(),
                account.getCurrency()
        );
    }
}