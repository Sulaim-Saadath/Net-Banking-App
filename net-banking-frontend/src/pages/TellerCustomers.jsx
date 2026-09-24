import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TellerCustomers.css";

function TellerCustomers() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!userId.trim()) {
      setError("Please enter a customer User ID");
      setCustomer(null);
      return;
    }

    try {
      setError("");
      setCustomer(null);

      const response = await fetch(
        `http://localhost:8080/api/teller/customers/${userId}`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Customer not found");
      }

      const data = await response.json();
      setCustomer(data);
    } catch (error) {
      setError(error.message || "Customer not found");
    }
  };

  return (
    <div className="teller-customers">
      <header className="teller-customers-header">
        <div>
          <h1>Customer Search</h1>
          <p>Search customer information using User ID</p>
        </div>

        <button onClick={() => navigate("/teller")} className="back-btn">
          Back
        </button>
      </header>

      <main className="customer-search-content">
        <div className="search-box">
          <input
            type="text"
            placeholder="Enter Customer User ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          <button onClick={handleSearch}>Search</button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {customer && (
          <div className="customer-details">
            <h2>Customer Details</h2>

            <div className="details-grid">
              <div>
                <span>User ID</span>
                <strong>{customer.userId}</strong>
              </div>

              <div>
                <span>Name</span>
                <strong>{customer.name}</strong>
              </div>

              <div>
                <span>Phone</span>
                <strong>{customer.phone}</strong>
              </div>

              <div>
                <span>Email</span>
                <strong>{customer.email}</strong>
              </div>

              <div>
                <span>Account Number</span>
                <strong>{customer.accountNumber}</strong>
              </div>

              <div>
                <span>Balance</span>
                <strong>₹{customer.balance}</strong>
              </div>

              <div>
                <span>Status</span>
                <strong>{customer.active ? "Active" : "Inactive"}</strong>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default TellerCustomers;
