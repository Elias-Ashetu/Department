
import styles from "./EditUserModal.module.css";

export default function EditUserModal({
  user,
  form,
  setForm,
  onSubmit,
  onClose,
  loading,
  error,
  formatRole,
}) {
  if (!user) return null;

  const updateField = (field, value) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const fields = [
    ["name", "Full Name", "text"],
    ["email", "Email", "email"],
    ["username", "Username", "text"],
    ["employeeId", "Employee ID", "text"],
    ["phone", "Phone", "text"],
    ["jobTitle", "Job Title", "text"],
    ["office", "Office", "text"],
  ];

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>

        <div className={styles.header}>
          <div>
            <h2>Update User</h2>
            <p>Edit {formatRole(user.role)} information.</p>
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

        <form onSubmit={onSubmit}>
          {fields.map(([field, label, type]) => (
            <div className={styles.formGroup} key={field}>
              <label htmlFor={`edit-${field}`}>
                {label}
              </label>

              <input
                id={`edit-${field}`}
                type={type}
                required={
                  field === "name" ||
                  field === "email" ||
                  field === "username"
                }
                value={form[field] || ""}
                onChange={(e) =>
                  updateField(field, e.target.value)
                }
                disabled={loading}
              />
            </div>
          ))}

          {error && (
            <p className={styles.error}>{error}</p>
          )}

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancel}
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>

            <button
              type="submit"
              className={styles.save}
              disabled={loading}
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
