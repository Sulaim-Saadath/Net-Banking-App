import { useNavigate } from "react-router-dom";
import "./TellerDashboard.css";

function TellerDashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="teller-dashboard">
      <header className="teller-header">
        <div>
          <h1>Teller Dashboard</h1>
          <p>Welcome to the Teller Portal</p>
        </div>

        <button onClick={handleLogout}>Logout</button>
      </header>

      <main className="teller-content">
        <div
          className="teller-card"
          onClick={() => navigate("/teller/customers")}
        >
          <h2>Customers</h2>
          <p>Search and view customer information.</p>
        </div>

        <div
          className="teller-card"
          onClick={() => navigate("/teller/transactions")}
        >
          <h2>Transactions</h2>
          <p>View customer transaction information.</p>
        </div>
      </main>
    </div>
  );
}

export default TellerDashboard;
