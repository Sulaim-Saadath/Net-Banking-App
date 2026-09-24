package com.bank.bank_app.dto;

public class CustomerProfileResponse {

	private String userId;
	private String name;
	private String email;
	private String phone;

	private String accountNumber;
	private String accountType;
	private String currency;

	public CustomerProfileResponse(String userId, String name, String email, String phone, String accountNumber,
			String accountType, String currency) {

		this.userId = userId;
		this.name = name;
		this.email = email;
		this.phone = phone;
		this.accountNumber = accountNumber;
		this.accountType = accountType;
		this.currency = currency;
	}

	public String getUserId() {
		return userId;
	}

	public String getName() {
		return name;
	}

	public String getEmail() {
		return email;
	}

	public String getPhone() {
		return phone;
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public String getAccountType() {
		return accountType;
	}

	public String getCurrency() {
		return currency;
	}
}