package com.bank.bank_app.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.bank_app.dto.AdminAccountResponse;
import com.bank.bank_app.dto.AdminAuditLogResponse;
import com.bank.bank_app.dto.AdminTransactionResponse;
import com.bank.bank_app.dto.AdminUserDetailsResponse;
import com.bank.bank_app.dto.AdminUserResponse;
import com.bank.bank_app.dto.AdminUserStatusRequest;
import com.bank.bank_app.service.AdminService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

	private final AdminService adminService;

	public AdminController(AdminService adminService) {
		this.adminService = adminService;
	}

	@GetMapping("/dashboard")
	public ResponseEntity<?> getDashboard() {

		return ResponseEntity.ok(Map.of("success", true, "message", "Welcome to Admin Dashboard"));
	}

	@GetMapping("/users")
	public ResponseEntity<List<AdminUserResponse>> getAllUsers() {

		return ResponseEntity.ok(adminService.getAllUsers());
	}

	@GetMapping("/users/{userId}")
	public ResponseEntity<AdminUserDetailsResponse> getUserDetails(@PathVariable String userId) {

		return ResponseEntity.ok(adminService.getUserDetails(userId));
	}

	@GetMapping("/users/{userId}/account")
	public ResponseEntity<AdminAccountResponse> getUserAccount(@PathVariable String userId) {

		return ResponseEntity.ok(adminService.getUserAccount(userId));
	}

	@GetMapping("/users/{userId}/transactions")
	public ResponseEntity<List<AdminTransactionResponse>> getUserTransactions(@PathVariable String userId) {

		return ResponseEntity.ok(adminService.getUserTransactions(userId));
	}

	@PatchMapping("/users/{userId}/status")
	public ResponseEntity<?> updateUserStatus(@PathVariable String userId,
			@RequestBody AdminUserStatusRequest request) {

		String message = adminService.updateUserStatus(userId, request);

		return ResponseEntity.ok(Map.of("success", true, "message", message));
	}
	@GetMapping("/users/{userId}/audit-logs")
	public ResponseEntity<List<AdminAuditLogResponse>> getUserAuditLogs(
	        @PathVariable String userId) {

	    return ResponseEntity.ok(adminService.getUserAuditLogs(userId));
	}
}