package com.bank.bank_app.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class CustomerDashboardResponse {

	private String userId;
	private String name;
	private String accountNumber;
	private String accountType;
	private BigDecimal balance;
	private String currency;
	private List<TransactionResponse> recentTransactions;

	public CustomerDashboardResponse() {
	}

	public CustomerDashboardResponse(String userId, String name, String accountNumber, String accountType,
			BigDecimal balance, String currency, List<TransactionResponse> recentTransactions) {

		this.userId = userId;
		this.name = name;
		this.accountNumber = accountNumber;
		this.accountType = accountType;
		this.balance = balance;
		this.currency = currency;
		this.recentTransactions = recentTransactions;
	}

	public String getUserId() {
		return userId;
	}

	public String getName() {
		return name;
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

	public List<TransactionResponse> getRecentTransactions() {
		return recentTransactions;
	}

	public static class TransactionResponse {

		private String type;
		private BigDecimal amount;
		private BigDecimal balanceAfter;
		private String remarks;
		private LocalDateTime createdAt;

		public TransactionResponse() {
		}

		public TransactionResponse(String type, BigDecimal amount, BigDecimal balanceAfter, String remarks,
				LocalDateTime createdAt) {

			this.type = type;
			this.amount = amount;
			this.balanceAfter = balanceAfter;
			this.remarks = remarks;
			this.createdAt = createdAt;
		}

		public String getType() {
			return type;
		}

		public BigDecimal getAmount() {
			return amount;
		}

		public BigDecimal getBalanceAfter() {
			return balanceAfter;
		}

		public String getRemarks() {
			return remarks;
		}

		public LocalDateTime getCreatedAt() {
			return createdAt;
		}
	}
}