package com.bank.bank_app.dto;

import java.math.BigDecimal;

public class TransferResponse {

    private boolean success;
    private String message;
    private BigDecimal remainingBalance;

    public TransferResponse(boolean success, String message, BigDecimal remainingBalance) {
        this.success = success;
        this.message = message;
        this.remainingBalance = remainingBalance;
    }

    public boolean isSuccess() {
        return success;
    }

    public String getMessage() {
        return message;
    }

    public BigDecimal getRemainingBalance() {
        return remainingBalance;
    }
}