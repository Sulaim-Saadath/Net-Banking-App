import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./FirstLoginPage.css";

function FirstLoginPage() {
  const [temporaryPassword, setTemporaryPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const userId = location.state?.userId;

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");

    if (!userId) {
      setMessage("User information is missing. Please login again.");
      return;
    }

    if (!temporaryPassword) {
      setMessage("Temporary password is required");
      return;
    }

    if (!newPassword) {
      setMessage("New password is required");
      return;
    }

    if (!confirmPassword) {
      setMessage("Please confirm your new password");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("New password and confirm password do not match");
      return;
    }

    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!passwordPattern.test(newPassword)) {
      setMessage(
        "Password must be at least 8 characters and include uppercase, lowercase, number and special character",
      );
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/first-login/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            temporaryPassword: temporaryPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword,
          }),
        },
      );

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        navigate("/login", {
          state: {
            message:
              "Password changed successfully. Please login with your new password.",
          },
        });
        return;
      }

      setMessage(data.message || "Unable to change password");
    } catch (error) {
      console.error("Password change error:", error);
      setMessage("Unable to connect to the server");
    }
  };

  return (
    <div className="first-login-page">
      <div className="first-login-container">
        <h1>Net Banking</h1>

        <p className="first-login-subtitle">Set your new password</p>

        <div className="first-login-info">
          This is your first login. Please change your temporary password before
          continuing.
        </div>

        {message && <p className="first-login-message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="temporaryPassword">Temporary Password</label>

            <input
              type="password"
              id="temporaryPassword"
              placeholder="Enter temporary password"
              value={temporaryPassword}
              onChange={(event) => setTemporaryPassword(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="newPassword">New Password</label>

            <input
              type="password"
              id="newPassword"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
            />
          </div>

          <div className="password-hint">
            Must be at least 8 characters with uppercase, lowercase, number and
            special character.
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>

            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
          </div>

          <button type="submit">Change Password</button>
        </form>

        <p className="back-login-text">
          Already changed your password?{" "}
          <button
            type="button"
            className="back-login-button"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default FirstLoginPage;
