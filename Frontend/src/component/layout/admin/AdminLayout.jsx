import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { authClient } from "../../../lib/auth-client";
import "./AdminLayout.css";

function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const result = await authClient.signOut();

      if (result.error) {
        console.error("Logout failed:", result.error);
        return;
      }

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <h2>Wollega University</h2>
          <span>Department Selection System</span>
          <p>Admin Panel</p>
        </div>

        <nav className="admin-navigation">
          <p className="nav-title">MAIN MENU</p>

          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span>▦</span>
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span>♙</span>
            User Management
          </NavLink>

          <NavLink
            to="/admin/students"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span>♙</span>
            Students
          </NavLink>

          <NavLink
            to="/admin/departments"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span>▤</span>
            Departments
          </NavLink>

          <NavLink
            to="/admin/announcements"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span>▣</span>
            Announcements
          </NavLink>

          <NavLink
            to="/admin/settings"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span>⚙</span>
            Settings
          </NavLink>
        </nav>

        <button className="admin-logout" onClick={handleLogout}>
          <span>↪</span>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        <header className="admin-header">
          <div>
            <h3>Administration</h3>
            <p>Wollega University</p>
          </div>

          <div className="admin-profile">
            <div className="admin-avatar">A</div>
            <div>
              <strong>Administrator</strong>
              <span>ADMIN</span>
            </div>
          </div>
        </header>

        <section className="admin-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
}

export default AdminLayout;
