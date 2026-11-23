
import "./AdminDashboard.css";

function AdminDashboard() {
  return (
    <div className="admin-dashboard">

      <div className="dashboard-welcome">
        <h1>Welcome, Administrator!</h1>
        <p>
          Manage the Wollega University freshman
          department selection system.
        </p>
      </div>

      {/* Dashboard Statistics */}
      <div className="dashboard-stats">

        <div className="stat-card">
          <h3>Total Students</h3>
          <h2>0</h2>
          <p>Registered students</p>
        </div>

        <div className="stat-card">
          <h3>Total Departments</h3>
          <h2>0</h2>
          <p>Available departments</p>
        </div>

        <div className="stat-card">
          <h3>Pending Selections</h3>
          <h2>0</h2>
          <p>Awaiting processing</p>
        </div>

        <div className="stat-card">
          <h3>Completed Selections</h3>
          <h2>0</h2>
          <p>Processed selections</p>
        </div>

      </div>

      {/* Recent Activities */}
      <div className="dashboard-activities">
        <h2>Recent Activities</h2>

        <p>No recent activities available.</p>
      </div>

    </div>
  );
}

export default AdminDashboard;
