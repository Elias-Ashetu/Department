
import { Routes, Route } from "react-router-dom";

// Public Layout
import { PublicLayout } from "./component/layout/public/PublicLayout.jsx";

// Public Pages
import { Home } from "./Pages/public/home/home.jsx";
import Departments from "./Pages/public/departments/department.jsx";
import Announcements from "./Pages/public/announcements/announcement.jsx";
import { About } from "./Pages/public/about/about.jsx";

// Authentication
import Login from "./Pages/auth/Login.jsx";
import ProtectedRoute from "./component/layout/protected/ProtectedRoute.jsx";

// Admin Layout and Pages
import AdminLayout from "./component/layout/admin/AdminLayout.jsx";
import AdminDashboard from "./Pages/admin/AdminDashboard.jsx";
import UserManagement from "./Pages/admin/userManagement/UserManagement.jsx";

export function App() {
  return (
    <Routes>

      {/* Authentication */}
      <Route path="/login" element={<Login />} />

      {/* Protected Admin Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>

          {/* Admin Dashboard */}
          <Route
            path="dashboard"
            element={<AdminDashboard />}
          />

          {/* User Management */}
          <Route
            path="users"
            element={<UserManagement />}
          />

        </Route>
      </Route>

      {/* Public Routes */}
      <Route element={<PublicLayout />}>

        <Route path="/" element={<Home />} />

        <Route
          path="/departments"
          element={<Departments />}
        />

        <Route
          path="/announcements"
          element={<Announcements />}
        />

        <Route
          path="/about"
          element={<About />}
        />

      </Route>

    </Routes>
  );
}
