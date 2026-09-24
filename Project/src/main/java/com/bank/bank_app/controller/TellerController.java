package com.bank.bank_app.controller;

import com.bank.bank_app.dto.TellerTransactionResponse;
import com.bank.bank_app.service.TellerService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/teller")
public class TellerController {

	private final TellerService tellerService;

	public TellerController(TellerService tellerService) {
		this.tellerService = tellerService;
	}

	@GetMapping("/customers/{userId}")
	public ResponseEntity<Map<String, Object>> getCustomer(@PathVariable String userId) {
		return ResponseEntity.ok(tellerService.getCustomerByUserId(userId));
	}

	@GetMapping("/customers/{userId}/transactions")
	public ResponseEntity<List<TellerTransactionResponse>> getCustomerTransactions(@PathVariable String userId) {

		return ResponseEntity.ok(tellerService.getCustomerTransactions(userId));
	}
}