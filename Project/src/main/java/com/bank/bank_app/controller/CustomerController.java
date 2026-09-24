package com.bank.bank_app.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.bank_app.dto.CustomerDashboardResponse;
import com.bank.bank_app.dto.CustomerProfileResponse;
import com.bank.bank_app.dto.TransactionHistoryResponse;
import com.bank.bank_app.dto.TransferRequest;
import com.bank.bank_app.dto.TransferResponse;
import com.bank.bank_app.service.CustomerDashboardService;
import com.bank.bank_app.service.CustomerProfileService;
import com.bank.bank_app.service.TransactionHistoryService;
import com.bank.bank_app.service.TransferService;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

	private final CustomerDashboardService customerDashboardService;
	private final TransferService transferService;
	private final TransactionHistoryService transactionHistoryService;
	private final CustomerProfileService customerProfileService;

	public CustomerController(
	        CustomerDashboardService customerDashboardService,
	        TransferService transferService,
	        TransactionHistoryService transactionHistoryService,
	        CustomerProfileService customerProfileService) {

	    this.customerDashboardService = customerDashboardService;
	    this.transferService = transferService;
	    this.transactionHistoryService = transactionHistoryService;
	    this.customerProfileService = customerProfileService;
	}

	@GetMapping("/dashboard")
	public ResponseEntity<CustomerDashboardResponse> getDashboard(Authentication authentication) {
		Long userId = Long.valueOf(authentication.getName());
		CustomerDashboardResponse response = customerDashboardService.getDashboard(userId);
		return ResponseEntity.ok(response);
	}

	@PostMapping("/transfer")
	public ResponseEntity<TransferResponse> transfer(Authentication authentication,
			@RequestBody TransferRequest request) {
		Long userId = Long.valueOf(authentication.getName());
		TransferResponse response = transferService.transfer(userId, request);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/transactions")
	public ResponseEntity<List<TransactionHistoryResponse>> getTransactions(
	        Authentication authentication) {

	    Long userId = Long.valueOf(authentication.getName());

	    List<TransactionHistoryResponse> transactions =
	            transactionHistoryService.getTransactions(userId);

	    return ResponseEntity.ok(transactions);
	}
	@GetMapping("/profile")
	public ResponseEntity<CustomerProfileResponse> getProfile(
	        Authentication authentication) {

	    Long userId = Long.valueOf(authentication.getName());

	    return ResponseEntity.ok(
	            customerProfileService.getProfile(userId)
	    );
	}
}