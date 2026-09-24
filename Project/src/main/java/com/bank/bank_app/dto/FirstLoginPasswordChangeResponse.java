package com.bank.bank_app.dto;

public class FirstLoginPasswordChangeResponse {

	private boolean success;
	private String message;

	public FirstLoginPasswordChangeResponse() {
	}

	public FirstLoginPasswordChangeResponse(boolean success, String message) {
		this.success = success;
		this.message = message;
	}

	public boolean isSuccess() {
		return success;
	}

	public String getMessage() {
		return message;
	}
}
