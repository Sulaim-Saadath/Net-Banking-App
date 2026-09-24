package com.bank.bank_app.dto;

public class LoginResponse {

	private boolean success;
	private boolean firstLogin;
	private String message;
	private String token;

	public LoginResponse() {
	}

	public LoginResponse(boolean success, boolean firstLogin, String message) {
		this.success = success;
		this.firstLogin = firstLogin;
		this.message = message;
	}
	public LoginResponse(
	        boolean success,
	        boolean firstLogin,
	        String message,
	        String token) {

	    this.success = success;
	    this.firstLogin = firstLogin;
	    this.message = message;
	    this.token = token;
	}

	public boolean isSuccess() {
		return success;
	}

	public boolean isFirstLogin() {
		return firstLogin;
	}

	public String getMessage() {
		return message;
	}
	public String getToken() {
	    return token;
	}
	
	
}