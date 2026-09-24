import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TransactionHistory.css";

function TransactionHistory() {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/customer/transactions",
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
          throw new Error("Failed to load transactions");
        }

        const data = await response.json();
        setTransactions(data);
      } catch (error) {
        console.error("Transaction loading failed:", error);
        setError("Unable to load transactions");
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [navigate]);

  if (loading) {
    return (
      <div className="transaction-history-state">Loading transactions...</div>
    );
  }

  if (error) {
    return <div className="transaction-history-state">{error}</div>;
  }

  return (
    <div className="transaction-history-page">
      <div className="transaction-history-container">
        <div className="transaction-history-header">
          <div>
            <h1>Transaction History</h1>
            <p>View all your account transactions</p>
          </div>

          <button
            className="back-dashboard-button"
            onClick={() => navigate("/customer")}
          >
            ← Dashboard
          </button>
        </div>

        <div className="transaction-history-card">
          {transactions.length === 0 ? (
            <div className="transaction-history-empty">
              <h3>No transactions yet</h3>
              <p>Your banking activity will appear here.</p>
            </div>
          ) : (
            <div className="transaction-table-wrapper">
              <table className="transaction-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Balance</th>
                    <th>Remarks</th>
                    <th>Date & Time</th>
                  </tr>
                </thead>

                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr key={index}>
                      <td>
                        <span
                          className={
                            transaction.type === "CREDIT"
                              ? "transaction-credit"
                              : "transaction-debit"
                          }
                        >
                          {transaction.type}
                        </span>
                      </td>

                      <td>
                        ₹{" "}
                        {Number(transaction.amount).toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                        })}
                      </td>

                      <td>
                        ₹{" "}
                        {Number(transaction.balanceAfter).toLocaleString(
                          "en-IN",
                          {
                            minimumFractionDigits: 2,
                          },
                        )}
                      </td>

                      <td>{transaction.remarks || "Bank transaction"}</td>

                      <td>
                        {new Date(transaction.createdAt).toLocaleString(
                          "en-IN",
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionHistory;
