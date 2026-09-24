import { useState } from "react";
import "./RegistrationPage.css";
import { useNavigate } from "react-router-dom";

function RegistrationPage() {
  const [accountNumber, setAccountNumber] = useState("");
  const [userId, setUserId] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");

    // Basic frontend validation
    if (!accountNumber.trim()) {
      setMessage("Account number is required");
      return;
    }

    if (!userId.trim()) {
      setMessage("User ID is required");
      return;
    }

    if (!name.trim()) {
      setMessage("Name is required");
      return;
    }

    if (!phone.trim()) {
      setMessage("Phone number is required");
      return;
    }

    if (!email.trim()) {
      setMessage("Email is required");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountNumber: accountNumber.trim(),
          userId: userId.trim(),
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
        }),
      });

      const responseText = await response.text();

      console.log("Registration response:", responseText);

      if (!responseText) {
        setMessage(
          response.ok ? "Registration completed" : "Registration failed",
        );
        return;
      }

      const data = JSON.parse(responseText);

      if (response.ok) {
        navigate("/verify-otp", {
          state: {
            userId: data.userId,
          },
        });
        return;
      }

      setMessage(data.message || "Registration failed");
    } catch (error) {
      console.error("Registration error:", error);
      setMessage("Unable to connect to the server");
    }
  };

  return (
    <div className="registration-page">
      <div className="registration-container">
        <h1>Net Banking</h1>
        <p>Customer Registration</p>

        {message && <p className="registration-message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="accountNumber">Account Number</label>

            <input
              type="text"
              id="accountNumber"
              placeholder="Enter account number"
              value={accountNumber}
              onChange={(event) => setAccountNumber(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="userId">User ID</label>

            <input
              type="text"
              id="userId"
              placeholder="Enter User ID"
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>

            <input
              type="text"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>

            <input
              type="text"
              id="phone"
              placeholder="Enter phone number"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>

            <input
              type="email"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <button type="submit">Register</button>
        </form>

        <p className="login-text">
          Already registered?{" "}
          <button
            type="button"
            className="login-button"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default RegistrationPage;
