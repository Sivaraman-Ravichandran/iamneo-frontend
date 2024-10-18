import React, { useState } from "react";
function HRDashboard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("employee");
  const [hrEmail, setHrEmail] = useState(""); // Add HR email for authorization
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleCreateUser = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/api/create_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role, hr_email: hrEmail }),
      });

      const data = await response.json();

      if (data.success) {
        setMessage(data.message);
        setEmail("");
        setPassword("");
        setRole("employee");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    }
  };
  return (
    <div>
      <h2>HR Dashboard</h2>
      <p>Welcome to the HR Dashboard! You can create users here.</p>
      <form onSubmit={handleCreateUser}>
        <div>
          <label>HR Email:</label>
          <input
            type="email"
            value={hrEmail}
            onChange={(e) => setHrEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="employee">Employee</option>
            <option value="team_manager">Team Manager</option>
          </select>
        </div>
        <button type="submit">Create User</button>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>
    </div>
  );
}

export default HRDashboard;
