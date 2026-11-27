
import { Routes, Route } from "react-router-dom";

// Public Layout
import { PublicLayout } from "./component/layout/public/PublicLayout.jsx";

// Public Pages
import { Home } from "./Pages/public/home/home.jsx";
import Departments from "./Pages/public/departments/department.jsx";
import Announcements from "./Pages/public/announcements/announcement.jsx";
import About from "./Pages/public/about/about.jsx";
import DepartmentDetails from "./Pages/public/departments/DepartmentDetails.jsx";
import Unauthorized from "./Pages/public/Unauthorized/Unauthorized.jsx";
import Login from "./Pages/public/Login/Login.jsx";

// Authentication
import ProtectedRoute from "./routes/ProtectedRoute.jsx";
import { ROLES } from "./roles/roles.js";

// Admin Layout and Pages
import AdminLayout from "./component/layout/admin/AdminLayout.jsx";
import DeanLayout from "./component/layout/Dean/DeanLayout.jsx";

// ==========================================
// ADMIN PAGES
// ==========================================
import AdminDashboard from "./Pages/admin/AdminDashboard.jsx";
import UserManagement from "./Pages/admin/userManagement/UserManagement.jsx";

// Dean Layout and Pages
import DeanDashboard from "./Pages/dean/Dashboard/DeanDashboard.jsx";
import Department from "./Pages/dean/department/department.jsx";

export function App() {
  return (
<Routes>
      {/* ======================================
           AUTHENTICATION ROUTES
      ====================================== */}
      <Route path="/login" element={<Login />} />

      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/departments/:id" element={<DepartmentDetails />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/about" element={<About />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Route>

      {/* Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={[ROLES.ADMIN]} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
        </Route>
      </Route>

      {/* Dean Routes */}
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
