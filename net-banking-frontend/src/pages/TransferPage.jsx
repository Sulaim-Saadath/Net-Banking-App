import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TransferPage.css";

function TransferPage() {
  const navigate = useNavigate();

  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTransfer = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!accountNumber || !amount) {
      setError("Account number and amount are required.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:8080/api/customer/transfer",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accountNumber,
            amount: Number(amount),
            remarks,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Transfer failed.");
        return;
      }

      if (data.success) {
        setMessage(
          `Transfer successful. Remaining balance: ₹${data.remainingBalance}`,
        );

        setAccountNumber("");
        setAmount("");
        setRemarks("");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="transfer-page">
      <div className="transfer-card">
        <div className="transfer-header">
          <h1>Transfer Money</h1>
          <p>Send money securely to another account</p>
        </div>

        {message && <div className="transfer-success">{message}</div>}

        {error && <div className="transfer-error">{error}</div>}

        <form onSubmit={handleTransfer}>
          <label>Receiver Account Number</label>

          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="Enter account number"
          />

          <label>Amount</label>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            min="1"
          />

          <label>Remarks</label>

          <input
            type="text"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Optional"
          />

          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Transfer Money"}
          </button>
        </form>

        <button className="back-button" onClick={() => navigate("/customer")}>
          ← Back to Dashboard
        </button>
      </div>
    </div>
  );
}

export default TransferPage;
