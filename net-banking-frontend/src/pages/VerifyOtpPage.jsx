import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./VerifyOtpPage.css";

function VerifyOtpPage() {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const userId = location.state?.userId;

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");

    if (!userId) {
      setMessage("User information is missing. Please register again.");
      return;
    }

    if (!otp.trim()) {
      setMessage("OTP is required");
      return;
    }

    if (!/^\d{6}$/.test(otp.trim())) {
      setMessage("OTP must be a 6-digit number");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/auth/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            otp: otp.trim(),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
        return;
      }

      setMessage(data.message);

    } catch (error) {
      console.error("OTP verification error:", error);
      setMessage("Unable to connect to the server");
    }
  };

  return (
    <div className="otp-page">
      <div className="otp-container">

        <h1>Verify OTP</h1>

        <p>
          Enter the 6-digit OTP generated for your registration.
        </p>

        {message && (
          <p className="otp-message">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="otp">OTP</label>

            <input
              type="text"
              id="otp"
              placeholder="Enter 6-digit OTP"
              value={otp}
              maxLength="6"
              inputMode="numeric"
              onChange={(event) =>
                setOtp(event.target.value.replace(/\D/g, ""))
              }
            />
          </div>

          <button type="submit">
            Verify OTP
          </button>

        </form>

        <p className="login-text">
          Already have an account?{" "}
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

export default VerifyOtpPage;

