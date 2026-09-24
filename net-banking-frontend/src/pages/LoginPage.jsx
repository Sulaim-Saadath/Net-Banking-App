import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    setMessage("");

    // Basic frontend validation
    if (!userId.trim()) {
      setMessage("User ID is required");
      return;
    }

    if (!password) {
      setMessage("Password is required");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId.trim(),
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Login failed");
        return;
      }

      if (data.firstLogin === true) {
        navigate("/first-login", {
          state: {
            userId: userId.trim(),
          },
        });
        return;
      }

     if (data.success && !data.firstLogin) {

    const userResponse = await fetch(
        "http://localhost:8080/api/auth/me",
        {
            method: "GET",
            credentials: "include"
        }
    );

    if (!userResponse.ok) {
        setMessage("Unable to verify session");
        return;
    }

    const user = await userResponse.json();

    if (user.role === "CUSTOMER") {
        navigate("/customer");
    } 
    else if (user.role === "TELLER") {
        navigate("/teller");
    } 
    else if (user.role === "ADMIN") {
        navigate("/admin");
    }

    return;
}
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Unable to connect to the server");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Net Banking</h1>
        <p>Customer Login</p>

        {message && <p className="login-message">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="userId">User ID</label>

            <input
              type="text"
              id="userId"
              placeholder="Enter your User ID"
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>

            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <button type="submit">Login</button>
        </form>

        <p className="register-text">
          Not registered?{" "}
          <button
            type="button"
            className="register-button"
            onClick={() => navigate("/register")}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
