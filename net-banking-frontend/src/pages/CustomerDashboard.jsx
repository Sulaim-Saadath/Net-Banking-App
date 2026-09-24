import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerDashboard.css";

function CustomerDashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/customer/dashboard",
          {
            method: "GET",
            credentials: "include",
          },
        );

        if (response.status === 401 || response.status === 403) {
          navigate("/login", { replace: true });
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to load dashboard");
        }

        const data = await response.json();

        setDashboard(data);
      } catch (error) {
        console.error("Dashboard loading failed:", error);
        setError("Unable to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return <div className="dashboard-state">Loading your dashboard...</div>;
  }

  if (error) {
    return <div className="dashboard-state">{error}</div>;
  }

  if (!dashboard) {
    return null;
  }

  return (
    <div className="customer-dashboard">
      {/* Header */}

      <header className="dashboard-header">
        <div className="bank-brand">
          <div className="bank-logo">SB</div>

          <span className="bank-name">SecureBank</span>
        </div>

        <div className="header-actions">
          <span className="header-user">{dashboard.userId}</span>

          <button
            className="profile-header-button"
            onClick={() => navigate("/customer/profile")}
          >
            View Profile
          </button>

          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* Main */}

      <main className="dashboard-content">
        <div className="dashboard-topbar">
          <div className="dashboard-heading">
            <h1>Welcome, {dashboard.name}</h1>
            <p>Here's an overview of your bank account.</p>
          </div>

          <div className="dashboard-actions">
            <button
              className="history-button"
              onClick={() => navigate("/customer/transactions")}
            >
              Transaction History
            </button>

            <button
              className="transfer-button"
              onClick={() => navigate("/customer/transfer")}
            >
              Transfer Money
            </button>
          </div>
        </div>
        <div className="dashboard-grid">
          <div className="balance-card">
            <div>
              <div className="balance-label">Available Balance</div>

              <div className="balance-amount">
                {dashboard.currency}{" "}
                {Number(dashboard.balance).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </div>
            </div>

            <div className="balance-account">
              Account ending in {dashboard.accountNumber.slice(-4)}
            </div>
          </div>

          <div className="account-card">
            <h2 className="card-title">Account Details</h2>

            <div className="account-detail">
              <span className="detail-label">Account Number</span>

              <span className="detail-value">{dashboard.accountNumber}</span>
            </div>

            <div className="account-detail">
              <span className="detail-label">Account Type</span>

              <span className="detail-value">{dashboard.accountType}</span>
            </div>

            <div className="account-detail">
              <span className="detail-label">Currency</span>

              <span className="detail-value">{dashboard.currency}</span>
            </div>
          </div>
        </div>

        {/* Transactions */}

        <div className="transactions-card">
          <div className="transactions-header">
            <h2>Recent Transactions</h2>

            <span>Latest activity</span>
          </div>

          {dashboard.recentTransactions.length === 0 ? (
            <div className="transaction-empty">
              <div className="transaction-empty-title">No transactions yet</div>

              <div className="transaction-empty-text">
                Your recent banking activity will appear here.
              </div>
            </div>
          ) : (
            <div className="transaction-list">
              {dashboard.recentTransactions.map((transaction, index) => (
                <div className="transaction-row" key={index}>
                  <div className="transaction-type">
                    <div className="transaction-icon">
                      {transaction.type === "CREDIT" ? "+" : "−"}
                    </div>

                    <div>
                      <div className="transaction-name">{transaction.type}</div>

                      <div className="transaction-remarks">
                        {transaction.remarks || "Bank transaction"}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="transaction-label">Amount</div>

                    <div className="transaction-value">
                      {dashboard.currency}{" "}
                      {Number(transaction.amount).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </div>
                  </div>

                  <div>
                    <div className="transaction-label">Balance</div>

                    <div className="transaction-value">
                      {dashboard.currency}{" "}
                      {Number(transaction.balanceAfter).toLocaleString(
                        "en-IN",
                        {
                          minimumFractionDigits: 2,
                        },
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="transaction-label">Date</div>

                    <div className="transaction-value">
                      {new Date(transaction.createdAt).toLocaleString("en-IN")}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default CustomerDashboard;
