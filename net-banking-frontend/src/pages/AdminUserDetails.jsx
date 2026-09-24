import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./AdminUserDetails.css";

function AdminUserDetails() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const [loading, setLoading] = useState(true);
  const [accountLoading, setAccountLoading] = useState(true);
  const [transactionLoading, setTransactionLoading] = useState(true);

  const [error, setError] = useState("");
  const [accountError, setAccountError] = useState("");
  const [transactionError, setTransactionError] = useState("");

  const [statusLoading, setStatusLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const [auditLogs, setAuditLogs] = useState([]);
  const [auditLoading, setAuditLoading] = useState(true);
  const [auditError, setAuditError] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/api/admin/users/${userId}`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load user details");
        }

        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load user details");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/admin/users/${userId}/account`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load account details");
        }

        return response.json();
      })
      .then((data) => {
        setAccount(data);
      })
      .catch((error) => {
        console.error(error);
        setAccountError("Unable to load account details");
      })
      .finally(() => {
        setAccountLoading(false);
      });
  }, [userId]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/admin/users/${userId}/transactions`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load transactions");
        }

        return response.json();
      })
      .then((data) => {
        setTransactions(data);
      })
      .catch((error) => {
        console.error(error);
        setTransactionError("Unable to load transactions");
      })
      .finally(() => {
        setTransactionLoading(false);
      });
  }, [userId]);
  useEffect(() => {
    fetch(`http://localhost:8080/api/admin/users/${userId}/audit-logs`, {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load audit logs");
        }

        return response.json();
      })
      .then((data) => {
        setAuditLogs(data);
      })
      .catch((error) => {
        console.error(error);
        setAuditError("Unable to load audit logs");
      })
      .finally(() => {
        setAuditLoading(false);
      });
  }, [userId]);
  const handleStatusChange = async () => {
    const newStatus = !user.active;

    const confirmed = window.confirm(
      newStatus
        ? "Are you sure you want to activate this user?"
        : "Are you sure you want to deactivate this user?",
    );

    if (!confirmed) {
      return;
    }

    setStatusLoading(true);
    setStatusMessage("");

    try {
      const response = await fetch(
        `http://localhost:8080/api/admin/users/${userId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            active: newStatus,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update user status");
      }

      setUser((previousUser) => ({
        ...previousUser,
        active: newStatus,
      }));

      setStatusMessage(data.message);
    } catch (error) {
      console.error(error);
      setStatusMessage("Unable to update user status");
    } finally {
      setStatusLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-user-details-state">Loading user details...</div>
    );
  }

  if (error) {
    return (
      <div className="admin-user-details-state">
        <p className="admin-user-details-error">{error}</p>

        <button
          className="admin-back-button"
          onClick={() => navigate("/admin/users")}
        >
          Back to Users
        </button>
      </div>
    );
  }

  return (
    <div className="admin-user-details">
      {/* Header */}
      <div className="admin-user-details-header">
        <div>
          <h1>User Details</h1>

          <p>View user, account and transaction information</p>
        </div>

        <button
          className="admin-back-button"
          onClick={() => navigate("/admin/users")}
        >
          Back to Users
        </button>
      </div>

      {/* User Details Card */}
      <div className="admin-user-details-card">
        <div className="admin-section-title">
          <h2>User Information</h2>
        </div>

        <div className="admin-detail-row">
          <span>User ID</span>
          <strong>{user.userId}</strong>
        </div>

        <div className="admin-detail-row">
          <span>Name</span>
          <strong>{user.name}</strong>
        </div>

        <div className="admin-detail-row">
          <span>Email</span>
          <strong>{user.email}</strong>
        </div>

        <div className="admin-detail-row">
          <span>Phone</span>
          <strong>{user.phone}</strong>
        </div>

        <div className="admin-detail-row">
          <span>Role</span>
          <strong>{user.role}</strong>
        </div>

        <div className="admin-detail-row admin-status-row">
          <span>Status</span>

          <div className="admin-status-action">
            <strong
              className={user.active ? "status-active" : "status-inactive"}
            >
              {user.active ? "Active" : "Inactive"}
            </strong>

            <button
              className={
                user.active
                  ? "admin-status-button deactivate"
                  : "admin-status-button activate"
              }
              onClick={handleStatusChange}
              disabled={statusLoading}
            >
              {statusLoading
                ? "Updating..."
                : user.active
                  ? "Deactivate"
                  : "Activate"}
            </button>
          </div>
        </div>

        <div className="admin-detail-row">
          <span>First Login</span>
          <strong>{user.firstLogin ? "Yes" : "No"}</strong>
        </div>

        <div className="admin-detail-row">
          <span>Created At</span>
          <strong>
            {user.createdAt ? new Date(user.createdAt).toLocaleString() : "-"}
          </strong>
        </div>

        <div className="admin-detail-row">
          <span>Updated At</span>
          <strong>
            {user.updatedAt ? new Date(user.updatedAt).toLocaleString() : "-"}
          </strong>
        </div>
      </div>
      {statusMessage && (
        <div className="admin-status-message">{statusMessage}</div>
      )}
      {/* Account Details Card */}
      <div className="admin-user-details-card admin-account-card">
        <div className="admin-section-title">
          <h2>Account Information</h2>
        </div>

        {accountLoading ? (
          <div className="admin-account-state">Loading account details...</div>
        ) : accountError ? (
          <div className="admin-account-state">
            <p className="admin-user-details-error">{accountError}</p>
          </div>
        ) : (
          <>
            <div className="admin-detail-row">
              <span>Account Number</span>
              <strong>{account.accountNumber}</strong>
            </div>

            <div className="admin-detail-row">
              <span>Account Type</span>
              <strong>{account.accountType}</strong>
            </div>

            <div className="admin-detail-row">
              <span>Balance</span>
              <strong>
                {account.currency} {Number(account.balance).toFixed(2)}
              </strong>
            </div>

            <div className="admin-detail-row">
              <span>Currency</span>
              <strong>{account.currency}</strong>
            </div>

            <div className="admin-detail-row">
              <span>Account Created At</span>
              <strong>
                {account.createdAt
                  ? new Date(account.createdAt).toLocaleString()
                  : "-"}
              </strong>
            </div>
          </>
        )}
      </div>

      {/* Transaction History Card */}
      <div className="admin-user-details-card admin-transaction-card">
        <div className="admin-section-title">
          <h2>Transaction History</h2>
        </div>

        {transactionLoading ? (
          <div className="admin-account-state">Loading transactions...</div>
        ) : transactionError ? (
          <div className="admin-account-state">
            <p className="admin-user-details-error">{transactionError}</p>
          </div>
        ) : transactions.length === 0 ? (
          <div className="admin-account-state">No transactions found.</div>
        ) : (
          <div className="admin-transaction-list">
            {transactions.map((transaction) => (
              <div className="admin-transaction-item" key={transaction.id}>
                <div className="admin-transaction-main">
                  <div>
                    <span className="admin-transaction-label">
                      Transaction ID
                    </span>

                    <strong>#{transaction.id}</strong>
                  </div>

                  <div>
                    <span className="admin-transaction-label">Type</span>

                    <strong>{transaction.type}</strong>
                  </div>

                  <div>
                    <span className="admin-transaction-label">Amount</span>

                    <strong>₹{Number(transaction.amount).toFixed(2)}</strong>
                  </div>

                  <div>
                    <span className="admin-transaction-label">
                      Balance After
                    </span>

                    <strong>
                      ₹{Number(transaction.balanceAfter).toFixed(2)}
                    </strong>
                  </div>
                </div>

                <div className="admin-transaction-footer">
                  <span>{transaction.remarks || "No remarks"}</span>

                  <span>
                    {transaction.createdAt
                      ? new Date(transaction.createdAt).toLocaleString()
                      : "-"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Audit History Card */}
      <div className="admin-user-details-card admin-audit-card">
        <div className="admin-section-title">
          <h2>Audit History</h2>
        </div>

        {auditLoading ? (
          <div className="admin-account-state">Loading audit history...</div>
        ) : auditError ? (
          <div className="admin-account-state">
            <p className="admin-user-details-error">{auditError}</p>
          </div>
        ) : auditLogs.length === 0 ? (
          <div className="admin-account-state">No audit logs found.</div>
        ) : (
          <div className="admin-audit-list">
            {auditLogs.map((log) => (
              <div className="admin-audit-item" key={log.id}>
                <div className="admin-audit-main">
                  <div>
                    <span className="admin-audit-label">Event Type</span>

                    <strong>{log.eventType}</strong>
                  </div>

                  <div>
                    <span className="admin-audit-label">Description</span>

                    <strong>{log.description}</strong>
                  </div>
                </div>

                <div className="admin-audit-footer">
                  <span>Audit ID: #{log.id}</span>

                  <span>
                    {log.createdAt
                      ? new Date(log.createdAt).toLocaleString()
                      : "-"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminUserDetails;
