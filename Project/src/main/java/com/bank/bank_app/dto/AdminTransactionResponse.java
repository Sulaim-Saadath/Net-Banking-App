package com.bank.bank_app.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.bank.bank_app.entity.TransactionType;

public class AdminTransactionResponse {

    private Long id;
    private BigDecimal amount;
    private TransactionType type;
    private BigDecimal balanceAfter;
    private String remarks;
    private LocalDateTime createdAt;

    public AdminTransactionResponse(Long id,
                                    BigDecimal amount,
                                    TransactionType type,
                                    BigDecimal balanceAfter,
                                    String remarks,
                                    LocalDateTime createdAt) {
        this.id = id;
        this.amount = amount;
        this.type = type;
        this.balanceAfter = balanceAfter;
        this.remarks = remarks;
        this.createdAt = createdAt;
    }

    public Long getId() {
        return id;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public TransactionType getType() {
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