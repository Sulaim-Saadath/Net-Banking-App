package com.bank.bank_app.service;

import java.math.BigDecimal;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bank.bank_app.dto.FirstLoginPasswordChangeRequest;
import com.bank.bank_app.dto.FirstLoginPasswordChangeResponse;
import com.bank.bank_app.dto.LoginRequest;
import com.bank.bank_app.dto.LoginResponse;
import com.bank.bank_app.dto.RegisterOtpRequest;
import com.bank.bank_app.dto.RegisterRequest;
import com.bank.bank_app.dto.RegisterResponse;
import com.bank.bank_app.dto.RegistrationCompleteResponse;
import com.bank.bank_app.entity.Account;
import com.bank.bank_app.entity.AuditLog;
import com.bank.bank_app.entity.Role;
import com.bank.bank_app.entity.User;
import com.bank.bank_app.repository.AccountRepository;
import com.bank.bank_app.repository.AuditLogRepository;
import com.bank.bank_app.repository.UserRepository;

@Service
public class AuthService {

	private final UserRepository userRepository;
	private final AccountRepository accountRepository;
	private final AuditLogRepository auditLogRepository;

	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;

	/*
	 * Temporary storage for registrations that are waiting for OTP verification.
	 *
	 * Key -> User ID Value -> Pending registration details
	 */
	private final Map<String, PendingRegistration> pendingRegistrations = new ConcurrentHashMap<>();

	public AuthService(UserRepository userRepository, AccountRepository accountRepository,
			AuditLogRepository auditLogRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
		super();
		this.userRepository = userRepository;
		this.accountRepository = accountRepository;
		this.auditLogRepository = auditLogRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtService = jwtService;
	}

// Register method
	public RegisterResponse register(RegisterRequest request) {
		// 1. Check User ID
		if (userRepository.existsByUserId(request.getUserId())) {
			throw new RuntimeException("User ID already exists");
		}

		// 2. Check Email
		if (userRepository.existsByEmail(request.getEmail())) {
			throw new RuntimeException("Email already registered");
		}

		// 3. Check Phone
		if (userRepository.existsByPhone(request.getPhone())) {
			throw new RuntimeException("Phone number already registered");
		}

		// 4. Check Account Number
		if (accountRepository.existsByAccountNumber(request.getAccountNumber())) {

			throw new RuntimeException("Account number already registered");
		}

		// 5. Generate OTP
		String otp = generateOtp();

		// 6. Store registration temporarily
		PendingRegistration pendingRegistration = new PendingRegistration(request, otp);

		pendingRegistrations.put(request.getUserId(), pendingRegistration);

		System.out.println("-----------------------------------");
		System.out.println("REGISTRATION OTP");
		System.out.println("User ID : " + request.getUserId());
		System.out.println("OTP     : " + otp);
		System.out.println("-----------------------------------");

		return new RegisterResponse("OTP generated. Please verify OTP.", request.getUserId(), otp);
	}

// OTP verification
	@Transactional
	public RegistrationCompleteResponse verifyOtp(RegisterOtpRequest request) {

		// 1. Find pending registration
		PendingRegistration pending = pendingRegistrations.get(request.getUserId());
		if (pending == null) {
			throw new RuntimeException("No pending registration found for this User ID");
		}

		// 2. Verify OTP
		if (!pending.getOtp().equals(request.getOtp())) {
			throw new RuntimeException("Invalid OTP");
		}
		RegisterRequest registration = pending.getRequest();

		// 3. Generate temporary password
		String temporaryPassword = generateTemporaryPassword();
		User user = new User();
		user.setUserId(registration.getUserId());
		user.setName(registration.getName());
		user.setPhone(registration.getPhone());
		user.setEmail(registration.getEmail());
		user.setRole(Role.CUSTOMER);
		user.setPasswordHash(passwordEncoder.encode(temporaryPassword));
		user.setTemporaryPasswordHash(passwordEncoder.encode(temporaryPassword));
		user.setFirstLogin(true);
		User savedUser = userRepository.save(user);
// Create account
		Account account = new Account();
		account.setAccountNumber(registration.getAccountNumber());
		account.setAccountType("SAVINGS");
		account.setBalance(BigDecimal.ZERO);
		account.setCurrency("INR");
		account.setUser(savedUser);
		Account savedAccount = accountRepository.save(account);

// Store the event log		
		AuditLog auditLog = new AuditLog();
		auditLog.setUser(savedUser);
		auditLog.setEventType("REGISTRATION_SUCCESS");
		auditLog.setDescription("Customer registration completed successfully");
		auditLogRepository.save(auditLog);

		// Remove the pending request after genrating temporary password
		pendingRegistrations.remove(request.getUserId());

		System.out.println("-----------------------------------");
		System.out.println("REGISTRATION COMPLETED");
		System.out.println("User ID             : " + savedUser.getUserId());
		System.out.println("Account Number      : " + savedAccount.getAccountNumber());
		System.out.println("Temporary Password  : " + temporaryPassword);
		System.out.println("-----------------------------------");
		return new RegistrationCompleteResponse("Registration completed successfully", savedUser.getUserId(),
				savedAccount.getAccountNumber(), temporaryPassword);
	}

// Method to generate otp
	private String generateOtp() {
		Random random = new Random();
		return String.format("%06d", random.nextInt(1_000_000));
	}

// Method to generate password
	private String generateTemporaryPassword() {
		String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ" + "abcdefghijklmnopqrstuvwxyz" + "0123456789";
		Random random = new Random();
		StringBuilder password = new StringBuilder();
		for (int i = 0; i < 8; i++) {
			int index = random.nextInt(characters.length());
			password.append(characters.charAt(index));
		}
		return password.toString();
	}

	private static class PendingRegistration {

		private final RegisterRequest request;
		private final String otp;

		public PendingRegistration(RegisterRequest request, String otp) {

			this.request = request;
			this.otp = otp;
		}

		public RegisterRequest getRequest() {
			return request;
		}

		public String getOtp() {
			return otp;
		}
	}

	public LoginResponse login(LoginRequest request) {
		User user = userRepository.findByUserId(request.getUserId()).orElse(null);
		System.out.println("LOGIN USER ID: " + request.getUserId());
		System.out.println("USER FOUND: " + (user != null));
		if (user == null) {
			return new LoginResponse(false, false, "Invalid User ID or password");
		}
		if (!user.isActive()) {
			return new LoginResponse(false, false, "User account is inactive");
		}

		boolean passwordMatches = passwordEncoder.matches(request.getPassword(), user.getPasswordHash());
		System.out.println("PASSWORD MATCHES: " + passwordMatches);
		if (!passwordMatches) {
			AuditLog auditLog = new AuditLog();
			auditLog.setUser(user);
			auditLog.setEventType("LOGIN_FAILED");
			auditLog.setDescription("Invalid password during login");
			auditLogRepository.save(auditLog);
			return new LoginResponse(false, user.isFirstLogin(), "Invalid User ID or password");
		}

		if (user.isFirstLogin()) {
			AuditLog auditLog = new AuditLog();
			auditLog.setUser(user);
			auditLog.setEventType("FIRST_LOGIN_REQUIRED");
			auditLog.setDescription("Customer must complete first-time password change");
			auditLogRepository.save(auditLog);
			return new LoginResponse(true, true, "First-time password change required");
		}
		
		String token = jwtService.generateToken(user.getId(), user.getRole().name());
		return new LoginResponse(true, false, "Login successful", token);
	}

	public FirstLoginPasswordChangeResponse changeFirstLoginPassword(FirstLoginPasswordChangeRequest request) {
		User user = userRepository.findByUserId(request.getUserId()).orElse(null);
		if (user == null) {
			return new FirstLoginPasswordChangeResponse(false, "User not found");
		}
		if (!user.isActive()) {
			return new FirstLoginPasswordChangeResponse(false, "User account is inactive");
		}
		if (!user.isFirstLogin()) {
			return new FirstLoginPasswordChangeResponse(false, "First-time password change is not required");
		}
		if (request.getTemporaryPassword() == null || request.getTemporaryPassword().isBlank()) {
			return new FirstLoginPasswordChangeResponse(false, "Temporary password is required");
		}

		boolean temporaryPasswordMatches = passwordEncoder.matches(request.getTemporaryPassword(),
				user.getTemporaryPasswordHash());
		if (!temporaryPasswordMatches) {
			AuditLog auditLog = new AuditLog();
			auditLog.setUser(user);
			auditLog.setEventType("FIRST_LOGIN_PASSWORD_CHANGE_FAILED");
			auditLog.setDescription("Invalid temporary password");
			auditLogRepository.save(auditLog);
			return new FirstLoginPasswordChangeResponse(false, "Invalid temporary password");
		}

		if (request.getNewPassword() == null || request.getNewPassword().isBlank()) {
			return new FirstLoginPasswordChangeResponse(false, "New password is required");
		}

		if (!isValidPassword(request.getNewPassword())) {
			return new FirstLoginPasswordChangeResponse(false,
					"Password must contain at least 8 characters, including uppercase, lowercase, digit and special character");
		}

		if (!request.getNewPassword().equals(request.getConfirmPassword())) {
			return new FirstLoginPasswordChangeResponse(false, "New password and confirm password do not match");
		}

		if (passwordEncoder.matches(request.getNewPassword(), user.getTemporaryPasswordHash())) {
			return new FirstLoginPasswordChangeResponse(false,
					"New password must be different from temporary password");
		}

		String newPasswordHash = passwordEncoder.encode(request.getNewPassword());
		user.setPasswordHash(newPasswordHash);
		user.setTemporaryPasswordHash(null);
		user.setFirstLogin(false);
		userRepository.save(user);

		AuditLog auditLog = new AuditLog();
		auditLog.setUser(user);
		auditLog.setEventType("FIRST_LOGIN_PASSWORD_CHANGED");
		auditLog.setDescription("Customer successfully changed password during first login");
		auditLogRepository.save(auditLog);
		return new FirstLoginPasswordChangeResponse(true, "Password changed successfully");
	}

	private boolean isValidPassword(String password) {
		if (password == null || password.length() < 8) {
			return false;
		}
		boolean hasUppercase = password.matches(".*[A-Z].*");
		boolean hasLowercase = password.matches(".*[a-z].*");
		boolean hasDigit = password.matches(".*\\d.*");
		boolean hasSpecial = password.matches(".*[^a-zA-Z0-9].*");
		return hasUppercase && hasLowercase && hasDigit && hasSpecial;
	}
}