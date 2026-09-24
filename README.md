# 🏦 Net Banking Simulation Web Application

A full-stack **Net Banking Simulation Web Application** developed using **React, Spring Boot, Spring Security, JWT, BCrypt, and MySQL**.

This project simulates a banking environment with three different actors:

- 👤 **CUSTOMER**
- 🏦 **TELLER**
- 🛡️ **ADMIN**

The application demonstrates authentication, authorization, account management, simulated money transfers, transaction monitoring, user management, and audit logging.

> **Note:** This is a banking simulation project. It does not connect to any real banking system or process real financial transactions. Account numbers, balances, and transfers are managed only within the application's database.

---

# 📌 Table of Contents

- [Project Overview](#-project-overview)
- [Features](#-features)
- [Technology Stack](#️-technology-stack)
- [System Architecture](#-system-architecture)
- [Security Architecture](#-security-architecture)
- [Database Design](#️-database-design)
- [Customer Module](#-customer-module)
- [Teller Module](#-teller-module)
- [Admin Module](#️-admin-module)
- [Authentication Flow](#-authentication-flow)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Running the Project](#️-running-the-project)
- [Testing](#-testing)
- [Project Completion Status](#-project-completion-status)
- [Interview Explanation](#-interview-explanation)
- [Future Improvements](#-future-improvements)

---

# 🚀 Project Overview

The Net Banking Simulation Web Application provides a complete simulated banking workflow.

The system supports three actors:

### 👤 CUSTOMER

Customers can:

- Register
- Verify OTP
- Complete first-time password setup
- Login
- View dashboard
- View account information
- Transfer simulated money
- View transaction history
- View profile
- Logout

### 🏦 TELLER

Tellers can:

- Login securely
- Access the Teller dashboard
- Search customers
- View customer details
- View customer account information
- View customer transaction history
- Logout

### 🛡️ ADMIN

Admins can:

- Login securely
- Access the Admin dashboard
- View all users
- View user details
- View account details
- Monitor transactions
- Activate/deactivate users
- View audit history
- Monitor administrative actions
- Logout

---

# ✨ Features

## Authentication

- Customer registration
- OTP verification
- Temporary password generation
- First-time password change
- Normal login
- JWT authentication
- HttpOnly JWT cookie
- Stateless Spring Security
- Logout
- Current-session validation

## Authorization

- CUSTOMER role
- TELLER role
- ADMIN role
- Backend role-based authorization
- React ProtectedRoute
- Frontend role validation
- Wrong-role access protection

## Customer Banking

- Customer dashboard
- Account summary
- Balance display
- Recent transactions
- Simulated money transfer
- Debit transaction creation
- Credit transaction creation
- Transaction history
- Customer profile

## Teller Operations

- Teller dashboard
- Customer search
- Customer details
- Account details
- Customer transaction monitoring

## Admin Operations

- Admin dashboard
- User management
- User details
- Account details
- Transaction monitoring
- Activate/deactivate users
- Audit-log monitoring

## Security

- BCrypt password hashing
- JWT authentication
- HttpOnly cookie
- Stateless sessions
- Role-based authorization
- DTO-based API responses
- Sensitive password fields excluded from API responses
- Audit logging

---

# 🛠️ Technology Stack

## Frontend

- **React**
- **Vite**
- **React Router**
- **Fetch API**
- **Plain CSS**

## Backend

- **Spring Boot 3.x**
- **Java 17/21**
- **Spring Web**
- **Spring Data JPA**
- **Spring Security**
- **BCrypt**
- **JJWT**
- **Jakarta Validation**

## Database

- **MySQL**
- **MySQL Workbench**

## Testing

- **Postman**
- **Browser Developer Tools**
- **MySQL Workbench**
- **Frontend browser testing**

---

# 🏗️ System Architecture

The application follows a layered architecture.

```text
                    React Frontend
                          │
                          ↓
                 ProtectedRoute
                  Role Validation
                          │
                          ↓
              JWT HttpOnly Cookie
                          │
                          ↓
                 Spring Security
                          │
                          ↓
                    Controller
                          │
                          ↓
                      Service
                          │
                          ↓
                    Repository
                          │
                          ↓
                      Entity
                          │
                          ↓
                       MySQL
