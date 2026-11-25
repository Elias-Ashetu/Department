

import { useState } from "react";
import styles from "./CreateUserModal.module.css";

function CreateUserModal({ onClose, onSubmit, loading, error }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    employeeId: "",
    role: "DEAN",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div>
            <h2>Create User</h2>
            <p>Create a Dean or Coordinator account.</p>
          </div>

          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            disabled={loading}
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="create-name">Full Name</label>
            <input
              id="create-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="create-email">Email Address</label>
            <input
              id="create-email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="create-employeeId">Employee ID</label>
            <input
              id="create-employeeId"
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              placeholder="Enter employee ID"
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="create-role">User Role</label>
            <select
              id="create-role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="DEAN">Dean</option>
              <option value="COORDINATOR">Coordinator</option>
            </select>
          </div>

          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={styles.createButton}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUserModal;
