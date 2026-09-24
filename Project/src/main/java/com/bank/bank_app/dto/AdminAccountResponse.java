package com.bank.bank_app.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class AdminAccountResponse {

	private Long id;
	private String accountNumber;
	private String accountType;
	private BigDecimal balance;
	private String currency;
	private LocalDateTime createdAt;

	public AdminAccountResponse(Long id, String accountNumber, String accountType, BigDecimal balance, String currency,
			LocalDateTime createdAt) {
		this.id = id;
		this.accountNumber = accountNumber;
		this.accountType = accountType;
		this.balance = balance;
		this.currency = currency;
		this.createdAt = createdAt;
	}

	public Long getId() {
		return id;
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public String getAccountType() {
		return accountType;
	}

	public BigDecimal getBalance() {
		return balance;
	}

	public String getCurrency() {
		return currency;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
}