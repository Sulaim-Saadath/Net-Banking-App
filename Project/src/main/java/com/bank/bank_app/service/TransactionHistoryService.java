package com.bank.bank_app.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bank.bank_app.dto.TransactionHistoryResponse;
import com.bank.bank_app.entity.Account;
import com.bank.bank_app.entity.Transaction;
import com.bank.bank_app.repository.AccountRepository;
import com.bank.bank_app.repository.TransactionRepository;

@Service
public class TransactionHistoryService {

    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    public TransactionHistoryService(
            AccountRepository accountRepository,
            TransactionRepository transactionRepository) {

        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
    }

    public List<TransactionHistoryResponse> getTransactions(Long userId) {

        Account account = accountRepository
                .findByUser_Id(userId)
                .orElseThrow(() -> new RuntimeException("Account not found"));

        List<Transaction> transactions =
                transactionRepository
                        .findByAccountIdOrderByCreatedAtDesc(account.getId());

        return transactions.stream()
                .map(transaction -> new TransactionHistoryResponse(
                        transaction.getType().name(),
                        transaction.getAmount(),
                        transaction.getBalanceAfter(),
                        transaction.getRemarks(),
                        transaction.getCreatedAt()
                ))
                .toList();
    }
}