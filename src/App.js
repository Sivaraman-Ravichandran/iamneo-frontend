import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import EmployeeDashboard from "./Components/EmployeeDashboard";
import TeamManagerDashboard from "./Components/TeamManagerDashboard";
import HRDashboard from "./Components/HRDashboard";
import SystemAdminDashboard from "./Components/SystemAdminDashboard";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/employee/dashboard" element={<EmployeeDashboard />} />
        <Route
          path="/team_manager/dashboard"
          element={<TeamManagerDashboard />}
        />
        <Route path="/hr/dashboard" element={<HRDashboard />} />
        <Route
          path="admin/dashboard"
          element={<SystemAdminDashboard />}
        />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
