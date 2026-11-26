
import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { authClient } from "../../../lib/auth-client";
import Logo from "../../../assets/images/logo.jpeg";
import styles from "./DeanLayout.module.css";

function DeanLayout() {
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
    { path: "/dean/dashboard", icon: "▦", label: "Dashboard" },
    { path: "/dean/head", icon: "♙", label: "Department Head" },
    { path: "/dean/students", icon: "♟", label: "Students" },
    { path: "/dean/departments", icon: "▤", label: "Departments" },
    { path: "/dean/announcements", icon: "▣", label: "Announcements" },
    { path: "/dean/settings", icon: "⚙", label: "Settings" },
  ];

  return (
    <div className={styles.deanLayout}>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className={styles.sidebarOverlay}
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Dean Sidebar */}
      <aside
        id="dean-sidebar"
        className={`${styles.deanSidebar} ${
          sidebarOpen ? styles.sidebarOpen : ""
        }`}
      >
        <div className={styles.deanBrand}>
            <img src={Logo} alt="Logo" className={styles.deanLogo} />
          <h2>WIT</h2>
          <span> Dean's Office</span>
          
          <button
            type="button"
            className={styles.sidebarClose}
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div>

        <nav className={styles.deanNavigation}>
        
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
          className={styles.deanLogout}
          onClick={handleLogout}
        >
          <span>↪</span>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className={styles.deanMain}>

        {/* Header */}
        <header className={styles.deanHeader}>

          <button
            type="button"
            className={styles.sidebarToggle}
            onClick={() => setSidebarOpen((prev) => !prev)}
            aria-label="Toggle sidebar"
            aria-expanded={sidebarOpen}
            aria-controls="dean-sidebar"
          >
            {sidebarOpen ? "✕" : "☰"}
          </button>

          <div className={styles.headerTitle}>
            <h3>Dean's Office</h3>  
            <p>Wollega University</p>
          </div>

          <div className={styles.deanProfile}>
            <div className={styles.deanAvatar}>A</div>

            <div>
              <strong>Dean</strong>
              <span>DEAN</span>
            </div>
          </div>

        </header>

        {/* Page Content */}
        <section className={styles.deanContent}>
          <Outlet />
        </section>

      </main>
    </div>
  );
}

export default DeanLayout;
