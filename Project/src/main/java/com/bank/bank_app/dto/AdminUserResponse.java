package com.bank.bank_app.dto;

import java.time.LocalDateTime;

import com.bank.bank_app.entity.Role;

public class AdminUserResponse {

	private Long id;
	private String userId;
	private String name;
	private String phone;
	private String email;
	private Role role;
	private boolean active;
	private LocalDateTime createdAt;

	public AdminUserResponse(Long id, String userId, String name, String phone, String email, Role role, boolean active,
			LocalDateTime createdAt) {

		this.id = id;
		this.userId = userId;
		this.name = name;
		this.phone = phone;
		this.email = email;
		this.role = role;
		this.active = active;
		this.createdAt = createdAt;
	}

	public Long getId() {
		return id;
	}

	public String getUserId() {
		return userId;
	}

	public String getName() {
		return name;
	}

	public String getPhone() {
		return phone;
	}

	public String getEmail() {
		return email;
	}

	public Role getRole() {
		return role;
	}

	public boolean isActive() {
		return active;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
}