package com.bank.bank_app.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bank.bank_app.dto.CustomerDashboardResponse;
import com.bank.bank_app.entity.Account;
import com.bank.bank_app.entity.Transaction;
import com.bank.bank_app.entity.User;
import com.bank.bank_app.repository.AccountRepository;
import com.bank.bank_app.repository.TransactionRepository;

@Service
public class CustomerDashboardService {

	private final AccountRepository accountRepository;
	private final TransactionRepository transactionRepository;

	public CustomerDashboardService(AccountRepository accountRepository, TransactionRepository transactionRepository) {

		this.accountRepository = accountRepository;
		this.transactionRepository = transactionRepository;
	}

	public CustomerDashboardResponse getDashboard(Long userId) {

		Account account = accountRepository.findByUser_Id(userId)
				.orElseThrow(() -> new RuntimeException("Account not found"));

		User user = account.getUser();

		List<Transaction> transactions = transactionRepository
				.findTop10ByAccountIdOrderByCreatedAtDesc(account.getId());

		List<CustomerDashboardResponse.TransactionResponse> transactionResponses = transactions.stream()
				.map(transaction -> new CustomerDashboardResponse.TransactionResponse(transaction.getType().name(),
						transaction.getAmount(), transaction.getBalanceAfter(), transaction.getRemarks(),
						transaction.getCreatedAt()))
				.toList();

		return new CustomerDashboardResponse(user.getUserId(), user.getName(), account.getAccountNumber(),
				account.getAccountType(), account.getBalance(), account.getCurrency(), transactionResponses);
	}
}