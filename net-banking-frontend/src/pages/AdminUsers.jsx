
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminUsers.css";

function AdminUsers() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {

    fetch("http://localhost:8080/api/admin/users", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {

        if (!response.ok) {
          throw new Error("Failed to load users");
        }

        return response.json();
      })
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => {
        console.error(error);
        setError("Unable to load users");
      })
      .finally(() => {
        setLoading(false);
      });

  }, []);

  if (loading) {
    return (
      <div className="admin-users-state">
        Loading users...
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-users-state admin-users-error">
        {error}
      </div>
    );
  }

  return (
    <div className="admin-users">

      {/* Header */}
      <div className="admin-users-header">

        <div>
          <h1>User Management</h1>

          <p>
            View registered users and their details.
          </p>
        </div>

        <button
          className="admin-back-button"
          onClick={() => navigate("/admin")}
        >
          Back to Dashboard
        </button>

      </div>

      {/* Users Table */}
      <div className="admin-users-card">

        {users.length === 0 ? (

          <div className="admin-empty-state">
            <h3>No Users Found</h3>

            <p>
              There are currently no registered users.
            </p>
          </div>

        ) : (

          <div className="admin-table-wrapper">

            <table className="admin-users-table">

              <thead>
                <tr>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {users.map((user) => (

                  <tr key={user.id}>

                    <td>{user.userId}</td>

                    <td>{user.name}</td>

                    <td>{user.email}</td>

                    <td>{user.phone}</td>

                    <td>{user.role}</td>

                    <td>
                      {user.active ? "Active" : "Inactive"}
                    </td>

                    <td>

                      <button
                        className="admin-view-button"
                        onClick={() =>
                          navigate(
                            `/admin/users/${user.userId}`
                          )
                        }
                      >
                        View Details
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  );
}

export default AdminUsers;

