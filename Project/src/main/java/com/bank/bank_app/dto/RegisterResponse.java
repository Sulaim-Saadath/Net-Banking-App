package com.bank.bank_app.dto;

public class RegisterResponse {

	private String message;
	private String userId;
	private String otp;

	public RegisterResponse(String message, String userId, String otp) {

		this.message = message;
		this.userId = userId;
		this.otp = otp;
	}

	public String getMessage() {
		return message;
	}

	public String getUserId() {
		return userId;
	}

	public String getOtp() {
		return otp;
	}
}