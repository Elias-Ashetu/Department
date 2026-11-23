import { useState } from "react";
import { createUser } from "../../../services/userService";

import CreateUserModal from "./components/CreateUserModal";
import GeneratedPasswordModal from "./components/GeneratedPasswordModal";

import "./UserManagement.css";

function UserManagement() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createdAccount, setCreatedAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCreateUser = async (formData) => {
    setLoading(true);
    setError("");

    try {
      const result = await createUser(formData);

      // Store credentials temporarily in React state
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
    } catch (err) {
      setError(err.message || "Unable to create user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="user-management">
      {/* Page Header */}
      <div className="user-page-header">
        <div>
          <h1>User Management</h1>
          <p>Create and manage Dean and Coordinator accounts.</p>
        </div>

        <button
          className="add-user-btn"
          onClick={() => {
            setError("");
            setShowCreateModal(true);
          }}
        >
          + Create User
        </button>
      </div>

      {/* Information Cards */}
      <div className="user-info-cards">
        <div className="user-info-card">
          <span>Total User Roles</span>
          <h2>2</h2>
          <p>Dean and Coordinator</p>
        </div>

        <div className="user-info-card">
          <span>Account Management</span>
          <h2>Create</h2>
          <p>Register new university users</p>
        </div>
      </div>

      {/* Create User Modal */}
      {showCreateModal && (
        <CreateUserModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={handleCreateUser}
          loading={loading}
          error={error}
        />
      )}

      {/* Generated Password Modal */}
      {createdAccount && (
        <GeneratedPasswordModal
          account={createdAccount}
          onClose={() => setCreatedAccount(null)}
        />
      )}
    </div>
  );
}

export default UserManagement;
