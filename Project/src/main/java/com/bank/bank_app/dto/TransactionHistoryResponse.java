package com.bank.bank_app.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class TransactionHistoryResponse {

	private String type;
	private BigDecimal amount;
	private BigDecimal balanceAfter;
	private String remarks;
	private LocalDateTime createdAt;

	public TransactionHistoryResponse() {
	}

	public TransactionHistoryResponse(String type, BigDecimal amount, BigDecimal balanceAfter, String remarks,
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