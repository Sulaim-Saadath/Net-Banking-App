package com.bank.bank_app.dto;

import java.time.LocalDateTime;

public class AdminAuditLogResponse {

	private Long id;
	private String eventType;
	private String description;
	private LocalDateTime createdAt;

	public AdminAuditLogResponse(Long id, String eventType, String description, LocalDateTime createdAt) {
		this.id = id;
		this.eventType = eventType;
		this.description = description;
		this.createdAt = createdAt;
	}

	public Long getId() {
		return id;
	}

	public String getEventType() {
		return eventType;
	}

	public String getDescription() {
		return description;
	}

	public LocalDateTime getCreatedAt() {
		return createdAt;
	}
}