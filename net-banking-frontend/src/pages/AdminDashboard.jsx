import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/api/admin/dashboard", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load admin dashboard");
        }

        return response.json();
      })
      .then((data) => {
        setMessage(data.message);
      })
      .catch((error) => {
        console.error(error);
        setMessage("Unable to load Admin Dashboard");
      });
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>System administration panel</p>
        </div>

        <button className="admin-logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Welcome Card */}
      <div className="admin-welcome-card">
        <h2>{message}</h2>

        <p>You are authenticated as an administrator.</p>
      </div>

      {/* Administration Actions */}
      <div className="admin-actions">
        <h2>Administration</h2>

        <div className="admin-action-grid">
          <div
            className="admin-action-card"
            onClick={() => navigate("/admin/users")}
          >
            <h3>User Management</h3>

            <p>View registered users and their details.</p>

            <button
              onClick={(event) => {
                event.stopPropagation();
                navigate("/admin/users");
              }}
            >
              View Users
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
