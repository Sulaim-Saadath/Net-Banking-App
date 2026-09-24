import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerProfile.css";

function CustomerProfile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/customer/profile",
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
          throw new Error("Failed to load profile");
        }

        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Profile loading failed:", error);
        setError("Unable to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  if (loading) {
    return <div className="profile-state">Loading profile...</div>;
  }

  if (error) {
    return <div className="profile-state">{error}</div>;
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="customer-profile">
      <div className="profile-container">
        <div className="profile-header">
          <div>
            <h1>My Profile</h1>
            <p>Your personal and account information</p>
          </div>

          <button
            className="profile-back-button"
            onClick={() => navigate("/customer")}
          >
            ← Dashboard
          </button>
        </div>

        <div className="profile-grid">
          <div className="profile-card">
            <h2>Personal Information</h2>

            <div className="profile-detail">
              <span>User ID</span>
              <strong>{profile.userId}</strong>
            </div>

            <div className="profile-detail">
              <span>Name</span>
              <strong>{profile.name}</strong>
            </div>

            <div className="profile-detail">
              <span>Email</span>
              <strong>{profile.email}</strong>
            </div>

            <div className="profile-detail">
              <span>Phone</span>
              <strong>{profile.phone}</strong>
            </div>
          </div>

          <div className="profile-card">
            <h2>Account Information</h2>

            <div className="profile-detail">
              <span>Account Number</span>
              <strong>{profile.accountNumber}</strong>
            </div>

            <div className="profile-detail">
              <span>Account Type</span>
              <strong>{profile.accountType}</strong>
            </div>

            <div className="profile-detail">
              <span>Currency</span>
              <strong>{profile.currency}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerProfile;
