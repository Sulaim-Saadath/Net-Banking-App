package com.bank.bank_app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bank.bank_app.entity.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

	List<Transaction> findByAccountIdOrderByCreatedAtDesc(Long accountId);
	
	List<Transaction> findTop10ByAccountIdOrderByCreatedAtDesc(Long accountId);
}