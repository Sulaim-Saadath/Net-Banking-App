package com.bank.bank_app.dto;

public class AdminUserStatusRequest {

    private boolean active;

    public AdminUserStatusRequest() {
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}