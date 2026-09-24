import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TellerTransactions.css";

function TellerTransactions() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!userId.trim()) {
      setError("Please enter a customer User ID");
      setTransactions([]);
      return;
    }

    try {
      setError("");
      setTransactions([]);

      const response = await fetch(
        `http://localhost:8080/api/teller/customers/${userId}/transactions`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Unable to fetch transactions");
      }

      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      setError(error.message || "Unable to fetch transactions");
    }
  };

  return (
    <div className="teller-transactions">
      <header className="teller-transactions-header">
        <div>
          <h1>Customer Transactions</h1>
          <p>View transaction history using Customer User ID</p>
        </div>

        <button className="back-btn" onClick={() => navigate("/teller")}>
          Back
        </button>
      </header>

      <main className="transaction-content">
        <div className="transaction-search">
          <input
            type="text"
            placeholder="Enter Customer User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          <button onClick={handleSearch}>Search</button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {transactions.length > 0 && (
          <div className="transaction-table-container">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Account Number</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Balance After</th>
                  <th>Remarks</th>
                  <th>Date</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.id}</td>

                    <td>{transaction.accountNumber}</td>

                    <td>{transaction.type}</td>

                    <td>₹{transaction.amount}</td>

                    <td>₹{transaction.balanceAfter}</td>

                    <td>{transaction.remarks || "-"}</td>

                    <td>{new Date(transaction.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {transactions.length === 0 && !error && userId && (
          <p className="no-transactions">No transactions found.</p>
        )}
      </main>
    </div>
  );
}

export default TellerTransactions;
