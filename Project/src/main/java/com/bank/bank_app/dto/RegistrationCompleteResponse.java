package com.bank.bank_app.dto;

public class RegistrationCompleteResponse {

	private String message;
	private String userId;
	private String accountNumber;
	private String temporaryPassword;

	public RegistrationCompleteResponse(String message, String userId, String accountNumber, String temporaryPassword) {
		this.message = message;
		this.userId = userId;
		this.accountNumber = accountNumber;
		this.temporaryPassword = temporaryPassword;
	}

	public String getMessage() {
		return message;
	}

	public String getUserId() {
		return userId;
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public String getTemporaryPassword() {
		return temporaryPassword;
	}
}