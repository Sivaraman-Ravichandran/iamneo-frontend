import React, { useState } from "react";
import './Styles/SystemAdmin.css'; // Import the SystemAdmin CSS file

function SystemAdminDashboard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false); // Modal state

  const handleCreateUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/api/create_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (data.success) {
        alert("User successfully added!"); // Success message
        setEmail("");
        setPassword("");
        setRole("employee");
        setShowModal(false); // Close the modal
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
    setMessage(""); // Clear message on modal open/close
    setError(""); // Clear error on modal open/close
  };

  return (
    <div className="system-admin-dashboard-container">
      <h2 className="system-admin-dashboard-title">System Admin Dashboard</h2>
      <p className="system-admin-dashboard-welcome">Welcome to the System Admin Dashboard! You can create users here.</p>
      <button className="system-admin-dashboard-add-button" onClick={toggleModal}>Add Users</button>

      {/* Modal */}
      {showModal && (
        <div className="system-admin-modal-overlay">
          <div className="system-admin-modal-content">
            <h3>Add User</h3>
            <form className="system-admin-dashboard-form" onSubmit={handleCreateUser}>
              <div className="system-admin-dashboard-field">
                <label className="system-admin-dashboard-label">Email:</label>
                <input
                  type="email"
                  className="system-admin-dashboard-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="system-admin-dashboard-field">
                <label className="system-admin-dashboard-label">Password:</label>
                <input
                  type="password"
                  className="system-admin-dashboard-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="system-admin-dashboard-field">
                <label className="system-admin-dashboard-label">Role:</label>
                <select
                  className="system-admin-dashboard-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="employee">Employee</option>
                  <option value="team_manager">Team Manager</option>
                  <option value="hr">HR</option>
                  <option value="system_admin">System Admin</option>
                </select>
              </div>
              <button type="submit" className="system-admin-dashboard-button">Create User</button>
              {message && <p className="system-admin-dashboard-message">{message}</p>}
              {error && <p className="system-admin-dashboard-error">{error}</p>}
            </form>
            <button className="system-admin-modal-close" onClick={toggleModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SystemAdminDashboard;
