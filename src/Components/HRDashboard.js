import React, { useState } from "react";
import './Styles/HR.css'; // Import your CSS file

function HRDashboard() {
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
        body: JSON.stringify({ email, password, role,}),
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
    <div className="hr-dashboard-container">
      <h2 className="hr-dashboard-title">HR Dashboard</h2>
      <p className="hr-dashboard-welcome">Welcome to the HR Dashboard! You can create users here.</p>
      <button className="hr-dashboard-add-button" onClick={toggleModal}>Add Users</button>

      {/* Modal */}
      {showModal && (
        <div className="hr-modal-overlay">
          <div className="hr-modal-content">
            <h3>Add User</h3>
            <form className="hr-dashboard-form" onSubmit={handleCreateUser}>
             
              <div className="hr-dashboard-field">
                <label className="hr-dashboard-label">Email:</label>
                <input
                  type="email"
                  className="hr-dashboard-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="hr-dashboard-field">
                <label className="hr-dashboard-label">Password:</label>
                <input
                  type="password"
                  className="hr-dashboard-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="hr-dashboard-field">
                <label className="hr-dashboard-label">Role:</label>
                <select
                  className="hr-dashboard-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="employee">Employee</option>
                  <option value="team_manager">Team Manager</option>
                </select>
              </div>
              <button type="submit" className="hr-dashboard-button">Create User</button>
              {message && <p className="hr-dashboard-message">{message}</p>}
              {error && <p className="hr-dashboard-error">{error}</p>}
            </form>
            <button className="hr-modal-close" onClick={toggleModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HRDashboard;