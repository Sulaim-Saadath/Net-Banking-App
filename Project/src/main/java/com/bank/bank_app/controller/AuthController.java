package com.bank.bank_app.controller;

import com.bank.bank_app.dto.FirstLoginPasswordChangeRequest;
import com.bank.bank_app.dto.FirstLoginPasswordChangeResponse;
import com.bank.bank_app.dto.LoginRequest;
import com.bank.bank_app.dto.LoginResponse;
import com.bank.bank_app.dto.RegisterOtpRequest;
import com.bank.bank_app.dto.RegisterRequest;
import com.bank.bank_app.dto.RegisterResponse;
import com.bank.bank_app.dto.RegistrationCompleteResponse;
import com.bank.bank_app.service.AuthService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private final AuthService authService;

	public AuthController(AuthService authService) {
		this.authService = authService;
	}

	// Register API
	@PostMapping("/register")
	public ResponseEntity<RegisterResponse> register(@Valid @RequestBody RegisterRequest request) {
		RegisterResponse response = authService.register(request);
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	// Verify OTP API
	@PostMapping("/verify-otp")
	public ResponseEntity<RegistrationCompleteResponse> verifyOtp(@Valid @RequestBody RegisterOtpRequest request) {
		RegistrationCompleteResponse response = authService.verifyOtp(request);
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request, HttpServletResponse httpResponse) {
		LoginResponse response = authService.login(request);
		if (response.isSuccess() && !response.isFirstLogin() && response.getToken() != null) {
			Cookie cookie = new Cookie("jwt", response.getToken());
			cookie.setHttpOnly(true);
			cookie.setSecure(false); // localhost development
			cookie.setPath("/");
			cookie.setMaxAge(60 * 60); // 1 hour
			httpResponse.addCookie(cookie);
		}
		return ResponseEntity.ok(response);
	}

	// Change Password API
	@PostMapping("/first-login/change-password")
	public ResponseEntity<FirstLoginPasswordChangeResponse> changeFirstLoginPassword(
			@RequestBody FirstLoginPasswordChangeRequest request) {
		FirstLoginPasswordChangeResponse response = authService.changeFirstLoginPassword(request);
		return ResponseEntity.ok(response);
	}
	
	@PostMapping("/logout")
	public ResponseEntity<String> logout(HttpServletResponse response) {
	    Cookie cookie = new Cookie("jwt", null);
	    cookie.setHttpOnly(true);
	    cookie.setSecure(false); // localhost development
	    cookie.setPath("/");
	    cookie.setMaxAge(0);
	    response.addCookie(cookie);
	    return ResponseEntity.ok("Logout successful");
	}
	
	@GetMapping("/me")
	public ResponseEntity<?> getCurrentUser(Authentication authentication) {

	    if (authentication == null) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	    }

	    return ResponseEntity.ok(
	        java.util.Map.of(
	            "userId", authentication.getName(),
	            "role", authentication.getAuthorities()
	                    .iterator()
	                    .next()
	                    .getAuthority()
	                    .replace("ROLE_", "")
	        )
	    );
	}
}