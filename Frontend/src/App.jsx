import { Routes, Route } from "react-router-dom";

// ==========================================
// PUBLIC LAYOUT
// ==========================================
import { PublicLayout } from "./component/layout/public/PublicLayout.jsx";

// ==========================================
// PUBLIC PAGES
// ==========================================
import { Home } from "./Pages/public/home/home.jsx";
import Departments from "./Pages/public/departments/department.jsx";
import Announcements from "./Pages/public/announcements/announcement.jsx";
import About from "./Pages/public/about/about.jsx";
import Unauthorized from "./Pages/public/Unauthorized/Unauthorized.jsx";

// ==========================================
// AUTHENTICATION & ROUTE PROTECTION
// ==========================================
import Login from "./Pages/public/Login/Login.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

// ==========================================
// ROLE CONSTANTS
// ==========================================
import { ROLES } from "./roles/roles.js";

// ==========================================
// DASHBOARD LAYOUTS
// ==========================================
import AdminLayout from "./component/layout/admin/AdminLayout.jsx";
import DeanLayout from "./component/layout/Dean/DeanLayout.jsx";

// ==========================================
// ADMIN PAGES
// ==========================================
import AdminDashboard from "./Pages/admin/AdminDashboard.jsx";
import UserManagement from "./Pages/admin/userManagement/UserManagement.jsx";

// ==========================================
// DEAN PAGES
// ==========================================
import DeanDashboard from "./Pages/dean/Dashboard/DeanDashboard.jsx";
import Department from "./Pages/dean/department/department.jsx";

export function App() {
  return (
<Routes>
      {/* ======================================
           AUTHENTICATION ROUTES
      ====================================== */}
      <Route path="/login" element={<Login />} />

      {/* ======================================
           PROTECTED ADMIN ROUTES
      ====================================== */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          {/* Admin Dashboard */}
          <Route path="dashboard" element={<AdminDashboard />} />

          {/* Admin User Management */}
          <Route path="users" element={<UserManagement />} />
        </Route>
      </Route>

      {/* ======================================
          PROTECTED DEAN ROUTES
      ====================================== */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.DEAN]} />}>
        <Route path="/dean" element={<DeanLayout />}>
          <Route path="dashboard" element={<DeanDashboard />} />
          <Route path="department" element={<Department />} />
        </Route>
      </Route>

      {/* ======================================
           PUBLIC ROUTES
      ====================================== */}
      <Route element={<PublicLayout />}>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Departments */}
        <Route path="/departments" element={<Departments />} />

        {/* Announcements */}
        <Route path="/announcements" element={<Announcements />} />

        {/* About */}
        <Route path="/about" element={<About />} />
        {/* Unauthorized Page */}
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Route>
    </Routes>
  );
}
