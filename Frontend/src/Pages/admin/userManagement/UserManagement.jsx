import { useState } from "react";

import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../../../services/admin/userService";
import useUsers from "./hooks/useUsers";

import UserHeader from "../components/User/userHeader/userHeader";
import UserSearch from "../components/User/Usersearch/Usersearch";
import UserFilter from "../components/User/UserFilter/UserFilter";
import RoleFilter from "../components/User/RoleFilter//RoleFilte";
import UserFeedback from "../components/User/UserFeedback/UserFeedback";
import UserTable from "../components/User/userTable/UserTable";
import UserPagination from "../components/User/UserPagination/UserPagination";
import EditUserModal from "../components/User/EditUserModal/EditUserModal";
import CreateUserModal from "../components/User/CreateUserModal/CreateUserModal";
import GeneratedPasswordModal from "../components/User/GeneratedPasswordModal/GeneratedPasswordModal";

import styles from "./UserManagement.module.css";

function UserManagement() {
  const {
    users,
    listLoading,
    listError,

    search,
    setSearch,
    selectedRole,
    isActive,
    setIsActive,

    currentPage,
    setCurrentPage,
    pagination,

    handleRoleChange,
    resetFilters,
    refreshUsers,
  } = useUsers();

  // Create user state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createdAccount, setCreatedAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Edit user state
  const [editingUser, setEditingUser] = useState(null);
  const [editLoading, setEditLoading] = useState(false);

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    username: "",
    employeeId: "",
    phone: "",
    jobTitle: "",
    office: "",
  });

  // Feedback state
  const [actionError, setActionError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const formatRole = (role) => {
    const roleNames = {
      DEAN: "Dean",
      COORDINATOR: "Coordinator",
      DEPARTMENT_HEAD: "Department Head",
      ADMIN: "Admin",
    };

    return roleNames[role] || role;
  };

  const canManageUser = (role) => role === "DEAN" || role === "COORDINATOR";

  // Create user
 const handleCreateUser = async (formData) => {
  setLoading(true);
  setError("");

  try {
    console.log("Form data received:", formData);

    const result = await createUser(formData);

    console.log("Created user response:", result);

    setCreatedAccount({
      id: result.user.id,
      name: result.user.name,
      employeeId: result.user.employeeId,
      email: result.user.email,
      username: result.user.username,
      role: result.user.role,
      isActive: result.user.isActive,
      temporaryPassword: result.temporaryPassword,
    });

    setShowCreateModal(false);
    resetFilters();
  } catch (err) {
    console.error("Create user error:", err);
    setError(err.message || "Unable to create user.");
  } finally {
    setLoading(false);
  }
};

 // Open edit modal and fetch user information
const handleEditUser = async (id) => {
  setActionError("");
  setSuccessMessage("");
  setEditLoading(true);

  try {
    // 1. Fetch user information
    const result = await getUserById(id);

    console.log("Backend response:", result);

    // 2. Extract actual user object
    const details = result.data;

    if (!details) {
      throw new Error("User information was not found.");
    }

    // 3. Extract employee profile
    const profile = details.employeeProfile || {};

    // 4. Populate form
    const populatedForm = {
      name: details.name || "",
      email: details.email || "",
      username: details.username || "",
      employeeId: profile.employeeId || "",
      phone: profile.phone || "",
      jobTitle: profile.jobTitle || "",
      office: profile.office || "",
    };

    console.log("Populated form:", populatedForm);

    // 5. Update form state
    setEditForm(populatedForm);

    // 6. Open edit modal
    setEditingUser(details);

  } catch (error) {
    console.error("Unable to fetch user:", error);

    setActionError(
      error.message || "Unable to load user details."
    );
  } finally {
    setEditLoading(false);
  }
};

// Update user
const handleUpdateUser = async (e) => {
  e.preventDefault();

  if (!editingUser || !canManageUser(editingUser.role)) {
    setActionError("You are not allowed to update this user.");
    return;
  }

  setEditLoading(true);
  setActionError("");
  setSuccessMessage("");

  try {
    // Send updated information to backend
    await updateUser(editingUser.id, editForm);

    // Close edit modal
    setEditingUser(null);

    // Show success message
    setSuccessMessage("User information updated successfully.");

    // Refresh user list
    await refreshUsers();

  } catch (err) {
    setActionError(err.message || "Unable to update user.");
  } finally {
    setEditLoading(false);
  }
};

  // Deactivate user
  const handleDeleteUser = async (user) => {
    if (!canManageUser(user.role)) return;

    const confirmed = window.confirm(
      `Are you sure you want to deactivate ${user.name}'s account?`,
    );

    if (!confirmed) return;

    setActionError("");
    setSuccessMessage("");

    try {
      await deleteUser(user.id);

      setSuccessMessage(`${user.name}'s account was deactivated.`);

      await refreshUsers();
    } catch (err) {
      setActionError(err.message || "Unable to deactivate user.");
    }
  };

  return (
    <div className={styles.userManagement}>
      <UserHeader
        onCreateUser={() => {
          setError("");
          setShowCreateModal(true);
        }}
      />

      <div className={styles.searchAndFilter}>
        <UserSearch
          search={search}
          setSearch={setSearch}
          setCurrentPage={setCurrentPage}
        />

        <UserFilter
          isActive={isActive}
          setIsActive={setIsActive}
          setCurrentPage={setCurrentPage}
        />
      </div>

      <RoleFilter selectedRole={selectedRole} onRoleChange={handleRoleChange} />

      <UserFeedback
        successMessage={successMessage}
        actionError={actionError}
        onClearSuccess={() => setSuccessMessage("")}
      />

      <div className={styles.userList}>
        <div className={styles.listHeader}>
          <div>
            <h2>User Accounts</h2>
            <p>{pagination.totalUsers} users found</p>
          </div>
        </div>

        <UserTable
          users={users}
          loading={listLoading}
          error={listError}
          onEdit={handleEditUser}
          onDeactivate={handleDeleteUser}
        />

        {!listLoading && !listError && users.length > 0 && (
          <UserPagination
            currentPage={pagination.currentPage || currentPage}
            totalPage={pagination.totalPage || 1}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      {showCreateModal && (
        <CreateUserModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateUser}
          loading={loading}
          error={error}
        />
      )}

      {createdAccount && (
        <GeneratedPasswordModal
          account={createdAccount}
          onClose={() => setCreatedAccount(null)}
        />
      )}

      {editingUser && (
        <EditUserModal
          user={editingUser}
          form={editForm}
          setForm={setEditForm}
          onSubmit={handleUpdateUser}
          onClose={() => setEditingUser(null)}
          loading={editLoading}
          error={actionError}
          formatRole={formatRole}
        />
      )}
    </div>
  );
}

export default UserManagement;
