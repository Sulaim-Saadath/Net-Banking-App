package com.bank.bank_app.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.bank.bank_app.dto.AdminAccountResponse;
import com.bank.bank_app.dto.AdminAuditLogResponse;
import com.bank.bank_app.dto.AdminTransactionResponse;
import com.bank.bank_app.dto.AdminUserDetailsResponse;
import com.bank.bank_app.dto.AdminUserResponse;
import com.bank.bank_app.dto.AdminUserStatusRequest;
import com.bank.bank_app.entity.Account;
import com.bank.bank_app.entity.AuditLog;
import com.bank.bank_app.entity.User;
import com.bank.bank_app.repository.AccountRepository;
import com.bank.bank_app.repository.AuditLogRepository;
import com.bank.bank_app.repository.TransactionRepository;
import com.bank.bank_app.repository.UserRepository;

@Service
public class AdminService {

	private final UserRepository userRepository;
	private final AccountRepository accountRepository;
	private final TransactionRepository transactionRepository;
	private final AuditLogRepository auditLogRepository;

	public AdminService(UserRepository userRepository, AccountRepository accountRepository,
			TransactionRepository transactionRepository, AuditLogRepository auditLogRepository) {

		this.userRepository = userRepository;
		this.accountRepository = accountRepository;
		this.transactionRepository = transactionRepository;
		this.auditLogRepository = auditLogRepository;
	}

	public List<AdminUserResponse> getAllUsers() {

		return userRepository.findAll().stream().map(this::mapToResponse).toList();
	}

	private AdminUserResponse mapToResponse(User user) {

		return new AdminUserResponse(user.getId(), user.getUserId(), user.getName(), user.getPhone(), user.getEmail(),
				user.getRole(), user.isActive(), user.getCreatedAt());
	}

	public AdminUserDetailsResponse getUserDetails(String userId) {

		User user = userRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("User not found"));

		return new AdminUserDetailsResponse(user.getId(), user.getUserId(), user.getName(), user.getPhone(),
				user.getEmail(), user.getRole(), user.isActive(), user.isFirstLogin(), user.getCreatedAt(),
				user.getUpdatedAt());
	}

	public AdminAccountResponse getUserAccount(String userId) {

		User user = userRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("User not found"));

		Account account = accountRepository.findByUser(user)
				.orElseThrow(() -> new RuntimeException("Account not found"));

		return new AdminAccountResponse(account.getId(), account.getAccountNumber(), account.getAccountType(),
				account.getBalance(), account.getCurrency(), account.getCreatedAt());
	}

	public List<AdminTransactionResponse> getUserTransactions(String userId) {

		User user = userRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("User not found"));

		Account account = accountRepository.findByUser(user)
				.orElseThrow(() -> new RuntimeException("Account not found"));

		return transactionRepository.findByAccountIdOrderByCreatedAtDesc(account.getId()).stream()
				.map(transaction -> new AdminTransactionResponse(transaction.getId(), transaction.getAmount(),
						transaction.getType(), transaction.getBalanceAfter(), transaction.getRemarks(),
						transaction.getCreatedAt()))
				.toList();
	}

	public String updateUserStatus(String userId, AdminUserStatusRequest request) {

		User user = userRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("User not found"));

		user.setActive(request.isActive());
		userRepository.save(user);

		AuditLog auditLog = new AuditLog();
		auditLog.setUser(user);
		auditLog.setEventType("ADMIN_ACTION");

		if (request.isActive()) {
			auditLog.setDescription("Admin activated user: " + user.getUserId());
		} else {
			auditLog.setDescription("Admin deactivated user: " + user.getUserId());
		}

		auditLogRepository.save(auditLog);

		return request.isActive() ? "User activated successfully" : "User deactivated successfully";
	}
	
	public List<AdminAuditLogResponse> getUserAuditLogs(String userId) {

	    User user = userRepository.findByUserId(userId)
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    return auditLogRepository
	            .findByUserIdOrderByCreatedAtDesc(user.getId())
	            .stream()
	            .map(log -> new AdminAuditLogResponse(
	                    log.getId(),
	                    log.getEventType(),
	                    log.getDescription(),
	                    log.getCreatedAt()
	            ))
	            .toList();
	}
}