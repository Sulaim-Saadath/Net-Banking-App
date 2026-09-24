package com.bank.bank_app.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public class TellerTransactionResponse {

    private Long id;
    private String accountNumber;
    private BigDecimal amount;
    private String type;
    private BigDecimal balanceAfter;
    private String remarks;
    private LocalDateTime createdAt;

    public TellerTransactionResponse(
            Long id,
            String accountNumber,
            BigDecimal amount,
            String type,
            BigDecimal balanceAfter,
            String remarks,
            LocalDateTime createdAt) {

        this.id = id;
        this.accountNumber = accountNumber;
        this.amount = amount;
        this.type = type;
        this.balanceAfter = balanceAfter;
        this.remarks = remarks;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public String getType() {
        return type;
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