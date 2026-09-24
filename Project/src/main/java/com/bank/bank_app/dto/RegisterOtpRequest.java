package com.bank.bank_app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class RegisterOtpRequest {

	@NotBlank(message = "User ID is required")
	private String userId;

	@NotBlank(message = "OTP is required")
	@Pattern(regexp = "^[0-9]{6}$", message = "OTP must be a 6-digit number")
	private String otp;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getOtp() {
		return otp;
	}

	public void setOtp(String otp) {
		this.otp = otp;
	}
}