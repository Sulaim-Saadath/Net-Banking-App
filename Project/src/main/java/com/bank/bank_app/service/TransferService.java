package com.bank.bank_app.service;

import java.math.BigDecimal;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bank.bank_app.dto.TransferRequest;
import com.bank.bank_app.dto.TransferResponse;
import com.bank.bank_app.entity.Account;
import com.bank.bank_app.entity.Transaction;
import com.bank.bank_app.entity.TransactionType;
import com.bank.bank_app.repository.AccountRepository;
import com.bank.bank_app.repository.TransactionRepository;

@Service
public class TransferService {

    private final AccountRepository accountRepository;
    private final TransactionRepository transactionRepository;

    public TransferService(AccountRepository accountRepository,
                            TransactionRepository transactionRepository) {
        this.accountRepository = accountRepository;
        this.transactionRepository = transactionRepository;
    }

    @Transactional
    public TransferResponse transfer(Long senderUserId, TransferRequest request) {

        // Validate amount
        if (request.getAmount() == null ||
            request.getAmount().compareTo(BigDecimal.ZERO) <= 0) {

            return new TransferResponse(
                    false,
                    "Amount must be greater than zero",
                    null
            );
        }

        // Find sender using logged-in user
        Account sender = accountRepository
                .findByUser_Id(senderUserId)
                .orElseThrow(() -> new RuntimeException("Sender account not found"));

        // Find receiver using account number
        Account receiver = accountRepository
                .findByAccountNumber(request.getAccountNumber())
                .orElseThrow(() -> new RuntimeException("Receiver account not found"));

        // Prevent self transfer
        if (sender.getId().equals(receiver.getId())) {
            return new TransferResponse(
                    false,
                    "You cannot transfer money to your own account",
                    sender.getBalance()
            );
        }

        // Check balance
        if (sender.getBalance().compareTo(request.getAmount()) < 0) {
            return new TransferResponse(
                    false,
                    "Insufficient balance",
                    sender.getBalance()
            );
        }

        // Calculate new balances
        BigDecimal senderNewBalance =
                sender.getBalance().subtract(request.getAmount());

        BigDecimal receiverNewBalance =
                receiver.getBalance().add(request.getAmount());

        // Update balances
        sender.setBalance(senderNewBalance);
        receiver.setBalance(receiverNewBalance);

        accountRepository.save(sender);
        accountRepository.save(receiver);

        // DEBIT transaction
        Transaction debit = new Transaction();
        debit.setAccount(sender);
        debit.setType(TransactionType.DEBIT);
        debit.setAmount(request.getAmount());
        debit.setBalanceAfter(senderNewBalance);
        debit.setRemarks(request.getRemarks());

        transactionRepository.save(debit);

        // CREDIT transaction
        Transaction credit = new Transaction();
        credit.setAccount(receiver);
        credit.setType(TransactionType.CREDIT);
        credit.setAmount(request.getAmount());
        credit.setBalanceAfter(receiverNewBalance);
        credit.setRemarks(request.getRemarks());

        transactionRepository.save(credit);

        return new TransferResponse(
                true,
                "Transfer successful",
                senderNewBalance
        );
    }
}