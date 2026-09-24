package com.bank.bank_app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bank.bank_app.entity.Transfer;

public interface TransferRepository extends JpaRepository<Transfer, Long> {

    List<Transfer> findBySenderAccountIdOrderByCreatedAtDesc(Long accountId);
}