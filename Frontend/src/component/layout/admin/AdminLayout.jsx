
import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { authClient } from "../../../lib/auth-client";
import styles from "./AdminLayout.module.css";

function AdminLayout() {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const navigationItems = [
    { path: "/admin/dashboard", icon: "▦", label: "Dashboard" },
    { path: "/admin/users", icon: "♙", label: "User Management" },
    { path: "/admin/students", icon: "♟", label: "Students" },
    { path: "/admin/departments", icon: "▤", label: "Departments" },
    { path: "/admin/announcements", icon: "▣", label: "Announcements" },
    { path: "/admin/settings", icon: "⚙", label: "Settings" },
  ];

  return (
    <div className={styles.adminLayout}>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className={styles.sidebarOverlay}
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Admin Sidebar */}
      <aside
        id="admin-sidebar"
        className={`${styles.adminSidebar} ${
          sidebarOpen ? styles.sidebarOpen : ""
        }`}
      >
        <div className={styles.adminBrand}>
          <h2>Wollega University</h2>
          <span>Department Selection System</span>
          <p>Admin Panel</p>

          <button
            type="button"
            className={styles.sidebarClose}
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>

        <nav className={styles.adminNavigation}>
          <p className={styles.navTitle}>MAIN MENU</p>

          {navigationItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `${styles.navLink} ${
                  isActive ? styles.active : ""
                }`
              }
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          className={styles.adminLogout}
          onClick={handleLogout}
        >
          <span>↪</span>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className={styles.adminMain}>

        {/* Header */}
        <header className={styles.adminHeader}>

          <button
            type="button"
            className={styles.sidebarToggle}
            onClick={() => setSidebarOpen((prev) => !prev)}
            aria-label="Toggle sidebar"
            aria-expanded={sidebarOpen}
            aria-controls="admin-sidebar"
          >
            {sidebarOpen ? "✕" : "☰"}
          </button>

          <div className={styles.headerTitle}>
            <h3>Administration</h3>
            <p>Wollega University</p>
          </div>

          <div className={styles.adminProfile}>
            <div className={styles.adminAvatar}>A</div>

            <div>
              <strong>Administrator</strong>
              <span>ADMIN</span>
            </div>
          </div>

        </header>

        {/* Page Content */}
        <section className={styles.adminContent}>
          <Outlet />
        </section>

      </main>
    </div>
  );
}

export default AdminLayout;
