package com.bank.bank_app.service;

import com.bank.bank_app.dto.TellerTransactionResponse;
import com.bank.bank_app.entity.Account;
import com.bank.bank_app.entity.Transaction;
import com.bank.bank_app.entity.User;
import com.bank.bank_app.repository.AccountRepository;
import com.bank.bank_app.repository.TransactionRepository;
import com.bank.bank_app.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class TellerService {
	private final UserRepository userRepository;
	private final AccountRepository accountRepository;
	private final TransactionRepository transactionRepository;

	public TellerService(UserRepository userRepository, AccountRepository accountRepository,
			TransactionRepository transactionRepository) {

		this.userRepository = userRepository;
		this.accountRepository = accountRepository;
		this.transactionRepository = transactionRepository;
	}

	public Map<String, Object> getCustomerByUserId(String userId) {

		User user = userRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("Customer not found"));

		if (user.getRole() == null || !user.getRole().name().equals("CUSTOMER")) {

			throw new RuntimeException("User is not a customer");
		}

		Account account = accountRepository.findByUser(user).orElse(null);

		Map<String, Object> response = new HashMap<>();

		response.put("userId", user.getUserId());
		response.put("name", user.getName());
		response.put("phone", user.getPhone());
		response.put("email", user.getEmail());
		response.put("active", user.isActive());

		if (account != null) {
			response.put("accountNumber", account.getAccountNumber());
			response.put("balance", account.getBalance());
		}

		return response;
	}

	public List<TellerTransactionResponse> getCustomerTransactions(
	        String userId) {

	    User user = userRepository.findByUserId(userId)
	            .orElseThrow(() ->
	                    new RuntimeException("Customer not found"));

	    if (user.getRole() == null ||
	            !user.getRole().name().equals("CUSTOMER")) {

	        throw new RuntimeException("User is not a customer");
	    }

	    Account account = accountRepository.findByUser(user)
	            .orElseThrow(() ->
	                    new RuntimeException("Account not found"));

	    List<Transaction> transactions =
	            transactionRepository
	                    .findByAccountIdOrderByCreatedAtDesc(account.getId());

	    return transactions.stream()
	            .map(transaction -> new TellerTransactionResponse(
	                    transaction.getId(),
	                    account.getAccountNumber(),
	                    transaction.getAmount(),
	                    transaction.getType().name(),
	                    transaction.getBalanceAfter(),
	                    transaction.getRemarks(),
	                    transaction.getCreatedAt()
	            ))
	            .toList();
	}
}